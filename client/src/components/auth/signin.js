import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from 'react-router';
import Constants from '../../utils/constants';
import UnknownNavBar from "./UnknownNavBar";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import serverroute from '../../webconfig';
import {withRouter} from 'react-router-dom'
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Button from "@restart/ui/esm/Button";
const C = new Constants();


class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSwitchOn: false,
            isLoggedIn: false,
            signupValues:this.signupValues,
            isError:false,
            userId: "",
            userType: ""
        }
    }
    signupValues={
        email:'',
        password:''
    }

    eventChkUserType() {
        var switchState = !this.state.isSwitchOn;
        this.setState({
            isSwitchOn: switchState
        });
    }

    signupSchema=yup.object({
        email: yup.string().required('Email is required').email('Invalid Email'),
        password: yup.string().required('Password is required'),
       
    })
    handleFormSubmit=(values)=>{
        console.log(values)

        let loginUrl=`${serverroute}/ha/login`
        Axios.post(loginUrl,values).then(res=>{
            console.log(res);
            if(res.data.authenticated && res.data.type==="emp"){
                sessionStorage.setItem('authenticateDetails',JSON.stringify(res.data))
                // this.props.history.push(`/JobApplicants`)
                window.location.pathname="/JobApplicants"
            }else if(res.data.authenticated && res.data.type==="user"){
                sessionStorage.setItem('authenticateDetails',JSON.stringify(res.data))
                // this.props.history.push(`/findJobs?userId=${res.data.userId}`);
                window.location.href=`/findJobs?userId=${res.data.userId}`
            }else if(res.data.authenticated && res.data.type==="admin"){
                sessionStorage.setItem('authenticateDetails',JSON.stringify(res.data))
                // this.props.history.push(`/findJobs?userId=${res.data.userId}`);
                window.location.href=`/admin/analytics`
            }
            else if(!res.data.authenticated){
                this.setState({isError:true})
            }
        }).catch(err=>{
            this.setState({isError:true})
        })
    }
    handleClose=()=>{
        this.setState({isError:false})
    }
    render() {
        console.log(this.state);

        var redirectlogin = '';
        if (this.state.isLoggedIn && this.state.userType == 'user'){
            redirectlogin = <Redirect to={`/findJobs?userId=${this.state.userId}`}/>
        } else if (this.state.isLoggedIn && this.state.userType == 'emp') {
            redirectlogin = <Redirect to={`/JobApplicants`} />
        }
        console.log(redirectlogin);

        return (
            <div>
                {redirectlogin}
                <UnknownNavBar></UnknownNavBar>
                <div className="container">
                    <div className="row align-items-start">
                        <div className="col-sm-12 pt-4">
                            <h3>Log In</h3>
                        </div>
                        <Formik initialValues={this.state.signupValues}
                            onSubmit={this.handleFormSubmit}
                            validationSchema={this.signupSchema}>
                            <Form>
                                <div className="col-sm-12 pt-4">
                                    <div className="col-sm-2">
                                        <label>Email address</label>
                                    </div>
                                    <div className="col-sm-6">
                                        <Field type="email" name="email" className="form-control" placeholder="Enter email"/>
                                        {/* <input type="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} /> */}
                                        <ErrorMessage name="email" className="text-danger" component="div"></ErrorMessage>
                                    </div>
                                </div>
                                <div className="col-sm-12 pt-4">
                                    <div className="col-sm-2">
                                        <label>Password</label>
                                    </div>
                                    <div className="col-sm-6">
                                        <Field type="password" name="password" className="form-control" placeholder="Enter Password"/>
                                        {/* <input type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} /> */}
                                        <ErrorMessage name="password" className="text-danger" component="div"></ErrorMessage>
                                    </div>
                                </div>
                                <div className="col-sm-12 pt-4">
                                    <button type="submit" className="btn btn-primary" >Log in</button>
                                </div>
                            </Form>
                        </Formik>
                        <div className="col-sm-12 pt-4">
                            <p className="text-right"> <a href={C.Client_URL.signup}>Register</a></p>
                        </div>
                        {/* <div className="col-sm-12 pt-4">
                            {alertEmail}
                        </div> */}
                        <div className="col-sm-12 pt-4">
                            {/* <div className="col-sm-4 form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" value="employer" onChange={this.eventChkUserType.bind(this)} />
                                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Login as Employer</label>
                            </div> */}
                            <div className="col-sm-4">
                            </div>
                        </div>
                    </div>
                </div>
                <Dialog
                        open={this.state.isError}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        fullWidth="true">
                        <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
                        <DialogContent>{"Invalid Login credentials"}</DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose}>Close</Button>
                        </DialogActions>
                    </Dialog>
            </div >
        );
    }
}


export default withRouter(SignIn);