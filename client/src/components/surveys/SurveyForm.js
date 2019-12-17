import React from 'react';
import _ from 'lodash';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends React.Component {

    renderFields() {
        return _.map(formFields, ({label, name}) => {
            return (
                <Field 
                    key={name}
                    component={SurveyField}
                    type="text"
                    label={label}
                    name={name}
                />
            )
        })
    }

    render() {
        return (
            <div style={{ marginTop: '50px' }}>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    { this.renderFields() }
                <Link style={{marginTop: '20px'}} to="/surveys" className="red btn-flat left white-text">
                    Cancel
                </Link>
                <button style={{marginTop: '20px'}} type="submit" className="teal btn-flat right white-text">
                    Next
                <i className="material-icons right">done</i>
                </button>
                </form>
            </div>
        );
    };
};

const validate = (values) => {
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');

    _.forEach(formFields, ({name}) => {
        if(!values[name]) {
            errors[name] = "You must provide a value";
        }
    });

    return errors;
}

const formContainer = reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
});

export default formContainer(SurveyForm);