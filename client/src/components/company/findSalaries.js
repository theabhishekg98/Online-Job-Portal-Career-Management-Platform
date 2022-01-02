import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from 'react-router';
import Constants from '../../utils/constants';
import Utils from '../../utils/utils';
import UserNavBar from '../userNavbar';
const C = new Constants();
const utils = new Utils();

class FindSalaries extends Component {
    constructor(props) {
        super(props);
        this.userDetailsFromStorage=JSON.parse(sessionStorage.getItem('authenticateDetails'))
        this.state = {
            inputText: "",
            inputLocation: "",
            avgSalaryData: "",
            topFiveSalariesData: [], 
        }
        this.apiSearchSalaries();
    }
    
        
    apiSearchSalaries = async () => {
        // console.log("session storage data:", this.userDetailsFromStorage);
        var params = {};
        params['userId'] = this.userDetailsFromStorage.userId;
        if (this.state.inputLocation.length > 0) {
            params['city'] = this.state.inputLocation;
        }
        if (this.state.inputText.length > 0) {
            params['roleName'] = this.state.inputText;
        } 
        console.log(params);
        
        //get average salary of role
        var response = await Axios.post(`${C.Server_URL}/abhishek/company/salary/averageSalary`, params);
        // console.log(typeof response.data);
        console.log("Average Salary: " + response.data);
        this.setState({ avgSalaryData: response.data.avgSalary });

        //get top 5 paying companies for role
        var response = await Axios.post(`${C.Server_URL}/abhishek/company/salary/topFiveSalaries`, params);
        console.log("Top 5 companies: " + response.data);
        this.setState({ topFiveSalariesData: response.data });

    }

    eventBtnSearch = async () => {
        await this.apiSearchSalaries();
    }

    uiTopFiveSalariesCard = () => {
        var topFiveSalariesCardData = [];
        for (var job of this.state.topFiveSalariesData) {
            topFiveSalariesCardData.push(        
                <div className="row align-items-start pt-4">
                    <div className="col-sm-12 border rounded p-4">
                        <div> {job.name} </div>
                        <br/>
                        <p> Average Salary of {job.name} per year: ${job.avg} per year</p>  
                    </div>
                </div>
            );
        }
        return topFiveSalariesCardData;
    }
    uiAverageSalaryCard = () => {
        var averageSalaryCardData = [];
        // var totalItems = 0, itemIndex = 0;
        averageSalaryCardData.push(
            <div className="row align-items-start pt-4">
                <div className="col-sm-12 border rounded p-4">
                    <div> Average Salary of {this.state.inputText} per year: </div>
                    <br/>
                    <p> ${this.state.avgSalaryData} per year</p>  
                </div>
            </div>
        );
        return averageSalaryCardData;
    }

    render() {
        return (
          
            <div>
                  <UserNavBar/>
                <div className="container">
                  
                    <div className="row align-items-start">
                        <div className="col-sm-12">
                            <h3>Find Salaries</h3>
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
                            <button className="btn btn-primary" onClick={this.eventBtnSearch} style={{ padding: '1rem' }}> Find Salaries </button>
                        </div>
                    </div>

                    <div className="row align-items-start pt-4">
                        <div className="col-5">
                            {/* Display average salary */}
                            {this.uiAverageSalaryCard()}
                        </div>
                        <div className="col-1"></div>
                        <div className="col-5">
                            {/* Display 5 highest paying companies for the role */}
                            <p> Top Companies for {this.state.inputText}</p>
                            {this.uiTopFiveSalariesCard()}
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default FindSalaries;


