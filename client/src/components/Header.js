import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import StripePayments from './StripePayments';

class Header extends React.Component {


    renderLoginBtn() {
        switch(this.props.auth){
            case null:
                return;
            case false:
                return <li><a href="/auth/google">Login With Google</a></li>;
            default: 
                return [
                    <li key="1"><StripePayments /></li>,
                    <li key="2" style={{margin: '0 10px'}}>Credits: {this.props.auth.credits}</li>,
                    <li key="3"><a href="/api/logout">Logout</a></li>
                ];
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper container">
                    <Link 
                        to={this.props.auth ? '/surveys' : '/'} 
                        className="left brand-logo"
                    >
                        feedbackMail
                    </Link>
                    <ul className="right">
                        { this.renderLoginBtn() }
                    </ul>
                </div>
            </nav>
        );
    };
}

const mapStateToProps = ({ auth }) => {
    return { auth };
}

export default connect(
    mapStateToProps
)(Header);