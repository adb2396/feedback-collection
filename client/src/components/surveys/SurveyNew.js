import React from 'react';
import { reduxForm } from 'redux-form';
import SurveyFrom from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends React.Component {

    state = { showFormReview: false };

    renderContent() {
        if( this.state.showFormReview ) {
            return <SurveyFormReview 
                onCancel={() => this.setState({ showFormReview: false })}
            />;
        }

        return <SurveyFrom 
            onSurveySubmit={() => this.setState({ showFormReview: true }) } 
        />
    }

    render() {
        return (
            <div>
                { this.renderContent() }
            </div>
        );
    };
};

export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);