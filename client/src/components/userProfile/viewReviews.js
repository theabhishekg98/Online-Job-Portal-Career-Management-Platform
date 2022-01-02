import React, { Component } from "react";
import axios from "axios";
import { Redirect } from 'react-router';
import Constants from '../../utils/constants';
import Utils from '../../utils/utils';
import UserNavBar from '../userNavbar';
const C = new Constants();
const utils = new Utils();

class viewReviews extends Component {
    constructor(props) {
        super(props);
        this.userDetailsFromStorage=JSON.parse(sessionStorage.getItem('authenticateDetails'))
        this.state = {
            userId: '',
            companyId: '',
            reviewList: [],
            isRedirect: false,
            displayReviews:false
        }
        // this._getUrlParams();
        this.getReviews();
    }

    getReviews = async () => {
        console.log("enter view reviews list");
        this.state.userId =  this.userDetailsFromStorage.userId;// dynamic fetch
        axios.post(`${C.Server_URL}/abhishek/view/your/reviews/${this.state.userId}`)
        .then(response => {
            console.log("view reviews response", response);
            this.setState({
                reviewList : response.data
            });

            if(Object.keys(this.state.reviewList).length > 0)
            {
                this.setState({
                    displayReviews:true
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

    uiReviews = () => {
        var reviewsList = [];
        var arr = Object
        // console.log(typeof this.state.vAppliedJobsList);
        arr = this.state.reviewList;
        console.log("building reviews card", arr);
        for (const [key, value] of Object.entries(arr)) {
            console.log("key: ", value.companyName);
            reviewsList.push(        
                <div className="row align-items-center pt-4">
                    <div className="col-sm-12 rounded p-4">
                        <button className="btn btn-primary" 
                            onClick={()=>{this.handleRedirect(value.userId, value.companyId)}} 
                            style={{ padding: '2rem', width: '500px' }}>
                                <b>Review Summary: {value.reviewSummary} </b>
                                <br/>
                                Pros: {value.pros}
                                <br/>
                                Cons: {value.cons}
                                <br/>
                                CEO Approval: {value.ceoApproval}
                        </button>
                    </div>
                </div>
            );
        }
        
        return reviewsList;
    }

    render() {
        if(this.state.isRedirect == true) {
            console.log("redirecting to your reviews.....");
            return (
                <div>
                    <Redirect to={`/user/reviews?companyId=${this.state.companyId}&userId=${this.state.userId}`} />
               </div>
               
            )
        }

        if(this.state.displayReviews == true) {
            return (
                <div>
                    <div className="container">
                        <UserNavBar/>
                        <div className="row align-items-start">
                            <div className="col-sm-12">
                                <h3>Your Reviews</h3>
                            </div>
                        </div>
                        
                        <div className="row align-items-start pt-4">
                            <div className="col-5">
                                {/* Display average salary */}
                                {this.uiReviews()}
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
                            <h3>YOU DO NOT HAVE ANY REVIEWS!</h3>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default viewReviews;


