import React, { Component } from 'react';
import {
  Col, Container, Table, Row, Button, Pagination, Image,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CompanyApi, ReviewApi } from './apis';
import { withRouter } from 'react-router';
import AdminNavBar from './adminNavBar';

const ORDERED_APPLICATION_STATUS = [
  'submitted', 'reviewed', 'initial screening', 'interviewing', 'hired', 'rejected',
];


class AdminCompanyReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO: Pagination
      page: 0,
      size: 100000,
      totalPage: 1,
    };
  }

  componentDidMount() {
    const { match: { params: { companyId } } } = this.props;
    const { page, size } = this.state;
    ReviewApi.getClosedReviewsByCompanyId(companyId, page, size)
      .then((result) => {
        const { count: reviewCount, companyName, reviews } = result;
        this.setState( { reviewCount, companyName, reviews } );
      });

    CompanyApi.getApplicationAnalysticsByCompanyId(companyId)
      .then((result) => {
        this.setState({ applicationAnalystics: result });
      });
  }

  showReview = (review) => {
    const {
      review: text, updatedAt, rate, status,
      userName = 'N/A',
    } = review;
    const reviewOrigin = `Maded by ${userName} - ${updatedAt.toLocaleString()}`;
    return(
      <Row className="py-2 border">
        <Col sm={1}>
          {rate ? rate.toFixed(1) : 'N/A'}
        </Col>
        <Col sm={11}>
          <Row>
            <small>{reviewOrigin}</small>
          </Row>
          <Row className="pt-3">
            <p>{text}</p>
          </Row>
          <Row className="pt-3">
            <p>Status: {status}</p>
          </Row>
        </Col>
      </Row>
    );
  }

  render() {
    const { applicationAnalystics = {}, companyName, reviews = [] } = this.state;
    return(
      <>
        <AdminNavBar />
        <Container>
          <Row><h1>{companyName}</h1></Row>
          <Row>
            <Col xs={{span: 6, offset: 1}}>
              <Row><h2>Application Analytics</h2></Row>
              <Row>
                <Table>
                <thead>
                    <tr>
                      <th>Status</th>
                      <th>Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ORDERED_APPLICATION_STATUS.map((key) =>(
                      <tr>
                        <td>{key}</td>
                        <td>{applicationAnalystics[key] || 0}</td>
                      </tr>
                    ))
                    }
                  </tbody>
                </Table>
              </Row>
            </Col>
            <Col xs={{span: 9, offset: 1}}>
              <Row className="pt-3"><h2>Reviews for {companyName}</h2></Row>
              {reviews.length ? 
                reviews.map((review) => this.showReview(review)) : 'No reviews yet'
              } 
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default withRouter(AdminCompanyReviews);