import React, { Component } from "react";
import { Link } from "react-router-dom";
import indeedlogo from "../images/Indeed_logo.png";
import { Navbar, Nav,Button,Row,Col } from 'react-bootstrap';


class UnknownNavBar extends Component {
  constructor() {
    super();
  }

  render() {
    return (
        <div className="shadow-sm  bg-body rounded">
            <Row>
       <Col>
          <Navbar style={{backgroundColor:"white"}} >
            <Navbar.Brand>
              <Link to='/' class="nav-link" href="#">
                <img src={indeedlogo} width="100" height="auto" class="d-inline-block align-top"/>
              </Link>
            </Navbar.Brand>
           
          </Navbar>
          </Col>
          <Col>
          <Nav.Link>
                {/* add the find logout link */}
                  {/* <Link to="/" class="nav-link" href="#" style={{color:"black",paddingLeft:"38rem"}}>
                Logout
                  </Link> */}
            </Nav.Link>
            </Col>
    </Row>
        </div>
      );
  }
}

export default UnknownNavBar;
