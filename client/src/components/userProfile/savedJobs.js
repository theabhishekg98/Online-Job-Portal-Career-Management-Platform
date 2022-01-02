import React, { Component } from "react";
import axios from "axios";
import { Redirect } from 'react-router';
import Constants from '../../utils/constants';
import Utils from '../../utils/utils';
import UserNavBar from '../userNavbar';
const C = new Constants();
const utils = new Utils();

class savedJobs extends Component {
    constructor(props) {
        super(props);
        this.userDetailsFromStorage=JSON.parse(sessionStorage.getItem('authenticateDetails'))
        this.state = {
            userId: '',
            savedJobsList: [],
            jobNames: [],
            displaySavedJobs: false
        }
        // this._getUrlParams();
        this.getSavedJobs();
    }

    getSavedJobs = async () => {
        console.log("enter saved jobs");
        this.state.userId =  this.userDetailsFromStorage.userId;
        // console.log(this.state.userId);
        axios.post(`${C.Server_URL}/abhishek/view/saved/jobs/${this.state.userId}`)
        .then(response => {
            console.log("view saved jobs response", response.data);
            this.setState({
                savedJobsList : response.data
            });

            if(Object.keys(this.state.savedJobsList).length > 0)
            {
                // console.log("here--->", this.state.savedJobsList)
                this.setState({
                    displaySavedJobs:true
                });
            }
        })
        .catch(err => {
            console.log("Error"+err);
        });

    }

    uiSavedJobs = () => {
        var savedJobsList = [];
        var arr = Object
        // console.log(typeof this.state.vAppliedJobsList);
        arr = this.state.savedJobsList;
        console.log("building job applications ui card", arr);
        for (const [key, value] of Object.entries(arr)) {
            savedJobsList.push(        
                <div className="row align-items-center pt-4">
                    <div className="col-sm-12 rounded p-4">
                        <button className="btn btn-primary" 
                            onClick={()=>{}} 
                            style={{ padding: '2rem', width: '500px' }}>
                                <b>Role: {value.roleName} </b>
                                <br/>
                                <b>Status: {value.status} </b>
                        </button>
                    </div>
                </div>
            );
        }

        return savedJobsList;
    }

    render() {
        // if(this.state.isRedirect == true) {
        //     console.log("redirecting to company snapshot...");
        //     return (
        //         <div>
        //             <Redirect to={`/company/snapshot?companyId=${this.state.companyId}`} />
        //        </div>
        //     )
        // }

        if(this.state.displaySavedJobs == true) {
            return (
                <div>
                    <div className="container">
                        <UserNavBar/>
                        <div className="row align-items-start">
                            <div className="col-sm-12">
                                <h3>Saved Jobs</h3>
                            </div>
                        </div>
                        
                        <div className="row align-items-start pt-4">
                            <div className="col-5">
                                {/* Display average salary */}
                                {this.uiSavedJobs()}
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
                            <h3>YOU DO NOT HAVE ANY SAVED JOBS!</h3>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default savedJobs;


