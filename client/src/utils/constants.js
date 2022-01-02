import serverroute from '../webconfig';
import clientroute from '../webconfig2';
const PropTypes = require('prop-types');
const { Redirect } = require('react-router');
const React = require('react');

const Constants = class {
    constructor() {
        this.HOST_URL = `${clientroute}`;

        this.Server_URL = `${serverroute}`;

        this.Client_URL = {
            signup: `${this.HOST_URL}/signup`,
            signin: `${this.HOST_URL}/signin`
        };

        this.API_URL = {
            getUser: `${this.Server_URL}/getUser`,
        };
    }
}

export default Constants;