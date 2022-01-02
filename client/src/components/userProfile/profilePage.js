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
import UserNavbar from '../userNavbar';
import AWS from 'aws-sdk';
import  { Card } from 'react-bootstrap';
import { Redirect } from 'react-router';
var axios = require("axios").default;

class UserProfile extends Component {

    constructor(props) {
        super(props)
        this.userDetailsFromStorage=JSON.parse(sessionStorage.getItem('authenticateDetails'))
        this.state = {
            value: 0,
            alert: false,
            userIntialValues: this.userIntialValues,
            isRedirectToAppliedJobs: false,
            isRedirectToYourReviews: false,
            isRedirectToSavedJobs:false,
            didDeleteResume: false,
            userId: '',
            alertMessage:'',
            S3_BUCKET :'273-indeed',
            REGION :'us-east-2',
            gotResume:false,
            selectedFile : [],
        }
        AWS.config.update({
            accessKeyId: 'AKIA424XFIGBESA3IRUX',
            secretAccessKey: '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'
        })
        this.deleteResume = this.deleteResume.bind(this);
        this.viewAppliedJobs = this.viewAppliedJobs.bind(this);
        this.viewSavedJobs = this.viewSavedJobs.bind(this);
        this.viewYourReviews = this.viewYourReviews.bind(this);
        this.getResume();
    }

    userIntialValues = {
        fname: '',
        lname: '',
        city: '',
        state:'',
        country:'',
        zip:'',
    }

    getResume(){
        var userId = this.userDetailsFromStorage.userId;
        axios.get(`${serverroute}/abhishek/get/file/${userId}`)
        .then(response => {
            console.log("resume response", response.data.results[0].resumefilename);
            this.setState({
                resumeData: response.data.results[0].resumefilename,
                gotResume:true
            });
        })
        .catch(err => {
            console.log("Error",err);
        });
    }

    deleteResume() {
        // var userId = this.props.location.state.id +" "+ 3 //this.props.location.state.id +" "+ 1 //userID
        console.log("enter delete resume");
        var userId = this.userDetailsFromStorage.userId; // dynamic fetch
        axios.post(`${serverroute}/abhishek/delete/file/${userId}`)
        .then(response => {
            console.log("delete resume response", response);
            this.setState({
                didDeleteResume: true
            });
        })
        .catch(err => {
            console.log("Error",err);
        });
    }

    viewAppliedJobs() {
        console.log("setting applied jobs redirect to true")
        this.setState({
            isRedirectToAppliedJobs:true
        })
    }

    viewSavedJobs() {
        console.log("setting saved jobs redirect to true")
        this.setState({
            isRedirectToSavedJobs:true
        })
    }

    viewYourReviews() {
        console.log("setting view reviews redirect to true")
        this.setState({
            isRedirectToYourReviews:true
        })
    }
    
    componentDidMount() {
        // 1. Make api call to get user profile details
        console.log("ok")
        this.state.userId = this.userDetailsFromStorage.userId;
        let userProfile = `${serverroute}/abhishek/user/${this.state.userId}/profile/`
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
        let saveUserProfile=``;
    };
    /**
     * Handle on Submit event, triggered when employer personal profile form is submitted
     * @param {*} values 
     */
    handlePersonalProfileForm = (values) => {
        console.log('Personal Profile Values', values)
        let userId=this.userDetailsFromStorage.userId;
        let saveUserProfile = `${serverroute}/abhishek/user/${userId}/profile/`;
        
        axios.post(saveUserProfile,values).then(res=>{
            this.setState({ 
                alert: true,
                alertMessage:'User Profile Update Success',
                userIntialValues:values
             })
        }).catch(err=>{
            this.setState({ 
                alert: true,
                alertMessage:'Something went wrong, Please try again later'
             })
        })
    }

    personalSchema = yup.object({
        fname: yup.string().required('First Name is required'),
        lname: yup.string().required('Last Name is required'),
        city: yup.string(),
        state: yup.string(),
        country: yup.string(),
        zip: yup.string()
    })

    onimageupload = (file) => {
        
        var myBucket = new AWS.S3({
            params: { Bucket: this.state.S3_BUCKET},
            region: this.state.REGION,
        }) 

       for(var i =0;i<file.length;i++){
            // console.log("files are"+JSON.stringify(file.name[i]));
            let filedata = ({
                //add company id for classID and status also
                classId : this.companyId,
                url : "UserPhoto"+Date.now(),
                createdAt : Date.now()
            })
            
        axios.post(`${serverroute}/an/uploads/photo`, filedata)
            .then(response => {
                console.log("response"+JSON.stringify(response));
                this.setState({
                    filedata: "Choose file",
                   // url: response.data.url //response.data.url
                });
            })
            .catch(err => {
                console.log("Error"+err);
            });

            const params = {
                ACL: 'public-read',
                Body: file[i],
                Bucket: this.state.S3_BUCKET,
                Key: filedata.url
            };
    
            myBucket.putObject(params)
                .send((err) => {
                    if (err) console.log("err1234"+err);
                })

           }
          
            alert("File Uploaded Successfully!");
            window.location.reload();
           
           // window.location.reload()
            
    }

    /**
     * Handle on Submit event, triggered when company profile form is submitted
     * @param {*} values 
     */
    
    handleClose = () => {
        this.setState({ alert: false })
    }

    render() {
        var resumeinfo;
        if(this.state.gotResume){
            resumeinfo = "https://273-indeed.s3.us-east-2.amazonaws.com/"+this.state.resumeData
            console.log("resumeinfo"+this.state.resumeData);
        }
        
        if(this.state.didDeleteResume == true) {
            alert("Resume has been deleted");
        }
        
        if(this.state.isRedirectToAppliedJobs == true) {
            console.log("redirecting to applied jobs.....");
            return (
                <div>
                    <Redirect to={`/user/applied/jobs/${this.state.userId}`} /> 
               </div>
            )
        }

        if(this.state.isRedirectToSavedJobs == true) {
            console.log("redirecting to saved jobs.....");
            return (
                <div>
                    <Redirect to={`/user/saved/jobs/${this.state.userId}`} /> 
               </div>
            )
        }

        if(this.state.isRedirectToYourReviews == true) {
            console.log("redirecting to your reviews.....");
            return (
                <div>
                    <Redirect to={`/user/view/reviews/${this.state.userId}`} />
               </div>
            )
        }

        return (
            <div className="container-fluid">
                <UserNavbar></UserNavbar>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={this.state.value} onChange={this.handleChange} aria-label="basic tabs example">
                        <Tab label="Personal Profile" />
                    </Tabs>
                </Box>
                <TabPanel value={this.state.value} index={0}>
                    <div className="container">
                        <Formik initialValues={this.state.userIntialValues}
                            onSubmit={this.handlePersonalProfileForm}
                            validationSchema={this.personalSchema}>
                            <Form>
                                <label className="form-label">First Name</label>
                                <Field type="text" name="fname" className="form-control"></Field>
                                <ErrorMessage name="fname" className="text-danger" component="div"></ErrorMessage>
                                <label className="form-label">Last Name</label>
                                <Field type="text" name="lname" className="form-control"></Field>
                                <ErrorMessage name="lname" className="text-danger" component="div"></ErrorMessage>
                                <label className="form-label">City</label>
                                <Field type="text" name="city" className="form-control" ></Field>
                                <label className="form-label">State</label>
                                <Field type="text" name="state" className="form-control"></Field>
                                <label className="form-label">Country</label>
                                <Field type="text" name="country" className="form-control"></Field>
                                <label className="form-label">Zip</label>
                                <Field type="text" name="zip" className="form-control"></Field>
                                <button className="mt-2 btn btn-primary" type="submit">Save</button>
                            </Form>
                        </Formik>
                        <br/>
                        <div className="col-md-3 d-flex justify-content-left">
                            <a style={{ paddingTop: "15px", paddingLeft: "1px" }} href={resumeinfo}> Download Resume</a>
                        </div>
                        <button className="mt-2 btn btn-primary justify-content-left" type="submit" onClick={() => this.onimageupload(this.state.selectedFile)}>Replace Resume</button> 
                        <br/>
                        <button className="mt-2 btn btn-primary justify-content-left" type="submit" onClick={this.deleteResume}>Delete Resume</button>
                        <br/>
                        <button className="mt-2 btn btn-primary justify-content-left" type="submit" onClick={this.viewAppliedJobs}>View Applied Jobs</button>
                        <br/>
                        <button className="mt-2 btn btn-primary justify-content-left" type="submit" onClick={this.viewSavedJobs}>View Saved Jobs</button>
                        <br/>
                        <button className="mt-2 btn btn-primary justify-content-left" type="submit" onClick={this.viewYourReviews}>View Your Reviews</button>           
                    </div>
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
        )
    }
}

export default UserProfile;