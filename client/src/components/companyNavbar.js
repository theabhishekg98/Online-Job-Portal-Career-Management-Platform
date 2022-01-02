import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Row, Col,Tabs,Tab} from 'react-bootstrap';
import Constants from '../utils/constants';
import Utils from '../utils/utils';
const C = new Constants();
const utils = new Utils();


class companyNavbar extends Component {
  constructor() {
    super();
  }
  componentDidMount = async () => {
    await this._getUrlParams();
  }
  _getUrlParams = async () => {
  //  this.companyId = undefined;
    let urlParams = utils.getAllUrlParams();

    if ('companyId' in urlParams) {
      this.companyId = urlParams.companyId;
      console.log("here we are " + this.companyId);
    }
    if ('userId' in urlParams) {
      this.userId = urlParams.userId;
    }
  }

  render() {
    console.log(`/company/snapshot?companyId=${this.companyId}&userId=${this.userId}`);
    return (
      <div>
        <Row>
          <Col>
            <Navbar style={{ backgroundColor: "white" }}>
              <Nav.Link>
                <Link to={`/company/snapshot?companyId=${this.companyId}&userId=${this.userId}`} class="nav-link" href="#" style={{ color: "black" }}>
                  SnapShot
                </Link>
              </Nav.Link>
              <Nav.Link>
                {/* add the company reviews link */}
                <Link to={`/company/whyJoinUs?companyId=${this.companyId}&userId=${this.userId}`} class="nav-link" href="#" style={{ color: "black" }}>
                  Why Join Us
                </Link>
              </Nav.Link>
              <Nav.Link>
                {/* add the find salaries link */}
                <Link to={`/user/reviews?companyId=${this.companyId}&userId=${this.userId}`} class="nav-link" href="#" style={{ color: "black" }}>
                  Reviews
                </Link>
              </Nav.Link>
              <Nav.Link>
                {/* add the find salaries link */}
                <Link to={`/company/salaries?companyId=${this.companyId}&userId=${this.userId}`} class="nav-link" href="#" style={{ color: "black" }}>
                  Salaries
                </Link>
              </Nav.Link>
              <Nav.Link>
                {/* add the find salaries link */}
                <Link to={`/photos?companyId=${this.companyId}&userId=${this.userId}`} class="nav-link" href="#" style={{ color: "black" }}>
                  Photos
                </Link>
              </Nav.Link>
              <Nav.Link>
                {/* add the find salaries link */}
                <Link to={`/jobhome?companyId=${this.companyId}&userId=${this.userId}`} class="nav-link" href="#" style={{ color: "black" }}>
                  Jobs
                </Link>
              </Nav.Link>
            </Navbar>
          </Col>
        </Row>
      </div>
    );
  }
}

export default companyNavbar;
