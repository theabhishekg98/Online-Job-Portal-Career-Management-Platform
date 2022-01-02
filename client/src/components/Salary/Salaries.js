import React, { Component } from 'react';
import axios from 'axios';
import serverroute from '../../webconfig';
import CompanyNavbar from "../companyNavbar";
import UserNavbar from '../userNavbar';
import { Col, Row, FormControl, Button, Modal, Form, Table } from 'react-bootstrap';
import Constants from '../../utils/constants';
import Utils from '../../utils/utils';
const C = new Constants();
const utils = new Utils();


class Salaries extends React.Component {
  constructor(props) {
    super(props);
    this.setState({
      showModal: false
    });

    this.openModal = this.openModal.bind(this);
    this.onClose = this.onClose.bind(this);

  }
  componentDidMount = async () => {
    await this._getUrlParams();
    this.apiGetCompany();
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
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log("entered here only" + this.state.companyname)
  }
  openModal = () => {
    this.setState({
      showModal: true
    });
  };
  onClose = (e) => {
    this.setState({
      showModal: false,
    });
  }
  submitform = (e) => {
    var data = {
      company_name: this.state.companyname,
      currently_working: this.state.currentlyworking,
      job_title: this.state.jobtitle,
      salary: this.state.payatcurrent,
      locationId: this.state.joblocation,
      experience: this.state.workex,
      benifits: this.state.benefit,
      otherbenefits: this.state.otherbenefits,
      enddate: this.state.enddate
    }
    axios.post(`${serverroute}/an/salary`, data)
      .then(response => {
        console.log("hii" + response.data);
        alert("Form submitted");
        this.onClose();
      })
      .catch(err => {
        console.log("Error" + err);
      });

  }

  render() {
    let showModal = false;
    let showtext = false;
    let showdate = false;
    let companyname = "";
    var banner = null;
    var logo = null;
        var name = null;
        if(this.state && this.state.company){
            banner = this.state.company.banner;
            logo = this.state.company.logo;
            name = this.state.company.name;
            console.log("here we are"+banner+"hi"+logo)
        }
    if (this.state) {
      showModal = this.state.showModal;
    }
    if (this.state && this.state.benefit6) {
      showtext = true;
    }
    if (this.state && this.state.currentlyworking == "No") {
      showdate = true;
    }
    if (this.state && this.state.companyname) {
      companyname = this.state.companyname;
    }
    return (
      <div>
        <UserNavbar />
        <CompanyNavbar />
        <div className="container">
        <div className="row align-items-start">
                        <div className="col-sm-12">
                            <h3>Salaries</h3>
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

        <Button onClick={this.openModal} style={{marginTop:"2rem"}}>Salary</Button>

        <Modal show={showModal} onHide={this.onClose} centered>
          <Modal.Header>
            <center>
              <Modal.Title>Salary Information</Modal.Title>
            </center>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.submitform}>
              <label>What’s your company name?</label><br></br>
              <input name="companyname" type="text" onChange={this.onChange} style={{ width: "95%" }} required></input><br></br>
              <label>Are you currently working at this company?</label><br></br>
              <select name="currentlyworking" onChange={this.onChange} required>
                <option>None</option>
                <option>Yes</option>
                <option>No</option></select><br></br>

              {showdate &&
                <React.Fragment>
                  <label>End Date</label><br></br>
                  <input type="date" name="enddate" onChange={this.onChange}>
                  </input>
                  <br></br>
                </React.Fragment>}

              <label>What’s your job title?</label><br></br>
              <input name="jobtitle" type="text" onChange={this.onChange} style={{ width: "95%" }} required></input><br></br>
              <label>Where’s your job location?</label><br></br>
              <input name="joblocation" type="text" onChange={this.onChange} style={{ width: "95%" }}></input><br></br>
              <label>What’s your pay at {companyname}?</label><br></br>
              <input name="payatcurrent" type="number" onChange={this.onChange} style={{ width: "95%" }}></input><br></br>
              <label>How many years of relevant experience do you have?</label><br></br>
              <input name="workex" type="number" onChange={this.onChange} style={{ width: "95%" }} required></input><br></br>
              <label>Which benefits do you receive at {companyname}</label><br></br>
              <label>
                <input type="checkbox" name="benefit" onChange={this.onChange} style={{ marginRight: "0.5rem" }}></input>
                Paid time off
              </label><br></br>
              <label>
                <input type="checkbox" name="benefit" onChange={this.onChange} style={{ marginRight: "0.5rem" }}></input>
                Health insurance
              </label><br></br>
              <label>
                <input type="checkbox" name="benefit" onChange={this.onChange} style={{ marginRight: "0.5rem" }}></input>
                Life insurance
              </label><br></br>
              <label>
                <input type="checkbox" name="benefit" onChange={this.onChange} style={{ marginRight: "0.5rem" }}></input>
                Dental/ vision insurance
              </label><br></br>
              <label>
                <input type="checkbox" name="benefit" onChange={this.onChange} style={{ marginRight: "0.5rem" }}></input>
                Retirement/ 401(k) Other benefits
              </label><br></br>
              <label>
                <input type="checkbox" name="benefit6" onChange={this.onChange} style={{ marginRight: "0.5rem" }}></input>
                Other benefits
              </label><br></br>
              {showtext &&
                <label>Mention other benefits <br></br>
                  <textarea name="otherbenefits" onChange={this.onChange} style={{ width: "28rem", height: "5rem" }}></textarea>
                </label>}
                <div style={{marginTop:"3rem"}}>
                  <center>
              <Button variant="primary" type="submit" style={{marginRight:"2rem"}}>Save</Button>
              <Button variant="secondary" onClick={this.onClose}>Close</Button>
              </center>
              </div>
            </form>
          </Modal.Body>
        </Modal>
        </div>
      </div>

    )
  }
}

export default Salaries;