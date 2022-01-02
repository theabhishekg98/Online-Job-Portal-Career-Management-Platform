import React, { Component } from "react";
import { Redirect } from 'react-router'


class Logout extends Component {
    constructor(props) {
        super(props);
        sessionStorage.removeItem('authenticateDetails');
        // sessionStorage.setItem('authenticateDetails', "");
        this.state = {
            isLoggedOut: true
        }
    }

    setAsyncState = (newState) => {
        return new Promise((resolve) => this.setState(newState, resolve));
    }

    render() {
        var redirect = '';
        console.log(this.state);
        if (this.state.isLoggedOut) {
            redirect = <Redirect to="/signin" />
        }

        return (
            <div>
                <div className="container">
                    <div className="row align-items-start"></div>
                    {redirect}
                    <div className="col-sm-12 pt-4">
                        <p> Log out </p>
                    </div >
                </div >
            </div >
        );
    }
}


export default Logout;

