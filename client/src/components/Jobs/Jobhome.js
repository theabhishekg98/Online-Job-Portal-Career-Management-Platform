import React, { Component } from 'react';
import axios from 'axios';
import Jobinfo from './Jobinfo';
import serverroute from '../../webconfig';
import { Col, Row, FormControl, Form,Button } from 'react-bootstrap';
import UserNavbar from '../userNavbar'
import CompanyNavbar from "../companyNavbar";
import Pagination from "@material-ui/lab/Pagination";
import Constants from '../../utils/constants';
import Utils from '../../utils/utils';
import { Box } from "@material-ui/core";

const C = new Constants();
const utils = new Utils();
class Jobhome extends React.Component {
    constructor(props) {
        super(props);
        this.state=({
            itemsPerPage: 5,
            page: 1,
            noOfPages: 0,
        })
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount = async () => {
    await this._getUrlParams();
    this.apiGetCompany();
    if(this.state && this.state.companyID){
        console.log("here the id is"+this.state.companyID)
        var data = this.state.companyID //add company id later
        axios.get(`${serverroute}/an/jobs/${data}`)
            .then(response => {
                if (response.data) {
                    console.log("jons"+JSON.stringify(response.data))
                this.setState({
                    jobs:response.data,
                    filteredjobs : response.data,
                    noOfPages: Math.ceil(response.data.length / this.state.itemsPerPage)

                })
                }
            })
            .catch(err => {
                console.log("err"+err);
            });
    }
  
    }
    OnChangeNoOfPages = (e) => {
        this.setState({
            itemsPerPage: e.target.value
        })
        this.setState({
            noOfPages: Math.ceil(this.state.filteredjobs.length / e.target.value)
        })
    }
    handlePageChange = (e,value)=>
    {
        this.setState({
                page:value
        })
    }

    _getUrlParams = async () => {
        this.companyId = undefined;
        let urlParams = utils.getAllUrlParams();

        if ('companyId' in urlParams) {
            this.setState({
                companyID: urlParams.companyId
            })
        }
        if ('userId' in urlParams) {
        localStorage.setItem('UserID',urlParams.userId)
        }
    }

    apiGetCompany = async () => {
        var params = { 'id': this.state.companyID };
        var response = await axios.post(`${C.Server_URL}/k/getCompany`, params);
        console.log(response.data);
        this.setState({ company: response.data });
    }
   
  
    selectRole = (e)=>{
        e.preventDefault();
        console.log("e.target"+e.target.value)
        if(e.target.value=="All"){
            this.setState({
                filteredjobs: this.state.jobs
            });
           }
           else{
            var filteredList = this.state.jobs.filter(job => job.JobTitle === e.target.value);
            console.log("filtered list"+JSON.stringify(filteredList));
                this.setState({
                    filteredjobs: filteredList
                });
            }
    }
    selectLoc = (e)=>{
        e.preventDefault();
        console.log("e.target"+e.target.value)
        if(e.target.value=="All"){
            this.setState({
                filteredjobs: this.state.jobs
            });
           }
           else{
            var filteredList = this.state.jobs.filter(job => job.city === e.target.value);
            console.log("filtered list"+JSON.stringify(filteredList));
                this.setState({
                    filteredjobs: filteredList
                });
            }
    }
    onChange = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        var displayjobs = [];
        let titleOptions;
        let locoptions;
        var jobtitle = [];
        var jobloc = [];
        var today = new Date();
        const oneDay = 24 * 60 * 60 * 1000;
        var banner = null;
        var logo = null;
        var name = null;
        if(this.state && this.state.company){
            banner = this.state.company.banner;
            logo = this.state.company.logo;
            name = this.state.company.name;
            console.log("here we are"+banner+"hi"+logo)
        }
        if (this.state && this.state.jobs) {
            var data = this.state.filteredjobs;
            displayjobs=data.slice((this.state.page - 1) * this.state.itemsPerPage, this.state.page * this.state.itemsPerPage).map((jobsdata, key) => {
                var createdDate = jobsdata.createdAt.split("T")[0];
                var newdate = new Date(createdDate.split("-")[0],createdDate.split("-")[1]-1,createdDate.split("-")[2]);
                 const diffDays = Math.round(Math.abs((today - newdate) / oneDay));
                return (
                    <Col sm={4}>
                        
                        <Jobinfo jobsdata={jobsdata} dateposted={diffDays}/>
                        
                    </Col>
                );
            })
            // displayjobs = data.map(jobsdata => {
            //     var createdDate = jobsdata.createdAt.split("T")[0];
            //     var newdate = new Date(createdDate.split("-")[0],createdDate.split("-")[1]-1,createdDate.split("-")[2]);
            //      const diffDays = Math.round(Math.abs((today - newdate) / oneDay));
            //     return (
            //         <Col sm={4}>
                        
            //             <Jobinfo jobsdata={jobsdata} dateposted={diffDays}/>
                        
            //         </Col>
            //     );
            // });
          
     
        }
       
        if(this.state && this.state.jobs){
            for(var i=0;i<this.state.jobs.length;i++){
                if(jobtitle.indexOf(this.state.jobs[i].JobTitle.toUpperCase())!==-1){
                    console.log("exists");
                }
                else{
                    jobtitle.push(this.state.jobs[i].JobTitle.toUpperCase());
                }
                if(jobloc.indexOf(this.state.jobs[i].city.toUpperCase())!==-1){
                    console.log("exists");
                }
                else{
                    jobloc.push(this.state.jobs[i].city.toUpperCase());
                }
            }
            titleOptions = jobtitle.map(JobTitle => {
                return <option>{JobTitle}</option>;
        });
        locoptions = jobloc.map(JobLoc =>{
            return <option>{JobLoc}</option>;
        })
        }

        return (
            <div>
                <UserNavbar/>
              <CompanyNavbar/>
                 <div className="container">
              
             
              <div className="row align-items-start">
                        <div className="col-sm-12">
                            <h3>Jobs</h3>
                        </div>
                    </div>
                    <div className="row align-items-start pt-4">
                        <div className="col-sm-12">
                            <img class="border" style={{ width: "100%" }} src={banner} alt="banner" />
                        </div>
                    </div>
                    <div className="row align-items-start pt-4">
                        <div className="col-sm-1">
                            <img class="border" style={{ width: "100px" }} src={logo} alt="banner" />
                        </div>
                        <div className="col-sm-11">
                            <p class="fs-1">{name}</p>
                        </div>
                    </div>
                    
                <Row>
                    <Col>
                <label style={{paddingLeft: "1.1rem",paddingBottom: "0.5rem",paddingTop: "1rem"}}>Job Title</label>
                <select class="form-control" variant="outline-secondary"
                                title="orders filter"
                                id="input-group-dropdown-2"
                                onChange={this.selectRole}
                                style={{marginLeft:"1rem",width :"60%"}}>
                                    <option>All</option>
                                        {titleOptions}
                </select>
                </Col>
                <Col>
                <label style={{paddingLeft: "1.1rem",paddingBottom: "0.5rem",paddingTop: "1rem"}}>Job Location</label>
                <select class="form-control" variant="outline-secondary"
                                title="orders filter"
                                id="input-group-dropdown-2"
                                onChange={this.selectLoc}
                                style={{marginLeft:"1rem",width :"60%"}}>
                                    <option>All</option>
                                        {locoptions}
                </select>
                </Col>
                <Col>
                <Box component="span" >
                            <Pagination
                            style={{marginTop:"3rem"}}
                                count={this.state.noOfPages}
                                page={this.state.page}
                                onChange={this.handlePageChange}
                                defaultPage={1}
                                color="primary"
                                size="large"
                                showFirstButton
                                showLastButton
                            />
                 </Box>  
                </Col>
                </Row>
           {displayjobs}
            </div>
            </div>
        )
    }
}
 
export default Jobhome;