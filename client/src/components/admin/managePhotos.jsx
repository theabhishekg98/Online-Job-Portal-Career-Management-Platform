import React, { Component } from 'react';
import {
  Col, Container, Form, Row, Button, ButtonGroup,
  Pagination, Modal, Image,
} from 'react-bootstrap';
import { PhotoApi } from './apis';
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

  getPhotosAndCountApi = async (status, page, size) => {
    // Default use parameters from this.state if not sepcfied.
    const parameters = { status, page, size };
    Object.keys(parameters).forEach((key) => parameters[key] === undefined && delete parameters[key]);
    const { status: queryStatus, page: queryPage, size: querySize } = Object.assign(this.state, parameters);

    PhotoApi.getPhotos(queryStatus, queryPage, querySize)
      .then((result) => {
        const { count: photosCount, photos } = result;
        this.setState({
          photosCount,
          totalPage: Math.ceil(photosCount / querySize) || 1,
          photos,
        });
      });
  }

  async componentDidMount() {
    this.getPhotosAndCountApi();
  }

  updatePhotoStatusHandler = async (photoId, status) => {
    PhotoApi.updatePhotoStatus(photoId, status)
      .then((response) => {
        const { data: photoStatusUpdateReuslt } = response;
        this.setState({ photoStatusUpdateReuslt });
        this.getPhotosAndCountApi();
      })
      .catch((err) => {
        const { message: photoStatusUpdateReuslt } = err;
        this.setState({ photoStatusUpdateReuslt });
      });
  };

  showReviewButton = (status, photoId) => {
    if (status === REVIEW_STATUS.PENDING) {
      return (
        <ButtonGroup>
          <Button
            variant="outline-secondary"
            onClick={() => this.updatePhotoStatusHandler(photoId, REVIEW_STATUS.APPROVED)}
          >
            Approve
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => this.updatePhotoStatusHandler(photoId, REVIEW_STATUS.REJECTED)}
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
            onClick={() => this.updatePhotoStatusHandler(photoId, REVIEW_STATUS.REJECTED)}
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
            onClick={() => this.updatePhotoStatusHandler(photoId, REVIEW_STATUS.APPROVED)}
          >
            Approve
          </Button>
        </ButtonGroup>
      );
    } else
      return (<></>);
  }

  showPhoto = (photo) => {
    const {
      _id: photoId, url, createdAt, status,
    } = photo;
    return(
      <Row className="py-2 border">
        <Col xs={6}>
          <Image src={url} fluid={true} />
        </Col>
        <Col xs={3}>
          <Row><p>Created at {createdAt.toLocaleString()}</p></Row>
          <Row><p>Status: {status}</p></Row>
          {this.showReviewButton(status, photoId)}
        </Col>
      </Row>
    );
  }

  paginationOnClickHandler = (newPage) => {
    const { status, size, totalPage } = this.state;
    if (newPage < 0) newPage = 0;
    if (newPage >= totalPage) newPage = totalPage - 1;
    this.getPhotosAndCountApi(status, newPage, size);
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

  photoStatusSelectOnChangeHandler = (event) => {
    event.preventDefault();
    const { target: { value: status } } = event;

    // Reset page to 0
    this.setState({
      status,
      page: 0,
    });
    this.getPhotosAndCountApi(status, 0);
  }

  render() {
    const { photos = [], status, photoStatusUpdateReuslt } = this.state;
    return(
      <>
        <AdminNavBar />
        <Container>
          <Modal
            show={photoStatusUpdateReuslt}
            onHide={() => { this.setState({ photoStatusUpdateReuslt: undefined }) }}
          >
          <Modal.Header closeButton>
              <Modal.Title>Photo Update</Modal.Title> 
            </Modal.Header>
            <Modal.Body>
              {photoStatusUpdateReuslt}
            </Modal.Body>
          </Modal>
          <Row>
            <h2>Approval Status Update</h2>
            <Form.Select name="status" value={status} onChange={this.photoStatusSelectOnChangeHandler}>
              {
                Object.values(REVIEW_STATUS).map((sts) => (
                  <option value={sts} key={sts}>{sts}</option>
                ))
              }
            </Form.Select>
          </Row>
          <Row className="pt-4">
            <h2>Photos</h2>
            {photos.map((review) => this.showPhoto(review))}
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