import React, { Component } from "react";
import { Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Constants from '../../utils/constants';
import Utils from '../../utils/utils';
const C = new Constants();
const utils = new Utils();

class Jobinfo extends React.Component {
  constructor(props){
    super(props)
    this._getUrlParams();
  }
  _getUrlParams = async () => {
    this.userId = undefined;
    let urlParams = utils.getAllUrlParams();

    if ('userId' in urlParams) {
        this.userId = urlParams.userId;
    }
}

  Onclicked=(e)=>{
    this.setState({
      clickedid :e.target.id
    })
  }
    render() { 
      var jobsdata = this.props.jobsdata;
        console.log("jobsdata"+JSON.stringify(this.props));
        return (
                        <Card bg="white" style={{ width: "30rem", margin: "5%" }}>
            <Card.Body>
            {/* <Link to={{pathname: `/jobs?userId=${this.userId}&companyId=${this.props.jobsdata.companyId}&jobId=${this.props.jobsdata.id}`, state: jobsdata}}>  */}
            <a href={`${C.HOST_URL}/jobs?userId=${this.userId}&companyId=${this.props.jobsdata.companyId}&jobId=${this.props.jobsdata.id}`}>{this.props.jobsdata.JobTitle}</a>

              {/* <Card.Title>{this.props.jobsdata.JobTitle}</Card.Title> */}
              <p>{this.props.jobsdata.city}, {this.props.jobsdata.state}</p>
              <label><b>No of days job has been posted:</b> {this.props.dateposted} </label>
            </Card.Body>

          </Card>
         
        );
    }
}
 
export default Jobinfo;