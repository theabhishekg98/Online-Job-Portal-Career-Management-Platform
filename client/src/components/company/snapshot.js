import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from 'react-router';
import Constants from '../../utils/constants';
import Utils from '../../utils/utils';
import CompanyNavbar from "../companyNavbar";
import UserNavbar from '../userNavbar'
const C = new Constants();
const utils = new Utils();




class Snapshot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: {}
        }
    }

    componentDidMount = async () => {
        await this._getUrlParams();
        this.apiGetCompany();
    }

    apiGetCompany = async () => {
        var params = { 'id': this.companyId };
        var response = await Axios.post(`${C.Server_URL}/k/getCompany`, params);
        console.log(response.data);
        this.setState({ company: response.data });
    }

    _getUrlParams = async () => {
        this.companyId = undefined;
        let urlParams = utils.getAllUrlParams();

        if ('companyId' in urlParams) {
            this.companyId = urlParams.companyId
        }
    }

    uiGetReviews = () => {
        if (!('featuredReviews' in this.state.company) || this.state.company.featuredReviews.length <= 0) {
            return;
        }

        var reviews = [];
        var allReviews = JSON.parse(JSON.stringify(this.state.company.featuredReviews));
        for (var ele of allReviews) {
            console.log(ele.reviewSummary);
            reviews.push(<div className="row align-items-start pt-4">
                <div className="col-sm-12 border rounded p-4">
                    <p>Rating: {ele.overallRating}</p>
                    <p className="fw-bold">{ele.reviewSummary}</p>
                    <p>{ele.fullReview}</p>
                </div>
            </div>)
        }
        return reviews;
    }

    render() {
        return (
            <div>
                <UserNavbar />
                <CompanyNavbar />
                <div className="container">
                    <div className="row align-items-start">
                        <div className="col-sm-12">
                            <h3>Snapshot</h3>
                        </div>
                    </div>
                    <div className="row align-items-start pt-4">
                        <div className="col-sm-12">
                            <img class="border" style={{ width: "100%" }} src={this.state.company.banner} alt="banner" />
                        </div>
                    </div>
                    <div className="row align-items-start pt-4">
                        <div className="col-sm-1">
                            <img class="border" style={{ width: "100px" }} src={this.state.company.logo} alt="banner" />
                        </div>
                        <div className="col-sm-11">
                            <p class="fs-1">{this.state.company.name}</p>
                        </div>
                    </div>
                    <div className="row align-items-start pt-4">
                        <div className="col-sm-12">
                            <p class="fs-2">Description</p>
                        </div>
                        <div className="col-sm-12">
                            <p>{this.state.company.description}</p>
                        </div>
                    </div>
                    <div className="row align-items-start pt-4">
                        <div className="col-sm-2">
                            <p><a href={this.state.company.website}>Website</a></p>
                        </div>
                        <div className="col-sm-2">
                            <p>Founded: {this.state.company.foundDate}</p>
                        </div>
                        <div className="col-sm-2">
                            <p>Headquarters: {this.state.company.headquarters}</p>
                        </div>
                        <div className="col-sm-2">
                            <p>Revenue: {this.state.company.revenue}</p>
                        </div>
                        <div className="col-sm-2">
                            <p>Industry: {this.state.company.industry}</p>
                        </div>
                        <div className="col-sm-2">
                            <p>CEO: {this.state.company.ceo}</p>
                        </div>
                    </div>
                    <div className="row align-items-start pt-4">
                        <div className="col-sm-12">
                            <p class="fs-2">About</p>
                        </div>
                        <div className="col-sm-12">
                            <p>{this.state.company.about}</p>
                        </div>
                    </div>
                    <div className="row align-items-start pt-4">
                        <div className="col-sm-12">
                            <p class="fs-2">Mission</p>
                        </div>
                        <div className="col-sm-12">
                            <p>{this.state.company.mission}</p>
                        </div>
                    </div>
                    <div className="row align-items-start pt-4">
                        <div className="col-sm-12">
                            <p class="fs-2">Reviews</p>
                        </div>
                        {this.uiGetReviews()}
                    </div>

                </div>
            </div >
        );
    }
}


export default Snapshot;

