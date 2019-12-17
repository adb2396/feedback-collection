import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import formFields from './formFields';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
    
    const reviewFieldList = _.map(formFields, ({ name, label }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        )
    })
    
    return (
        <div>
            <h1>Please confirm your entries</h1>
            { reviewFieldList }
            <button 
                className="yellow white-text darken-4 btn-flat"
                onClick={onCancel}
            >
                Back
            </button>
            <button 
                className="green white-text right btn-flat"
                onClick={() => submitSurvey(formValues, history)}
            >
                Send Surevy
                <i className="material-icons right">send</i>
            </button>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {formValues: state.form.surveyForm.values};
}

export default connect(
    mapStateToProps,
    actions
)(withRouter(SurveyFormReview));