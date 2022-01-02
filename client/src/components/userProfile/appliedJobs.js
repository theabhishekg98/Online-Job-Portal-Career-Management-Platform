import React, { Component } from "react";
import axios from "axios";
import { Redirect } from 'react-router';
import Constants from '../../utils/constants';
import Utils from '../../utils/utils';
import UserNavBar from '../userNavbar';
const C = new Constants();
const utils = new Utils();

class viewAppliedJobs extends Component {
    constructor(props) {
        super(props);
        this.userDetailsFromStorage=JSON.parse(sessionStorage.getItem('authenticateDetails'))
        this.state = {
            userId: '',
            companyId: '',
            vAppliedJobsList: [],
            jobNames: [],
            isRedirect: false,
            displayJobApplications:false
        }
        // this._getUrlParams();
        this.getAppliedJobs();
    }

    getAppliedJobs = async () => {
        // var params = {};
        // params['userId'] = this.state.userId;
        // console.log(params);
            // var userId = this.props.location.state.id +" "+ 3 //this.props.location.state.id +" "+ 1 //userID
        
        console.log("enter view applied jobs");
        this.state.userId =  this.userDetailsFromStorage.userId;// dynamic fetch
        axios.post(`${C.Server_URL}/abhishek/view/applied/jobs/${this.state.userId}`)
        .then(response => {
            console.log("view applied jobs response", response);
            this.setState({
                vAppliedJobsList : response.data
            });

            if(Object.keys(this.state.vAppliedJobsList).length > 0)
            {
                this.setState({
                    displayJobApplications:true
                });
            }
        })
        .catch(err => {
            console.log("Error"+err);
        });

    }

    handleRedirect = (userId, companyId) => {
        console.log("userId : ", userId);
        console.log("companyId : ", companyId);
        this.setState({ 
            isRedirect: true,
            companyId : companyId,
            userId: userId
        });
    }

    // /user/reviews?companyId=${this.companyId}&userId=${this.userId}`

    uiAppliedJobs = () => {
        var appliedJobsList = [];
        var arr = Object
        // console.log(typeof this.state.vAppliedJobsList);
        arr = this.state.vAppliedJobsList;
        console.log("building job applications ui card", arr);
        for (const [key, value] of Object.entries(arr)) {
            appliedJobsList.push(        
                <div className="row align-items-center pt-4">
                    <div className="col-sm-12 rounded p-4">
                        <button className="btn btn-primary" 
                            onClick={()=>{this.handleRedirect(value.userId, value.companyId)}} 
                            style={{ padding: '2rem', width: '500px' }}>
                                Company Name: <b>{value.name} </b>
                                <br/>
                                Application Status: <b>{value.status} </b>
                        </button>
                    </div>
                </div>
            );
        }
        
        return appliedJobsList;
    }

    render() {
        if(this.state.isRedirect == true) {
            console.log("redirecting to company snapshot...");
            return (
                <div>
                    <Redirect to={`/company/snapshot?companyId=${this.state.companyId}`} />
               </div>
            )
        }

        if(this.state.displayJobApplications == true) {
            return (
                <div>
                    <div className="container">
                        <UserNavBar/>
                        <div className="row align-items-start">
                            <div className="col-sm-12">
                                <h3>Applied Jobs</h3>
                            </div>
                        </div>
                        
                        <div className="row align-items-start pt-4">
                            <div className="col-5">
                                {/* Display average salary */}
                                {this.uiAppliedJobs()}
                            </div>
                        </div>
                    </div>
                </div >
            );
        }
        else 
        {
            return (
                <div className="container">
                    <UserNavBar/>
                    <div className="row align-items-start">
                        <div className="col-sm-12 d-flex justify-content-center">
                            <h3>YOU DO NOT HAVE ANY APPLICATIONS!</h3>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default viewAppliedJobs;


