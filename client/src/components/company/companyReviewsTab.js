import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from 'react-router';
import Constants from '../../utils/constants';
import Utils from '../../utils/utils';
import UserNavBar from '../userNavbar';
const C = new Constants();
const utils = new Utils();

var bool = false;

class CompanyReviewsTab extends Component {
    constructor(props) {
        super(props);
        this.userDetailsFromStorage=JSON.parse(sessionStorage.getItem('authenticateDetails'))
        this.state = {
            inputText: "",
            inputLocation: "",
            popularCompaniesData:[],
            companiesData: [],
            isRedirect: false,
            companyId: "",
            allCompaniesCardDataUi:[]
        }
        this.getPopularCompanies();
    }

    getPopularCompanies = async () => {
        console.log("session storage data:", this.userDetailsFromStorage);
        console.log("popular");
        var params = {};
        params['userId'] = this.userDetailsFromStorage.userId;
        //get popular companies
        var response = await Axios.get(`${C.Server_URL}/abhishek/company/getAll/companies`, params);
        console.log("my response:", response.data.allCompanies);
        this.setState({ popularCompaniesData: response.data.allCompanies});
        console.log("Get all companies: " + this.state.popularCompaniesData);
        this.uiGetAllCompaniesCard()
    }

    getCompanies = async () => {
        console.log("searched");
        var params = {};
        params['userId'] = this.userDetailsFromStorage.userId;
        if (this.state.inputLocation.length > 0) {
            params['city'] = this.state.inputLocation;
        }
        if (this.state.inputText.length > 0) {
            params['roleName'] = this.state.inputText;
        } 
        
        console.log(params);
        
        var response = await Axios.post(`${C.Server_URL}/abhishek/company/getSearched/company`, params);
        this.setState({ companiesData: response.data });
        console.log("Get the company: " + this.state.companiesData);
    }
    
    eventBtnSearch = () => {
        if(this.state.inputText!='' || this.state.inputLocation !='') this.getCompanies();
    }

    handleRedirect = (companyId) => {
        this.setState({ 
            isRedirect: true,
            companyId : companyId
        });
    }

    uiGetTheCompanyCard = () => {
        if(this.state.companiesData != [])
        {   
            var companyCardData = [];
            var arr = Object
            arr = this.state.companiesData.allCompanies;
            for (const [key, value] of Object.entries(arr)) {
                companyCardData.push(        
                    <div className="row align-items-center pt-4">
                        <div className="col-sm-12 border rounded p-4">
                            <a href={`${C.HOST_URL}/user/reviews?companyId=${value.id}&userId=${this.userDetailsFromStorage.userId}`} > <b>{value.name} </b></a>
                            <br/>
                            <a href={`${C.HOST_URL}/user/reviews?companyId=${value.id}&userId=${this.userDetailsFromStorage.userId}`} >Reviews</a>
                            <br/>
                            <a href={`${C.HOST_URL}/company/salaries?companyId=${value.id}&userId=${this.userDetailsFromStorage.userId}`} >Salaries</a>
                            <br/>
                            <a href={`${C.HOST_URL}/jobhome?companyId=${value.id}&userId=${this.userDetailsFromStorage.userId}`} >Jobs</a>
                        </div>
                    </div>
                );
            }
            return companyCardData;
        }
        else return [];
    }
    
    uiGetAllCompaniesCard = () => {
        // console.log("gettingCard", this.state.popularCompaniesData);
        var allCompaniesCardData = [];
        if(this.state.popularCompaniesData != undefined) {
            var arr = Object
            arr = this.state.popularCompaniesData;
            for (const [key, value] of Object.entries(arr)) {
                console.log("values:", value);           
                allCompaniesCardData.push(        
                    <div className="row align-items-center pt-4">
                        <div className="col-sm-12 border rounded p-4">
                            <a href={`${C.HOST_URL}/user/reviews?companyId=${value.id}&userId=${this.userDetailsFromStorage.userId}`} > <b>{value.name} </b></a>
                            <br/>
                            <a href={`${C.HOST_URL}/user/reviews?companyId=${value.id}&userId=${this.userDetailsFromStorage.userId}`} >Reviews</a>
                            <br/>
                            <a href={`${C.HOST_URL}/company/salaries?companyId=${value.id}&userId=${this.userDetailsFromStorage.userId}`} >Salaries</a>
                            <br/>
                            <a href={`${C.HOST_URL}/jobhome?companyId=${value.id}&userId=${this.userDetailsFromStorage.userId}`} >Jobs</a>
                        </div>
                    </div>
                );
            }
        }

        // console.log("tug");
        this.setState ({
            allCompaniesCardDataUi : allCompaniesCardData
        });

        console.log("card ui data", this.state.allCompaniesCardDataUi);
    }
    

    render() {
        if(this.state.isRedirect == true) {
            console.log("redirecting to company reviews.....");
            return (
                <div>
                    <Redirect to={`/user/reviews?companyId=${this.state.companyId}`} />
               </div>
            )
        }

        if(this.state.companiesData.allCompanies != undefined) {
            return(
            <div>
                <UserNavBar/>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-sm-12">
                            <h3>Company Reviews Tab</h3>
                        </div>
                    </div>
                    <div className="row align-items-start pt-4">
                        <div className="col-4">
                            <div class="form-floating mb-3">
                                <input className="form-control" id="floatingInput" type="text" value={this.state.inputText} onChange={e => this.setState({ inputText: e.target.value })} />
                                <label for="floatingInput">Company</label>
                            </div>
                        </div>
                        <div className="col-4">
                            <div class="form-floating mb-3">
                                <input className="form-control" id="floatingInput" type="text" value={this.state.inputLocation} onChange={e => this.setState({ inputLocation: e.target.value })} />
                                <label for="floatingInput">Location</label>
                            </div>
                        </div>
                        <div className="col-2">
                            <button className="btn btn-primary" onClick={this.eventBtnSearch} style={{ padding: '1rem' }}> Find Company </button>
                        </div>
                    </div>
                    <div className="col-5">
                        {/* Display average salary */}
                        <p> Search Results </p>
                        {this.uiGetTheCompanyCard()}
                    </div>
                </div>
            </div >
            )
        }
        else {
            return(
            <div>
                <UserNavBar/>
                <div className="container">
                    <div className="row align-items-start">
                        <div className="col-sm-12">
                            <h3>Company Reviews Tab</h3>
                        </div>
                    </div>
                    <div className="row align-items-start pt-4">
                        <div className="col-4">
                            <div class="form-floating mb-3">
                                <input className="form-control" id="floatingInput" type="text" value={this.state.inputText} onChange={e => this.setState({ inputText: e.target.value })} />
                                <label for="floatingInput">Job Title</label>
                            </div>
                        </div>
                        <div className="col-4">
                            <div class="form-floating mb-3">
                                <input className="form-control" id="floatingInput" type="text" value={this.state.inputLocation} onChange={e => this.setState({ inputLocation: e.target.value })} />
                                <label for="floatingInput">Location</label>
                            </div>
                        </div>
                        <div className="col-2">
                            <button className="btn btn-primary" onClick={this.eventBtnSearch} style={{ padding: '1rem' }}> Find Company </button>
                        </div>
                    </div>

                    <div className="col-5">
                        <p> Popular Companies </p>
                        {/* {this.uiGetAllCompaniesCard()} */}
                        {this.state.allCompaniesCardDataUi}
                    </div>
                    
                </div>
            </div >
            )
        }
    }
}

export default CompanyReviewsTab;
