import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from 'react-router';
import Constants from '../../utils/constants';
import Utils from '../../utils/utils';
import CompanyNavbar from "../companyNavbar";
import UserNavbar from '../userNavbar'
const C = new Constants();
const utils = new Utils();


class WhyJoinUs extends Component {
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

    render() {
        return (
            <div>
                <UserNavbar/>
                <CompanyNavbar/>
                <div className="container">
                    <div className="row align-items-start">
                        <div className="col-sm-12">
                            <h3>Why Join Us</h3>
                        </div>
                    </div>
                    <div className="row align-items-start pt-4">
                        <div className="col-sm-12">
                            <img class="border" style={{ width: "100%" }} src={this.state.company.banner} alt="banner"/>
                        </div>
                    </div>
                    <div className="row align-items-start pt-4">
                        <div className="col-sm-1">
                            <img class="border" style={{ width: "100px" }} src={this.state.company.logo} alt="banner"/>
                        </div>
                        <div className="col-sm-11">
                            <p class="fs-1">{this.state.company.name}</p>
                        </div>
                    </div>
                    <div className="row align-items-start pt-4">
                        <div className="col-sm-12">
                            <p class="fs-2">About {this.state.company.name}</p>
                        </div>
                        <div className="col-sm-12">
                            <p>{this.state.company.about}</p>
                        </div>
                    </div>
                    <div className="row align-items-start pt-4">
                        <div className="col-sm-12">
                            <p class="fs-2">Work Culture</p>
                        </div>
                        <div className="col-sm-12">
                            <p>{this.state.company.workCulture}</p>
                        </div>
                    </div>
                    <div className="row align-items-start pt-4">
                        <div className="col-sm-12">
                            <p class="fs-2">Company Values</p>
                        </div>
                        <div className="col-sm-12">
                            <p>{this.state.company.companyValues}</p>
                        </div>
                    </div>

                </div>
            </div >
        );
    }
}


export default WhyJoinUs;

