import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from 'react-router';
import Constants from '../../utils/constants';
import serverroute from '../../webconfig'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material'
import UnknownNavBar from "./UnknownNavBar";
var axios = require('axios').default
const C = new Constants();


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            email: "",
            password: "",
            isSignedUp: false,
            userType: "jobSeeker",
            isFnameValid: true,
            isLnameValid: true,
            isValidEmail: true,
            isValidPass: true,
            isFormValid: false,
            isSwitchOn: false,
            companyList: [],
            companyId: "",
            companyRegistrationDialog: false,
            isCompanyNameValid: true,
            newCompanyName: ""
        }
        console.log(this.props);
    }

    componentDidMount = async () => {
        await this.apiGetCompanyList();
    }

    _validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    _validatePassword = (password) => {
        return password.length > 6;
    }


    apiGetCompanyList = async (params) => {
        var response = await Axios.get(`${C.Server_URL}/ha/companies/all`, params);
        if (response.status == 200) {
            this.setState({
                companyList: response.data,
            });
        }
    };


    apiAddUser = async (params) => {
        console.log(params);
        var response = await Axios.post(`${C.Server_URL}/k/addUser`, params);
        if (response.status == 200) {
            console.log(response.data);
            this.setState({
                isSignedUp: true
            });
        }
    };

    apiJobSeeker = async (params) => {
        console.log(params);
        var response = await Axios.post(`${C.Server_URL}/k/addUser`, params);
        if (response.status == 200) {
            console.log(response.data);
            this.setState({
                isSignedUp: true,
            });
        }
    };

    eventBtnSignup = async (e) => {
        console.log(this.state);
        e.preventDefault();
        if (!this.state.fname.length > 0) {
            await this.setAsyncState({ isFnameValid: false, isFormValid: false })
        } else {
            await this.setAsyncState({ isFnameValid: true})
        }
        if (!this.state.lname.length > 0) {
            await this.setAsyncState({ isLnameValid: false, isFormValid: false })
        } else {
            await this.setAsyncState({ isLnameValid: true })
        }

        if (!this._validateEmail(this.state.email)) {
            await this.setAsyncState({ isValidEmail: false, isFormValid: false });
        } else {
            await this.setAsyncState({ isValidEmail: true })
        }
        if (!this._validatePassword(this.state.password)) {
            await this.setAsyncState({ isValidPass: false, isFormValid: false })
        } else {
            await this.setAsyncState({ isValidPass: true })
        }
        if (this.state.isFnameValid && this.state.isLnameValid && this.state.isValidEmail && this.state.isValidPass) {
            await this.setAsyncState({ isFormValid: true });
        }

        console.log(this.state);
        if (this.state.isFormValid) {
            var params = {
                'firstName': this.state.fname, 'lastName': this.state.lname, 'email': this.state.email, 'password': this.state.password, 'userType': this.state.userType
            };
            if (this.state.userType == 'employer'){
                params['companyId'] = this.state.companyId;
            }
            console.log(params);
            await this.apiAddUser(params);
        }
    }

    eventChkUserType() {
        var switchState = !this.state.isSwitchOn;
        this.setState({
            isSwitchOn: switchState
        });
    }

    openCompanyRegistration = () => {
        this.setState({ companyRegistrationDialog: true })
    }

    handleClose = () => {
        this.setState({ companyRegistrationDialog: false })
    }

    apiAddCompany = () => {
        let saveNewCompanyUrl = `${serverroute}/ha/company/new`
        axios.post(saveNewCompanyUrl, { companyName: this.state.newCompanyName }).then(res => {
            console.log(res.data);
            this.setState({
                companyList: res.data[1],
                companyRegistrationDialog: false
            });
        })
    }

    addNewCompany = () => {
        if (this.state.newCompanyName.length <= 0) {
            this.setState({ isCompanyNameValid: false })
        } else {
            this.apiAddCompany()
        }
    }

    setAsyncState = (newState) => {
        return new Promise((resolve) => this.setState(newState, resolve));
    }

    setUserType(e) {
        console.log(e.target.value);
        this.setState({ userType: e.target.value })
    }

    render() {
        var redirect = '';
        if (this.state.isSignedUp) {
            redirect = <Redirect replace to="/signin" />
        }

        var alertEmail = '';
        if (!this.state.isValidEmailPass) {
            alertEmail = <p>Please enter a valid Email and Password</p>
        }

        return (
            <div>
                <UnknownNavBar></UnknownNavBar>
                {redirect}
                <div className="container">
                    <div className="row align-items-start">
                        <div className="col-sm-12 pt-4">
                            <h3>Sign Up</h3>
                        </div>

                        <div className="col-sm-12 pt-4">
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Select User Type</label>
                            <div onChange={this.setUserType.bind(this)}>
                                <div className="col-sm-4">
                                    <input type="radio" value="jobSeeker" name="userType" defaultChecked/> Job Seeker
                                </div>
                                <div className="col-sm-4">
                                    <input type="radio" value="employer" name="userType" /> Employer
                                </div>
                                {/* <div className="col-sm-4">
                                    <input type="radio" value="admin" name="userType" /> Admin
                                </div> */}
                            </div>
                        </div>

                        <div className="col-sm-12 pt-4">
                            <div className="col-sm-2">
                                <label>First Name</label>
                            </div>
                            <div className="col-sm-6">
                                <input type="text" className="form-control" placeholder="Harry Potter" value={this.state.fname} onChange={e => this.setState({ fname: e.target.value })} />
                                {this.state.isFnameValid ? "" : <p className="text-danger">First Name is required</p>}
                            </div>
                        </div>
                        <div className="col-sm-12 pt-4">
                            <div className="col-sm-2">
                                <label>Last Name</label>
                            </div>
                            <div className="col-sm-6">
                                <input type="text" className="form-control" placeholder="Harry Potter" value={this.state.lname} onChange={e => this.setState({ lname: e.target.value })} />
                                {this.state.isLnameValid ? "" : <p className="text-danger">Last Name is required</p>}
                            </div>
                        </div>

                        <div className="col-sm-12 pt-4">
                            <div className="col-sm-2">
                                <label>Email address</label>
                            </div>
                            <div className="col-sm-6">
                                <input type="email" className="form-control" placeholder="harry@hogwarts.com" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                                {this.state.isValidEmail ? "" : <p className="text-danger">Please Enter a valid Email</p>}
                            </div>
                        </div>
                        <div className="col-sm-12 pt-4">
                            <div className="col-sm-2">
                                <label>Password</label>
                            </div>
                            <div className="col-sm-6">
                                <input type="password" className="form-control" placeholder="Hedwig@123" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
                                {this.state.isValidPass ? "" : <p className="text-danger">Please Enter a valid Password</p>}
                            </div>
                        </div>
                        {(this.state.userType == 'employer') ? <div className="col-sm-12 pt-4">
                            <div className="col-sm-2">
                                <label>Company</label>
                            </div>
                            <div className="col-sm-6">
                                <select className="form-control" value={this.state.companyId} onChange={e => this.setState({ companyId: e.target.value })}>
                                    <option value={""}>--Select--</option>
                                    {this.state.companyList.map(i => {
                                        return <option value={i.id} key={i.id}>{i.name}</option>
                                    })}
                                </select>
                            </div>
                            <a href="#" className="link-primary " onClick={this.openCompanyRegistration}>Company Not Listed? Click to Register New Company</a>
                        </div> : ""}

                        <div className="col-sm-12 pt-4">
                            <p className="forgot-password text-right"> Already registered <a href={C.Client_URL.signin}>sign in?</a> </p>
                        </div>
                        {/* <div className="col-sm-12 pt-4">
                            {alertEmail}
                        </div> */}
                        <div className="col-sm-12 pt-4">
                            <button type="submit" className="btn btn-primary" onClick={this.eventBtnSignup}>Sign Up</button>
                        </div>
                    </div>
                </div>
                <Dialog
                    open={this.state.companyRegistrationDialog}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth="true">
                    <DialogTitle id="alert-dialog-title">{"Company Registration"}</DialogTitle>
                    <DialogContent>
                        <label> Company Name</label>
                        <input type="text" className="form-control mt-2" value={this.state.newCompanyName} onChange={e => this.setState({ newCompanyName: e.target.value })} />
                        {this.state.isCompanyNameValid ? "" : <div class="alert alert-danger" role="alert">
                            Company Name is required
                        </div>}
                        <button type="submit" className="btn btn-primary mt-2" onClick={this.addNewCompany}>Save</button>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


export default SignUp;