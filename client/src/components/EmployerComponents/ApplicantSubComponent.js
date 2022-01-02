import React, { Component } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios'
import Constants from '../../utils/constants';
import Modal from "react-bootstrap/Modal";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ChatDialog from './ChatDialog';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup";
import Select from 'react-select';
// import Button from 'react-bootstrap/Button'
const C = new Constants();



export default class ApplicantSubComponent extends Component {


    constructor(props) {
        super(props)

        this.state = {
            open: false,
            scroll: 'paper',
            applicants: [],
            name: "",
            setalert: false,
            openChat: false,
            chatUser: "",
            redirectToUserProfile: false,
            userId: "",
            messageSent: false,
            empId: "",
            userfName: "",
            redirectToUserMessages: false

        }
    }

    componentDidMount(props) {
           console.log(this.props.empId)
        this.setState(
            {
                applicants: this.props.applicants,
                empId: this.props.empId
            })
    }

    handleOnAlertClose = () => {
        this.setState(
            {
                setalert: false
            })

    }

    handleDialogclose = () => {

        this.setState(
            {
                open: false,
                openChat: false
            })


    }
    handleOnopen = (e) => {

        this.setState(
            {
                open: true
            })
        console.log(this.state)
    }

    handleOnchange = (e, id) => {
        // console.log(id)
        console.log(e)
        // console.log(e.target.value)
        //   console.log(e.target.status)
        axios.get(`${C.Server_URL}/abhi/updateJobStatus/${id}/${e.value}`)
            .then(resp => {
                console.log(resp)
                this.setState(
                    {
                        setalert: true
                    })
             
                alert("Applicant status changes")
            }
            )
            .catch(err => { console.log(err) })
        // setFieldValue("submitted",e.target.value)

    }

    handleMessage = (userId, userfName) => {
        // console.log("hey")
        // console.log(userfName)
        // console.log(userId)

        axios.get(`${C.Server_URL}/abhi/CheckChat/${userId}/${this.state.empId}`)
            .then(resp => {

                console.log(resp)
                if (resp.data.status == "exists") {
                    this.setState(
                        {
                            redirectToUserMessages: true
                        })
                }
                else {
                    this.setState(
                        {
                            chatUser: userId,
                            openChat: true,
                            userfName: userfName
                        }
                    )
                }
            }).catch(err => { console.log(err) })


    }
    redirectToUserProfile = (userId) => {
        // console.log(userId)
        // console.log(userId)
        this.setState(
            {

                redirectToUserProfile: true,
                userId: userId
            })
    }
    handlemessageSent = () => {
        this.setState(
            {
                messageSent: true
            })
    }
    closeChatDialog = () => {
        this.setState(
            {
                openChat: false
            })
    }




    render() {

        const options = [
            { value: "submitted", label: "Submitted" },
            { value: "reviewed", label: "reviewed" },
            { value: "initial screening", label: "initial screening" },
            { value: "interviewing", label: "Interviewing" },
            { value: "rejected", label: "Rejected" },
        ]


        if (this.state.redirectToUserProfile != true && this.state.redirectToUserMessages != true) {
            console.log(this.state.applicants)
            console.log(this.props.job.Applicants)
            return (<div className="row" style={{ padding: "0px", marginLeft: "0px", marginRight: "0px", marginTop: "10px" }}>
                <div className="col-md-2">
                </div>
                <div className="col-md-8">
                    <div class="list-group">
                        <a onClick={this.handleOnopen} class="list-group-item list-group-item-action flex-column align-items-start ">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">{this.props.Job_Title}</h5>
                            </div>
                            <small>{this.props.Jobtype}</small><br />
                            <small>Applications: {this.props.job.Applicants.length}</small>
                        </a>
                    </div>
                </div>
                <div className="col-md-2">
                </div>

                {this.state.open === true ? <Dialog
                    open={this.state.open}
                    onClose={this.handleDialogclose}
                    scroll={this.state.scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle id="scroll-dialog-title">Applicants</DialogTitle>
                    <DialogContent dividers={this.state.scroll === 'paper'} style={{ height: '600px' }}>
                        <DialogContentText
                            id="scroll-dialog-description"
                            tabIndex={-1}
                        >
                            <div className="container">
                                {/* {this.state.applicants.length == 0 ? <div>No applicants yet</div> : ""}  */}
                                {/* {this.props.job.Applicants.length==0?<div>No applicants</div>:""} */}
                                {this.props.job.Applicants.length == 0 ? "No Applicants" : this.state.applicants.map((data, key) => {
                                    return <div className="row border" style={{ paddingBottom: "10px" }}>
                                        <div className="col-md-1 d-flex justify-content-center" >
                                            <MailOutlineIcon key={key} style={{ marginTop: "15px", cursor: 'pointer' }} onClick={() => { this.handleMessage(data.userId, data.userfName) }} ></MailOutlineIcon>
                                        </div>
                                        <div className="col-md-2 d-flex justify-content-center">
                                            <a onClick={() => { this.redirectToUserProfile(data.userId) }} style={{ paddingTop: "15px", cursor: 'pointer' }}>{data.userfName
                                            }</a>
                                        </div>
                                        <div className="col-md-3 d-flex justify-content-center">
                                            <a style={{ paddingTop: "15px" }} href={data.resumeLink}>Resume</a>
                                        </div>
                                        <div className="col-md-3 d-flex justify-content-center">
                                            <a style={{ paddingTop: "15px" }} href={data.coverLink} >Cover Letter</a>
                                        </div>
                                        <div className="col-md-3 ">
                                            <Select options={[
                                                { value: "submitted", label: "Submitted" },
                                                { value: "reviewed", label: "reviewed" },
                                                { value: "initial screening", label: "initial screening" },
                                                { value: "interviewing", label: "Interviewing" },
                                                { value: "rejected", label: "Rejected" },
                                                  ]} defaultValue = {data.status}  placeholder={data.status} onChange={(e) => {  this.handleOnchange(e, data._id) }} ></Select>
                            
                                        </div>
                                    </div>
                                })
                                }
                            </div>
                            {this.state.openChat === true && this.state.messageSent == false ? <ChatDialog closeChat={this.closeChatDialog} messageSent={this.handlemessageSent} empId={this.state.empId} userId={this.state.chatUser} name={this.state.userfName}></ChatDialog>
                                :
                                ""

                            }
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>

                    </DialogActions>

                </Dialog> : ""}
            </div>

            )
        } else if (this.state.redirectToUserProfile == true) {
            return (
                <div>
                    <Redirect to={{
                        pathname: "/employer/user/profile",
                        state: { userId: this.state.userId }
                    }}>

                    </Redirect>
                </div>

            )
        } else {
            return (<div>
                <Redirect to={{
                    pathname: "/company/messages",
                    state: { userId: this.state.empId }
                }}>
                </Redirect>
            </div>)
        }

    }
}
