import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup";
import axios from 'axios'
import '../EmployerComponents/Styles/JobPosting.css'
import StateList from "./StateList"
import Countrylist from "./Countrylist"
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material'
import EmployerNavBar from './EmployerNavBar'
import Typography from '@mui/material/Typography';
import Constants from '../../utils/constants';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
} from "react-router-dom";

const C = new Constants();


export default class JobPostingPage extends Component {

    constructor(props) {
        super(props)
        this.employerDetailsFromStorage=JSON.parse(sessionStorage.getItem('authenticateDetails'))
        this.state = {
            redirectToJobsList:false,
            JobPostedSuccessfuly: false,
            empId: this.employerDetailsFromStorage.employerId,
            companyId:this.employerDetailsFromStorage.companyId,
            companyName:" ads"
        }
    }
    componentDidMount(props) {

     axios.get(`${C.Server_URL}/abhi/getCompanyName/${this.state.companyId}`)
     .then(res=>{
             console.log(res.data)
             console.log(res.data[0].name)
            this.setState({
                companyName:res.data[0].name
            })
        })
    .catch(err=>
        {
            console.log(err)
        })
    }


    handleOnSubmit = (e) => {
        console.log(e)
        console.log("hello")
        axios.post(`${C.Server_URL}/abhi/postJob`,
            {
                empId: this.state.empId,
                companyId: this.state.companyId,
                zipCode: e.zipcode,
                JobTitle: e.Job_title,
                industry: e.Industry,
                jobMode: e.JobMode,
                jobtype: e.Jobtype,
                street: e.Street_address,
                city: e.City,
                country: e.Country,
                state: e.state,
                zipcode: e.zipcode,
                Salary: e.Salary,
                roleName: e.role_name,
                description: e.Description,
                whatYouWillDo: e.whatYouWillDo,
                whatYouWillLove: e.whatYouWillLove,
                whatYouWillNeed: e.whatYouWillNeed,
                responsibilities: e.responsibilities,
                qualifications: e.qualifications

            }).then((res) => {
                this.setState({
                    JobPostedSuccessfuly: true
                })

            }).catch(err => { console.log(err) })
    }


    handleClose = () => {
        this.setState({ JobPostedSuccessfuly: false })
    }

  

    redirectToListOfJobs = ()=>
    {
        this.setState(
            {
                redirectToJobsList:true 
            })
    }

    render() {
        //Validation Schema for job posting


       let initialValues = {
            Company_name: this.state.companyName,
            Job_title: "",
            Industry: "",
            Country: "US",
            Mode: "",
            Jobtype: "Full-Time",
            JobMode: "In person",
            Street_address: "",
            City: "",
            state: "CA",
            zipcode: "",
            Salary: "",
            role_name: "",
            Description: "",
            whatYouWillDo: "",
            whatYouWillLove: "",
            whatYouWillNeed: "",
            responsibilities: "",
            qualifications: ""
    
        }

        const validationSchema = Yup.object(
            {
                Company_name: Yup.string().max(30, "Enter max of 30 characters"),
                Job_title: Yup.string().max(30, "Enter max of 40 characters").required("Please enter the Job Title"),
                Industry: Yup.string().max(50, "Enter max of 50 characters").required("Please enter the name of the Industry"),
                Country: Yup.string(),
                Street_address: Yup.string().max(40, "Enter max of 100 characters").required("Please enter the address"),
                City: Yup.string().max(30, "Enter max of 30 characters").required("Please enter the city where the job is located"),
                zipcode: Yup.string().matches(/^[0-9]*$/, "Enter Valid Zipcode").max(6, "Enter a valid Zipcode").required("Please enter the zipcode"),
                Salary: Yup.string().matches(/^[0-9]*$/, "Enter Valid Number").max(8, "Enter max of 8 numbers").required("Please enter a valid Salary"),
                JobMode: Yup.string(),
                role_name: Yup.string().max(40, "Enter a maximum of 40  characters").required("Please enter a proper role name"),
                Description: Yup.string().max(200, "Please limit the description to 200 characters").required("Please enter a proper description"),
                whatYouWillDo: Yup.string().max(200, "Please limit the input to 200 characters").required("Please fill the above field"),
                whatYouWillLove: Yup.string().max(200, "Please limit the input to 200 characters").required("Please fill the above field"),
                whatYouWillNeed: Yup.string().max(200, "Please limit the input to 200 characters").required("Please fill the above field"),
                qualifications: Yup.string().max(100, "Please limit the Qualifications to 100 characters").required("Please enter the qualifications"),
                responsibilities: Yup.string().max(100, "Please limit the input to 100 characters").required("Please enter the responsibilities of this role")
            })

        if(this.state.redirectToJobsList!=true)
         {
        return (
            <div>
                <div className="container-fluid" style={{ padding: "0px", margin: "0px" }}>
                    <EmployerNavBar />

                    <div className="row" style={{ padding: "0px", margin: "0px" }}>
                        <center> <Typography style={{ marginRight: "10px" }}>Post your Job</Typography></center>
                    </div>
                    <Formik validationSchema={validationSchema} onSubmit={(e) => { this.handleOnSubmit(e) }} enableReinitialize initialValues={initialValues}>
                        <Form   >
                            <div className="row" style={{ padding: "0px", margin: "0px" ,paddingBottom:"100px" }}>
                                <div className="col-md-6" style={{ padding: "0px", margin: "0px" }}>
                                    <div className="container">
                                        <div class="form-group">
                                            <label className="form-label" style={{ marginLeft: "10%" }}  >Company Name</label>
                                            <center> <Field type="name" style={{ width: "80%" }} className="form-control" name="Company_name" placeholder="Enter the company name" disabled />
                                                <ErrorMessage name="Company_name">
                                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                                </ErrorMessage>
                                            </center>

                                        </div>

                                        <div className="form-group" >
                                            <label className="form-label" style={{ marginLeft: "10%" }}  >Job Title</label>
                                            <center> <Field type="name" style={{ width: "80%" }} className="form-control" name="Job_title" placeholder="Enter the Job Title" />
                                            <ErrorMessage name="Job_title">
                                                {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                            </ErrorMessage>
                                            </center>
                                        </div>
                                        <div className="form-group" >
                                            <label className="form-label" style={{ marginLeft: "10%" }}  >Role Name</label>
                                            <center> <Field type="name" style={{ width: "80%" }} className="form-control" name="role_name" placeholder="Enter the role name" />
                                            <ErrorMessage name="role_name">
                                                {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                            </ErrorMessage>
                                            </center>
                                        </div>






                                        <div className="form-group">

                                            <label className="form-label" style={{ marginLeft: "10%" }} >Industry</label>
                                            <center>  <Field type="name" style={{ width: "80%" }} className="form-control" name="Industry" placeholder="Enter the Industry of the job" />
                                                <ErrorMessage name="Industry">
                                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                                </ErrorMessage>
                                            </center>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label" style={{ marginLeft: "10%" }}  >Select Your Country</label>
                                            <center>    <Field className="form-control" name="Country" as="select" style={{ width: "80%" }}>
                                                {Countrylist.map((value, key) => {
                                                    return (<option value={value.name}>{value.name}</option>)
                                                })}
                                            </Field></center>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label" style={{ marginLeft: "10%" }}  >Select the job mode</label>
                                            <center>   <Field className="form-control" name="JobMode" as='select' style={{ width: "80%" }}   >
                                                <option>Remote</option>
                                                <option>In person</option>
                                            </Field></center>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label" style={{ marginLeft: "10%" }}  >Select The Job Type</label>
                                            <center>   <Field className="form-control" name="Jobtype" as='select' style={{ width: "80%" }}   >
                                                <option>Part-Time</option>
                                                <option>Full-Time</option>
                                            </Field></center>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label" style={{ marginLeft: "10%" }} >Qualifications</label>
                                            <center>  <Field type="name" style={{ width: "80%" }} className="form-control" name="qualifications" placeholder="Enter the qualifications" />
                                                <ErrorMessage name="qualifications">
                                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                                </ErrorMessage>
                                            </center>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label" style={{ marginLeft: "10%" }} >Responsibilities</label>
                                            <center>  <Field type="name" style={{ width: "80%" }} className="form-control" name="responsibilities" placeholder="Enter the responsibilities" />
                                                <ErrorMessage name="responsibilities">
                                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                                </ErrorMessage>
                                            </center>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label" style={{ marginLeft: "10%" }} >Salary</label>
                                            <center>  <Field type="name" style={{ width: "80%" }} className="form-control" name="Salary" placeholder="Enter the salary" />
                                                <ErrorMessage name="Salary">
                                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                                </ErrorMessage>
                                            </center>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-md-6" style={{ padding: "0px", margin: "0px" }}>

                                    <div className="container overflow-auto">

                                        <div className="form-group">

                                            <label className="form-label" style={{ marginLeft: "10%" }} >Description</label>
                                            <center>  <Field as="textarea" style={{ width: "80%" }} className="form-control" name="Description" placeholder="Enter a short description of the job" />
                                                <ErrorMessage name="Description">
                                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                                </ErrorMessage>
                                            </center>
                                        </div>
                                        <div className="form-group">

                                            <label className="form-label" style={{ marginLeft: "10%" }} >What will you do?</label>
                                            <center>  <Field as="textarea" style={{ width: "80%" }} className="form-control" name="whatYouWillDo" placeholder="Enter a short description of what the applicant will do" />
                                                <ErrorMessage name="whatYouWillDo">
                                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                                </ErrorMessage>
                                            </center>
                                        </div>


                                        <div className="form-group">

                                            <label className="form-label" style={{ marginLeft: "10%" }} >What will you love?</label>
                                            <center>  <Field as="textarea" style={{ width: "80%" }} className="form-control" name="whatYouWillLove" placeholder="Enter a short description of what the applicant will love in the job" />
                                                <ErrorMessage name="whatYouWillLove">
                                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                                </ErrorMessage>
                                            </center>
                                        </div>


                                        <div className="form-group">

                                            <label className="form-label" style={{ marginLeft: "10%" }} >What will you need?</label>
                                            <center>  <Field as="textarea" style={{ width: "80%" }} className="form-control" name="whatYouWillNeed" placeholder="Enter a short description of what the applicant will need in the job" />
                                                <ErrorMessage name="whatYouWillNeed">
                                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                                </ErrorMessage>
                                            </center>
                                        </div>




                                        <div className="form-group">

                                            <label className="form-label" style={{ marginLeft: "10%" }} >Street Address</label>
                                            <center>  <Field type="name" style={{ width: "80%" }} className="form-control" name="Street_address" placeholder="Enter your street address" />
                                                <ErrorMessage name="Street_address">
                                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                                </ErrorMessage>


                                            </center>
                                        </div>
                                        <div className="form-group">

                                            <label className="form-label" style={{ marginLeft: "10%" }} >City</label>
                                            <center>  <Field type="name" style={{ width: "80%" }} className="form-control" name="City" placeholder="Enter your city" /></center>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label" style={{ marginLeft: "10%" }}  >Select The Your State</label>
                                            <center>   <Field className="form-control" name="state" as='select' style={{ width: "80%" }}   >
                                                {StateList.map((value, key) => {
                                                    return (<option value={value.abbreviation}>{value.abbreviation}</option>)
                                                })}
                                            </Field></center>
                                        </div>
                                        <div className="form-group">

                                            <label className="form-label" style={{ marginLeft: "10%" }} >Zip Code</label>
                                            <center>  <Field type="name" style={{ width: "80%" }} className="form-control" name="zipcode" placeholder="Enter the zip code" />
                                                <ErrorMessage name="zipcode">
                                                    {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                                </ErrorMessage></center>

                                        </div>
                                   
                                        <div className="row" style={{ padding: "0px", marginLeft: "0px", marginRight: "0px", marginTop: "10%" }}>
                                            <div className="col-md-6">
                                                <button type="submit" className="btn btn-primary" style={{ float: "right", width: "40%" }} >Post Job</button>
                                            </div>
                                            <div className="col-md-6">
                                                <button type="button" onClick={this.redirectToListOfJobs} className="btn btn-primary" style={{ float: "left" }}>View Posted Jobs</button>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        </Form>
                    </Formik>
                </div>
                <Dialog
                    open={this.state.JobPostedSuccessfuly}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth="true">
                    <center> <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle></center>
                    <center> <DialogContent>Job Posted Successfully</DialogContent></center>
                    <DialogActions>
                        <Button onClick={this.handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
       }
       else
       {
           return(<div>
                  <Redirect to={{pathname:"/JobApplicants",
                state:{empId:this.state.empId}}}>

                  </Redirect>
           </div>)
       }
    }
}
