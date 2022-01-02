import React, { Component } from 'react';
import {
  Col, Container, Form, Row, Button, ButtonGroup, Pagination, Modal,
} from 'react-bootstrap';
import { ReviewApi } from './apis';
import AdminNavBar from './adminNavBar';

const REVIEW_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};
class ManageReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      size: 10,
      totalPage: 1,

      status: REVIEW_STATUS.PENDING,
    };
  }

  getReviewsAndCountApi = async (status, page, size) => {
    // Default use parameters from this.state if not sepcfied.
    const parameters = { status, page, size };
    Object.keys(parameters).forEach((key) => parameters[key] === undefined && delete parameters[key]);
    const { status: queryStatus, page: queryPage, size: querySize } = Object.assign(this.state, parameters);

    ReviewApi.getReviews(queryStatus, queryPage, querySize)
      .then((result) => {
        const { count: reviewsCount, reviews } = result;
        this.setState({
          reviewsCount,
          totalPage: Math.ceil(reviewsCount / querySize) || 1,
          reviews
        });
    });
  }

  async componentDidMount() {
    this.getReviewsAndCountApi();
  }

  updateReviewStatusHandler = async (reviewId, status) => {
    ReviewApi.updateReviewStatus(reviewId, status)
      .then((response) => {
        const { data: reviewStatusUpdateReuslt } = response;
        this.setState({ reviewStatusUpdateReuslt });
        this.getReviewsAndCountApi();
      })
      .catch((err) => {
        const { message: reviewStatusUpdateReuslt } = err;
        this.setState({ reviewStatusUpdateReuslt });
      });
  };

  showReviewButton = (status, reviewId) => {
    if (status === REVIEW_STATUS.PENDING) {
      return (
        <ButtonGroup>
          <Button
            variant="outline-secondary"
            onClick={() => this.updateReviewStatusHandler(reviewId, REVIEW_STATUS.APPROVED)}
          >
            Approve
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => this.updateReviewStatusHandler(reviewId, REVIEW_STATUS.REJECTED)}
          >
            Reject
          </Button>
        </ButtonGroup>
      );
    } else if (status === REVIEW_STATUS.APPROVED) {
      return (
        <ButtonGroup>
          <Button
            variant="outline-secondary"
            onClick={() => this.updateReviewStatusHandler(reviewId, REVIEW_STATUS.REJECTED)}
          >
            Reject
          </Button>
        </ButtonGroup>
      );
    } else if (status === REVIEW_STATUS.REJECTED) {
      return (
        <ButtonGroup>
          <Button
            variant="outline-secondary"
            onClick={() => this.updateReviewStatusHandler(reviewId, REVIEW_STATUS.APPROVED)}
          >
            Approve
          </Button>
        </ButtonGroup>
      );
    } else
      return (<></>);
  }

  showReview = (review) => {
    const {
      _id: reviewId, fullReview: text, updatedAt, rate, status,
      userName = 'N/A', companyName = 'N/A',
    } = review;
    const reviewOrigin = `Maded by ${userName} - ${updatedAt.toLocaleString()}`;
    return(
      <Row className="py-2 border">
        <Col sm={1}>
          {rate ? rate.toFixed(1) : 'N/A'}
        </Col>
        <Col sm={11}>
          <Row>
            <h4>{companyName}</h4>
            <small>{reviewOrigin}</small>
          </Row>
          <Row className="pt-3">
            <p>{text}</p>
          </Row>
          <Row className="pt-3">
            <p>Status: {status}</p>
          </Row>
          {this.showReviewButton(status, reviewId)}
        </Col>
      </Row>
    );
  }

  paginationOnClickHandler = (newPage) => {
    const { status, size, totalPage } = this.state;
    if (newPage < 0) newPage = 0;
    if (newPage >= totalPage) newPage = totalPage - 1;
    this.getReviewsAndCountApi(status, newPage, size);
  }

  showPaginationBar = () => {
    const { page, totalPage } = this.state;
    return (
      <Pagination>
        <Pagination.Item onClick={() => this.paginationOnClickHandler(0)}>
          1
        </Pagination.Item>
        <Pagination.Prev onClick={() => this.paginationOnClickHandler(page-1)}/>
        <Pagination.Item active onClick={() => this.paginationOnClickHandler(page)}>
          {page + 1}
        </Pagination.Item>
        <Pagination.Next onClick={() => this.paginationOnClickHandler(page+1)}/>
        <Pagination.Item onClick={() => this.paginationOnClickHandler(totalPage-1)}>
          {totalPage}
        </Pagination.Item>
      </Pagination>
    )
  }

  reviewStatusSelectOnChangeHandler = (event) => {
    event.preventDefault();
    const { target: { value: status } } = event;

    // Reset page to 0
    this.setState({
      status,
      page: 0,
    });
    this.getReviewsAndCountApi(status, 0);
  }

  render() {
    const { reviews = [], status, reviewStatusUpdateReuslt } = this.state;
    return(
      <>
        <AdminNavBar />
        <Container>
          <Modal
            show={reviewStatusUpdateReuslt}
            onHide={() => { this.setState({ reviewStatusUpdateReuslt: undefined }) }}
          >
          <Modal.Header closeButton>
              <Modal.Title>Approval Status Update</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {reviewStatusUpdateReuslt}
            </Modal.Body>
          </Modal>
          <Row>
            <h2>Approval Status</h2>
            <Form.Select name="status" value={status} onChange={this.reviewStatusSelectOnChangeHandler}>
              {
                Object.values(REVIEW_STATUS).map((sts) => (
                  <option value={sts} key={sts}>{sts}</option>
                ))
              }
            </Form.Select>
          </Row>
          <Row className="pt-4">
            <h2>Reviews</h2>
            {reviews.map((review) => this.showReview(review))}
          </Row>
          <Row>
            {this.showPaginationBar()}
          </Row>
        </Container>
      </>
    );
  }
}

export default ManageReviews;