import React from 'react';

const SurveyField = ({ input, label, meta: { error, touched } }) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{ marginBottom: '5px' }} />
            <span className="red-text" style={{ marginBottom: '20px' }}>
                { touched ? error : ''}
            </span>
        </div>
    );
} 

export default SurveyField;