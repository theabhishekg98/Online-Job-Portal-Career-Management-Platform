import React, { Component } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TabPanel } from '../EmployerComponents/TabPanel';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material'
import * as yup from 'yup';
import serverroute from '../../webconfig';
import UserNavBar from '../userNavbar';
import EmployerNavBar from '../EmployerComponents/EmployerNavBar';
var axios = require("axios").default;

export class UserProfile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            alert: false,
            userIntialValues: this.userIntialValues,
            alertMessage:''
        }
    }
    userIntialValues = {
        fname: '',
        lname: '',
        city: '',
        state:'',
        country:'',
        zip:'',
    }
    
    componentDidMount() {
        // 1. Make api call to get user profile details
        console.log("ok")
        let userId=1;
        // console.log(this.props.location.state.userId)
        let userProfile = `${serverroute}/abhishek/user/${userId}/profile/`
        axios.get(userProfile).then((res) => {
            console.log("result data", res);
            this.userIntialValues.fname=res.data.userProfile[0].firstName
            this.userIntialValues.lname=res.data.userProfile[0].lastName
            this.userIntialValues.city=res.data.userProfile[0].city
            this.userIntialValues.state=res.data.userProfile[0].state
            this.userIntialValues.country=res.data.userProfile[0].country
            this.userIntialValues.zip=res.data.userProfile[0].zip
            this.setState({
                userIntialValues:this.userIntialValues,
            })
        })
    }

    handleChange = (event, newValue) => {
        this.setState({ value: newValue })
        let saveUserProfile=``
    };
    /**
     * Handle on Submit event, triggered when employer personal profile form is submitted
     * @param {*} values 
     */

    personalSchema = yup.object({
        fname: yup.string(),
        lname: yup.string(),
        city: yup.string(),
        state: yup.string(),
        country: yup.string(),
        zip: yup.string()
    })

    /**
     * Handle on Submit event, triggered when company profile form is submitted
     * @param {*} values 
     */
    
    handleClose = () => {
        this.setState({ alert: false })
    }

    render() {
        /**
     * User Personal Profile JSX
     */
        const userProfile = <div className="container">
            <Formik initialValues={this.state.userIntialValues}
                validationSchema={this.personalSchema}>
                <Form>
                    <label className="form-label">First Name</label>
                    <Field type="text" name="fname" className="form-control" disabled={true}></Field>
                    <label className="form-label">Last Name</label>
                    <Field type="text" name="lname" className="form-control" disabled={true}></Field>
                    <label className="form-label">City</label>
                    <Field type="text" name="city" className="form-control" disabled={true} ></Field>
                    <label className="form-label">State</label>
                    <Field type="text" name="state" className="form-control" disabled={true}></Field>
                    <label className="form-label">Country</label>
                    <Field type="text" name="country" className="form-control" disabled={true}></Field>
                    <label className="form-label">Zip</label>
                    <Field type="text" name="zip" className="form-control" disabled={true}></Field>
                </Form>
            </Formik>
        </div>
    
        return (
            
            <div className="container-fluid" style={{padding:"0px"}}>
                <EmployerNavBar></EmployerNavBar>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={this.state.value} onChange={this.handleChange} aria-label="basic tabs example">
                        <Tab label="User Profile" />
                    </Tabs>
                </Box>
                <TabPanel value={this.state.value} index={0}>
                    {userProfile}
                </TabPanel>

            </div>
        )
    }
}

export default UserProfile
