const mongoose = require('mongoose');
const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const requireCredits = require('../middlewares/requireCredits');
const requireLogin = require('../middlewares/requireLogin');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {

    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');

        const events = _.map(req.body, (event) => {
            const match = p.test(new URL(event.url).pathname);
            if(match) { 
                return { 
                    email: event.email, 
                    surveyId: match.surveyId,
                    choice: match.choice 
                };
            }
        });
        const compactEvents = _.compact(events);
        const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');
        uniqueEvents.forEach(event => {
            Survey.updateOne({
               _id: event.surveyId,
               recipients: {
                   $elemMatch: { email: event.email, responded: false }
               } 
            }, {
                $inc: { [event.choice]: 1 },
                $set: { 'recipients.$.responded': true },
                lastResponded: new Date()
            }).exec();
        })
        res.send({});
    });

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting');
    })

    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id }, {recipients: 0});
        
        res.send(surveys);
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        // generate mailer instance to customize 
        // mail that user will send to it's recipients
        const mailer = new Mailer(survey, surveyTemplate(survey));
        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);   
        } catch (error) {
            res.status(422).send(error);
        }
    });
};