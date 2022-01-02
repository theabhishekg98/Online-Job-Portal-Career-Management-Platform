import React, { Component } from "react";
import { Link } from "react-router-dom";
import indeedlogo from "./images/Indeed_logo.png";
import { Navbar, Nav,Button,Row,Col } from 'react-bootstrap';
import Utils from '../utils/utils';
const utils = new Utils();


class userNavbar extends Component {
  constructor() {
    super();
    this.userDetailsFromStorage=JSON.parse(sessionStorage.getItem('authenticateDetails'))
    // this._getUrlParams();
  }

  // _getUrlParams = async () => {
  //   this.userId = undefined;
  //   let urlParams = utils.getAllUrlParams();

  //   if ('userId' in urlParams) {
  //     this.userId = urlParams.userId;
  //   }
  // }
  colorChange=(e)=>{
    console.log("e.target.name")
    console.log(e.target.name)

  }

  render() {
    var color = "black";

    return (
        <div>
            <Row>
       {/* <Col> */}
          <Navbar style={{backgroundColor:"white"}}>
            <Navbar.Brand>
              <Link to={`/findJobs?userId=${this.userDetailsFromStorage.userId}`} class="nav-link" href="#">
                <img src={indeedlogo} width="100" height="auto" class="d-inline-block align-top"/>
              </Link>
            </Navbar.Brand>
            <Nav.Link style={{width:"10rem"}}>
                <Link name ="FindJobs" to={`/findJobs?userId=${this.userDetailsFromStorage.userId}`} class="nav-link" href="#" style={{color:"black"}} onClick={(e)=>this.colorChange(e)}>
                  Find Jobs
                  </Link>
            </Nav.Link>
            <Nav.Link>
                {/* add the company reviews link */}
                  <Link to="/company/reviewsTab" class="nav-link" href="#" style={{color:"black"}}>
                  Company Reviews
                  </Link>
            </Nav.Link>
            <Nav.Link>
                {/* add the find salaries link */}
                  <Link to="/findSalaries" class="nav-link" href="#" style={{color:"black"}}>
                  Find Salaries
                  </Link>
            </Nav.Link>
              <Nav.Link>
                {/* add the find salaries link */}
                <Link to={`/user/messages?userId=${this.userDetailsFromStorage.userId}`} class="nav-link" style={{ color: "black" }}>
                  Messages
                </Link>
              </Nav.Link>
              <Nav.Link>
                {/* add the find salaries link */}
                <Link to={`/user/profile/${this.userDetailsFromStorage.userId}`} class="nav-link" href="#" style={{ color: "black" }}>
                  Profile
                </Link>
              </Nav.Link>
          <Nav.Link>
                {/* add the find logout link */}
                  <Link to="/logout" class="nav-link" href="#" style={{color:"black",paddingLeft:"27rem"}}>
                Logout
                  </Link>
            </Nav.Link>
          </Navbar>
          {/* </Col> */}
         
    </Row>
        </div>
      );
  }
}

export default userNavbar;
