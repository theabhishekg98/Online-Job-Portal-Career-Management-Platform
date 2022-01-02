import React, { Component } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TabPanel } from './TabPanel';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material'
import * as yup from 'yup';
import serverroute from '../../webconfig';
import EmployerNavBar from './EmployerNavBar';
var axios = require("axios").default;

export class CompanyProfile extends Component {

    constructor(props) {
        super(props)
        this.employerDetailsFromStorage=JSON.parse(sessionStorage.getItem('authenticateDetails'))
        this.state = {
            value: 0,
            alert: false,
            eprofIntialValues: this.eprofIntialValues,
            cprofIntialValues: this.cprofIntialValues,
            alertMessage: ''
        }
    }
    eprofIntialValues = {
        fname: '',
        lname: '',
        role: '',
        city: '',
        state: '',
        country: '',
        zipcode: ''
    }
    cprofIntialValues = {
        companyName: '',
        website: '',
        companySize: '',
        companyType: '',
        revenue: '',
        headQuarters: '',
        industry: '',
        founded: '',
        missionAndVision: '',
        ceoName: ''
    }
    componentDidMount() {
        // 1. Make api call to get emplyer profile details
        // 2. Make api call to get employers company profile details
        console.log("ok")
        let empId = this.employerDetailsFromStorage.employerId;
        let companyId = this.employerDetailsFromStorage.companyId;
        let employeeProfile = `${serverroute}/ha/employer/${empId}/profile`
        let companyProfile = `${serverroute}/ha/employer/${companyId}/companyProfile`
        axios.all([axios.get(employeeProfile), axios.get(companyProfile)]).then((res) => {
            console.log(res[0].data)
            let comp = res[1].data[0]
            this.eprofIntialValues.fname = res[0].data[0].firstName
            this.eprofIntialValues.lname = res[0].data[0].lastName
            this.eprofIntialValues.role = res[0].data[0].role ? res[0].data[0].role : ""
            this.eprofIntialValues.city = res[0].data[0].city ? res[0].data[0].city : ""
            this.eprofIntialValues.state = res[0].data[0].state ? res[0].data[0].state : ""
            this.eprofIntialValues.country = res[0].data[0].country ? res[0].data[0].country : ""
            this.eprofIntialValues.zipcode = res[0].data[0].zip ? res[0].data[0].zip : ""
            this.cprofIntialValues.companyName = comp.name?comp.name:""
            this.cprofIntialValues.website = comp.website?comp.website:""
            this.cprofIntialValues.companySize = comp?.companySize?comp?.companySize:""
            this.cprofIntialValues.companyType = comp?.companyType?comp?.companyType:""
            this.cprofIntialValues.revenue = comp?.revenue?comp?.revenue:""
            this.cprofIntialValues.headQuarters = comp?.headquarters?comp?.headquarters:""
            this.cprofIntialValues.industry = comp?.industry?comp?.industry:""
            this.cprofIntialValues.founded = comp?.foundDate? comp?.foundDate:""
            this.cprofIntialValues.missionAndVision = comp?.mission?comp?.mission:""
            this.cprofIntialValues.ceoName = comp?.ceo?comp?.ceo:""
            this.setState({
                eprofIntialValues: this.eprofIntialValues,
                cprofIntialValues: this.cprofIntialValues
            })
        })
    }

    handleChange = (event, newValue) => {
        this.setState({ value: newValue })
        let saveEmployeeProfile = ``

    };
    /**
     * Handle on Submit event, triggered when employer personal profile form is submitted
     * @param {*} values 
     */
    handlePersonalProfileForm = (values) => {
        console.log('Personal Profile Values', values)
        let empId = this.employerDetailsFromStorage.employerId
        let saveemployeeProfile = `${serverroute}/ha/employer/${empId}/profile`

        axios.post(saveemployeeProfile, values).then(res => {
            this.setState({
                alert: true,
                alertMessage: 'Company Profile Update Success',
                eprofIntialValues: values
            })
        }).catch(err => {
            this.setState({
                alert: true,
                alertMessage: 'Something went wrong, Please try again later'
            })
        })
    }
    personalchema = yup.object({
        fname: yup.string().required('First Name is required'),
        lname: yup.string().required('Last Name is required'),
        role: yup.string().required('Role is required'),
        city: yup.string().required('City is required')
            .max(40, 'Cannot Exceed 40'),
        state: yup.string().required('State is required')
            .max(40, 'Cannot Exceed 40'),
        country: yup.string().required('Country is Required'),
        zipcode: yup.string().required('Zipcode is required')
            .matches(/^[0-9]+$/, 'Only digits')
            .max(5, 'Invalid zipcode')
            .min(5, 'Invalid zipcode'),
    })

    /**
     * Handle on Submit event, triggered when company profile form is submitted
     * @param {*} values 
     */
    handleCompanyProfileForm = (values) => {
        console.log('Company Profile values', values)
        let companyId = this.employerDetailsFromStorage.companyId
        let saveCompanyProf = `${serverroute}/ha/employer/${companyId}/companyProfile`

        axios.post(saveCompanyProf, values).then(res => {
            this.setState({
                alert: true,
                alertMessage: 'Personal Profile Update Success',
                cprofIntialValues: values
            })
        }).catch(err => {
            this.setState({
                alert: true,
                alertMessage: 'Something went wrong, Please try again later'
            })
        })
    }

    companySchema = yup.object({
        companyName: yup.string().required('Company Name is required'),
        website: yup.string().url('Enter Valid URL').required('Website URL is required'),
        companySize: yup.string().required('Company size is required'),
        companyType: yup.string().required('Company type is required'),
        revenue: yup.string().required('Revenue is required'),
        headQuarters: yup.string(),
        industry: yup.string(),
        founded: yup.string().matches(/^[0-9]+$/, 'Only digits').min(4,"Enter year").max(4,"Enter Year"),
        missionAndVision: yup.string(),
        ceoName: yup.string().required('CEO Name is required')
    })

    /**
     * To close the dialog box
     */
    handleClose = () => {
        this.setState({ alert: false })
    }
    render() {
        /**
     * Employer Personal Profile JSX
     */
        const personalProfile = <div className="container">
            <Formik initialValues={this.state.eprofIntialValues}
                onSubmit={this.handlePersonalProfileForm}
                validationSchema={this.personalchema}>
                <Form>

                    <label className="form-label">First Name</label>
                    <Field type="text" name="fname" className="form-control"></Field>
                    <ErrorMessage name="fname" className="text-danger" component="div"></ErrorMessage>
                    <label className="form-label">Last Name</label>
                    <Field type="text" name="lname" className="form-control"></Field>
                    <ErrorMessage name="lname" className="text-danger" component="div"></ErrorMessage>
                    <label className="form-label">Role</label>
                    <Field type="text" name="role" className="form-control"></Field>
                    <ErrorMessage name="role" className="text-danger" component="div"></ErrorMessage>
                    <label className="form-label">City</label>
                    <Field type="text" name="city" className="form-control"></Field>
                    <ErrorMessage name="city" className="text-danger" component="div"></ErrorMessage>
                    <label className="form-label">State</label>
                    <Field type="text" name="state" className="form-control"></Field>
                    <ErrorMessage name="state" className="text-danger" component="div"></ErrorMessage>
                    <label className="form-label">Country</label>
                    <Field type="text" name="country" className="form-control"></Field>
                    <ErrorMessage name="country" className="text-danger" component="div"></ErrorMessage>
                    <label className="form-label">Zipcode</label>
                    <Field type="text" name="zipcode" className="form-control"></Field>
                    <ErrorMessage name="zipcode" className="text-danger" component="div"></ErrorMessage>
                    <button className="mt-2 btn btn-primary" type="submit">Save</button>
                </Form>
            </Formik>
        </div>
        /**
     * Comapny Profile JSX
     */
        const CompanyProfileForm = <div className="container">
            <Formik initialValues={this.state.cprofIntialValues}
                onSubmit={this.handleCompanyProfileForm}
                validationSchema={this.companySchema}>
                <Form>
                    <label className="form-label">Company Name</label>
                    <Field type="text" name="companyName" className="form-control"></Field>
                    <ErrorMessage name="companyName" className="text-danger" component="div"></ErrorMessage>
                    <label className="form-label">Website</label>
                    <Field type="text" name="website" className="form-control"></Field>
                    <ErrorMessage name="website" className="text-danger" component="div"></ErrorMessage>
                    <label className="form-label">Company Size</label>
                    <Field type="text" name="companySize" className="form-control"></Field>
                    <ErrorMessage name="companySize" className="text-danger" component="div"></ErrorMessage>
                    <label className="form-label">Company Type</label>
                    <Field type="text" name="companyType" className="form-control"></Field>
                    <ErrorMessage name="companyType" className="text-danger" component="div"></ErrorMessage>
                    <label className="form-label">Revenue</label>
                    <Field type="text" name="revenue" className="form-control"></Field>
                    <ErrorMessage name="revenue" className="text-danger" component="div"></ErrorMessage>
                    <label className="form-label">Head Quarters</label>
                    <Field type="text" name="headQuarters" className="form-control"></Field>
                    <ErrorMessage name="headQuarters" className="text-danger" component="div"></ErrorMessage>
                    <label className="form-label">Industry</label>
                    <Field type="text" name="industry" className="form-control"></Field>
                    <ErrorMessage name="industry" className="text-danger" component="div"></ErrorMessage>
                    <label className="form-label">Founded</label>
                    <Field type="text" name="founded" className="form-control"></Field>
                    <ErrorMessage name="founded" className="text-danger" component="div"></ErrorMessage>
                    <label className="form-label">Mission and Vision</label>
                    <Field type="text-area" as="textarea" name="missionAndVision" className="form-control"></Field>
                    <ErrorMessage name="missionAndVision" className="text-danger" component="div"></ErrorMessage>
                    <label className="form-label">CEO Name</label>
                    <Field type="text" name="ceoName" className="form-control"></Field>
                    <ErrorMessage name="ceoName" className="text-danger" component="div"></ErrorMessage>
                    <button className="mt-2 btn btn-primary" type="submit">Save</button>
                </Form>
            </Formik>
        </div>
        return (
            <React.Fragment>
                <EmployerNavBar></EmployerNavBar>

                <div className="container-fluid">

                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={this.state.value} onChange={this.handleChange} aria-label="basic tabs example">
                            <Tab label="Personal Profile" style={{paddingLeft:"1rem"}} />
                            <Tab label="Company Profile" />
                        </Tabs>
                    </Box>
                    <TabPanel value={this.state.value} index={0}>
                        {personalProfile}
                    </TabPanel>
                    <TabPanel value={this.state.value} index={1}>
                        {CompanyProfileForm}
                    </TabPanel>

                    <Dialog
                        open={this.state.alert}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        fullWidth="true">
                        <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
                        <DialogContent>{this.state.alertMessage}</DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose}>Close</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </React.Fragment>
        )
    }
}

export default CompanyProfile
