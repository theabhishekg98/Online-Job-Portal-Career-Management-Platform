import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {
  Col, Row,
} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import indeedlogo from "../images/Indeed_logo.png";

class AdminNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <Row>
        <Col >
          <Navbar style={{backgroundColor:"white"}}>
            <Nav className="me-auto">
              <Navbar.Brand>
                <Link to='#' class="nav-link" href="#">
                  <img src={indeedlogo} width="100" height="auto" class="d-inline-block align-top"/>
                </Link>
              </Navbar.Brand>
              <Nav.Link>
                <Link to="/admin/manage/reviews" class="nav-link" href="#" style={{color:"black"}}>Manage Reviews</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/admin/manage/photos" class="nav-link" href="#" style={{color:"black"}}>Manage Photos</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/admin/company/profile" class="nav-link" href="#" style={{color:"black"}}>View Companies</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/admin/analytics" class="nav-link" href="#" style={{color:"black"}}>Show Analytics</Link>
              </Nav.Link>
            </Nav>
          </Navbar>
        </Col>
        <Col>
          <Nav.Link>
            <Link to="/logout" class="nav-link" href="#" style={{color:"black",paddingLeft:"38rem"}}>Logout</Link>
          </Nav.Link>
        </Col>
      </Row>
    );
  }
}

export default AdminNavBar;
