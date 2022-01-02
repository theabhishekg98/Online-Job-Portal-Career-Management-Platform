import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from 'react-router';
import Constants from '../../utils/constants';
import Utils from '../../utils/utils';
import UserNavbar from '../userNavbar'
const C = new Constants();
const utils = new Utils();


class FindJobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: {},
            inputText: "",
            inputLocation: "",
            inputType: "jobTitle",
            jobData: [],
            pageLimit: "3",
            pageSkip: 0,
            maxSkip: 0,
            isJobLoaded: false
        }
        this._getUrlParams();
        this.apiSearchJobs();
    }

    apiSearchJobs = async () => {
        this.setState({ isJobLoaded: false });
        var params = {};
        params['userId'] = this.userId;
        if (this.state.inputLocation.length > 0) {
            params['city'] = this.state.inputLocation;
        }
        if (this.state.inputText.length > 0 && this.state.inputType == 'jobTitle') {
            params['roleName'] = this.state.inputText;
        } else if (this.state.inputText.length > 0 && this.state.inputType == 'companyName') {
            params['companyName'] = this.state.inputText;
        }
        params['offset'] = this.state.pageSkip;

        var response = await Axios.post(`${C.Server_URL}/k/getJobs`, params);
        console.log(response.data);
        if (response.data.length > 0 && 'totalJobs' in response.data[0]){
            this.setState({ maxSkip: (parseInt(response.data[0].totalJobs) - parseInt(this.state.pageLimit)) });
        }
        this.setState({ jobData: response.data, isJobLoaded: true});
    }

    eventBtnSearch = async () => {
        await this.apiSearchJobs();
    }

    eventBtnJobCard = async (e) => {
        this.clickedJobId = e.target.id;
        this.clickedRoleName = e.target.getAttribute('name');
    }

    eventBtnSaveJob = async (e) => {
        var params = {};
        params['userId'] = this.userId;
        params['jobId'] = this.clickedJobId;
        params['roleName'] = this.clickedRoleName;
        params['status'] = 'saved';
        console.log(params);

        var response = await Axios.post(`${C.Server_URL}/k/addApplication`, params);
        var newJobData = this.state.jobData;
        for(var ele of newJobData){
            if(ele['id'] == this.clickedJobId){
                ele['isSaved'] = 'true';
            }
        }
        this.setAsyncState({ jobData: newJobData });
    }

    eventBtnUndoSaveJob = async (e) => {
        var params = {};
        params['userId'] = this.userId;
        params['jobId'] = this.clickedJobId;
        params['status'] = 'saved';

        var response = await Axios.post(`${C.Server_URL}/k/deleteApplication`, params);

        var newJobData = this.state.jobData;
        for (var ele of newJobData) {
            if (ele['id'] == this.clickedJobId) {
                ele['isSaved'] = 'false';
            }
        }

        this.setAsyncState({ jobData: newJobData });
    }

    eventBtnPagination = async (id) => {
        var newPageSkip;
        // var maxSkip = this.state.jobData.length - parseInt(this.state.pageLimit);
        var maxSkip = this.state.maxSkip;
        if (id == "next") {
            newPageSkip = parseInt(this.state.pageSkip) + parseInt(this.state.pageLimit);
            newPageSkip = (newPageSkip > maxSkip) ? maxSkip : newPageSkip;
            console.log(newPageSkip);
        }
        else {
            newPageSkip = parseInt(this.state.pageSkip) - parseInt(this.state.pageLimit);
            newPageSkip = (newPageSkip < 0) ? 0 : newPageSkip;
        }
        await this.setAsyncState({ pageSkip: newPageSkip });
        if (newPageSkip > 0){
            this.apiSearchJobs();
        }
        
    }

    _getUrlParams = async () => {
        this.userId = undefined;
        let urlParams = utils.getAllUrlParams();

        if ('userId' in urlParams) {
            this.userId = urlParams.userId;
        }
    }

    setAsyncState = (newState) => {
        return new Promise((resolve) => this.setState(newState, resolve));
    }

    uiGetJobCard = () => {
        var jobData = [];
        var totalItems = 0, itemIndex = 0;
        for (var job of this.state.jobData) {
            // itemIndex += 1;
            // if (itemIndex <= parseInt(this.state.pageSkip)) {
            //     continue;
            // }
            // totalItems += 1;
            // if (totalItems > parseInt(this.state.pageLimit)) {
            //     break;
            // }

            jobData.push(
                <div className="row align-items-start pt-4">
                    <div className="col-sm-12 border rounded p-4">
                        <a href="#" name={job.roleName} onClick={this.eventBtnJobCard}><p id={job.id} name={job.roleName} className="fs-3" >{job.roleName}</p></a>
                        <p><a href={`${C.HOST_URL}/company/snapshot?companyId=${job.company.id}&userId=${this.userId}`}>{job.company.name}</a></p>
                        {/* <p>{job.location.city}, {job.location.state} {job.location.zipCode}</p> */}
                        <p>{job.city}, {job.state}</p>
                        <p>Salary: ${job.Salary}</p>
                        <p>{this.sliceString(job.description)}</p>
                        <p>Rating: {job.averageRating}</p>
                    </div>
                </div>
            );
        }

        return jobData;
    }

    uiGetJobDetails = () => {
        var jobDetails = "";

        if (this.clickedJobId) {
            for (var job of this.state.jobData) {
                var saveButton = "";
                if (job.isSaved == "true") {
                    saveButton = <div className="col-sm-6">
                        <button className="btn btn-light" onClick={this.eventBtnUndoSaveJob}> Undo Save </button>
                    </div>
                } else {
                    saveButton = <div className="col-sm-6">
                        <button className="btn btn-light" onClick={this.eventBtnSaveJob}> Save Job </button>
                    </div>
                }
                if (this.clickedJobId == job.id) {
                    jobDetails = <div className="row align-items-start border rounded p-4">
                        <div className="row align-items-start">
                            <div className="row align-items-start">
                                <div className="col-sm-6">
                                    <a href={`${C.HOST_URL}/jobs?userId=${this.userId}&companyId=${job.company.id}&jobId=${job.id}`}>Apply for this Job</a>
                                    {/* <button className="btn btn-primary" onClick={this.eventBtnSearch}> Apply for this Job </button> */}
                                </div>
                                {saveButton}
                            </div>
                            <div className="col-sm-12 pt-4">
                                <p className="fs-2">Job Role</p>
                                <p className="fs-3">{job.roleName}</p>
                                <p><a href={`${C.HOST_URL}/company/snapshot?companyId=${job.company.id}&userId=${this.userId}`}>{job.company.name}</a></p>
                                {/* <p>{job.location.city}, {job.location.state} {job.location.zipCode}</p> */}
                                <p>{job.city}, {job.state}, {job.zipCode}</p>
                                <p>{this.sliceString(job.description)}</p>
                                <p>Job Type: {job.jobType}</p>
                                <p>Average Rating: {job.averageRating}</p>
                                <p>Total Reviews: {job.totalReviews}</p>
                            </div>
                        </div>

                        <div className="row align-items-start pt-4">
                            <div className="col-sm-12">
                                <p className="fs-2">Job Details</p>
                                <p className="fw-bold">Salary Details:</p>
                                <p>Salary: ${job.Salary}</p>
                                <p>{job.jobType}</p>

                            </div>
                        </div>

                        <div className="row align-items-start pt-4">
                            <div className="col-sm-12">
                                <p className="fs-2">Full Job Description</p>
                                <p className="fw-bold">Location:</p>
                                {/* <p>{job.location.city}, {job.location.state} {job.location.zipCode}</p> */}
                                <p>{job.city}, {job.state}</p>
                                <p className="fw-bold">What You’ll Do:</p>
                                <p>{job.whatYouWillDo}</p>
                                <p className="fw-bold">Why You’ll love working for a {job.roleName}:</p>
                                <p>{job.whatYouWillLove}</p>
                                <p className="fw-bold">What You’ll Need:</p>
                                <p>{job.whatYouWillNeed}</p>
                            </div>
                        </div>
                    </div>
                }
            }
        }

        return jobDetails;
    }

    sliceString = (s) => {
        if (s && s.length > 40) {
            s = s.slice(0, 40) + "..";
        }
        return s
    }

    render() {
        var jobData = this.uiGetJobCard();
        var jobDetails = this.uiGetJobDetails();
        var loadingMsg = "Loading Jobs...";
        if(this.state.isJobLoaded){
            loadingMsg = "";
        }

        return (
            <div>
                <UserNavbar />
                <div className="container">
                    <div className="row align-items-start">
                        <div className="col-sm-12">
                            <h3>Find Jobs</h3>
                        </div>
                    </div>
                    <div className="row align-items-start pt-4">
                        <div className="col-2">
                            <select className="form-select" id="lang" name="inputType" defaultValue={this.state.inputType} onChange={e => this.setState({ inputType: e.target.value })} value={this.state.inputType} style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
                                <option value="jobTitle">Job Title</option>
                                <option value="companyName">Company</option>
                            </select>
                        </div>
                        <div className="col-4">
                            <div class="form-floating mb-3">
                                <input className="form-control" id="floatingInput" type="text" value={this.state.inputText} onChange={e => this.setState({ inputText: e.target.value })} placeholder="Product Manager" />
                                <label for="floatingInput">What</label>
                            </div>
                        </div>
                        <div className="col-4">
                            <div class="form-floating mb-3">
                                <input className="form-control" id="floatingInput" type="text" value={this.state.inputLocation} onChange={e => this.setState({ inputLocation: e.target.value })} placeholder="San Francisco" />
                                <label for="floatingInput">Where</label>
                            </div>
                        </div>
                        <div className="col-2">
                            <button className="btn btn-primary" onClick={this.eventBtnSearch} style={{ padding: '1rem' }}> Find Jobs </button>
                        </div>
                    </div>

                    <div className="row align-items-start pt-4">
                        <div className="col-4">
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                    <li class="page-item" onClick={e => this.eventBtnPagination("previous")}><a href="#" class="page-link">Previous</a></li>
                                    <li class="page-item" onClick={e => this.eventBtnPagination("next")}><a href="#" class="page-link">Next</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <div className="row align-items-start pt-4">
                        <div className="col-5">
                            {loadingMsg}
                            {jobData}
                        </div>
                        <div className="col-1"></div>
                        <div className="col-5 pt-4">
                            {jobDetails}
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}


export default FindJobs;

