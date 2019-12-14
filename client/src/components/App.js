import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
const Dashbord = () => <h2>Dashbord</h2>
const SurveyNew = () => <h2>SurveyNew</h2>

class App extends React.Component {

    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <>
                    <Header />
                        <div className="container">
                            <Route exact path="/" component={Landing} />
                            <Route exact path="/surveys" component={Dashbord} />
                            <Route path="/surveys/new" component={SurveyNew} />
                        </div>
                    </>
                </BrowserRouter>
            </div>
        );
    };
};

export default connect(
    null,
    actions
)(App);