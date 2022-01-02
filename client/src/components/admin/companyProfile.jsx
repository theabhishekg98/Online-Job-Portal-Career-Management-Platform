import React, { Component } from 'react';
import {
  Col, Container, Form, Row, Button, Pagination, Image,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CompanyApi } from './apis';
import AdminNavBar from './adminNavBar';

// https://www.indeed.com/companies/search?q=&l=98121
class AdminCompanyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      size: 10,
      totalPage: 1,

      searchedCompanyName: undefined,
    };
  }

  getCompaniesAndCountApi = (companyName, page, size) => {
    // Default use parameters from this.state if not sepcfied.
    const parameters = { companyName, page, size };
    Object.keys(parameters).forEach((key) => parameters[key] === undefined && delete parameters[key]);
    const { companyName: queryCompanyName, page: queryPage, size: querySize } = Object.assign(this.state, parameters);
    CompanyApi.getCompaniesByName(queryCompanyName, queryPage, querySize)
      .then((result) => {
        const { count: companiesCount, companies } = result;
        this.setState({
          searchedCompanyName: queryCompanyName,
          companiesCount,
          totalPage: Math.ceil(companiesCount / querySize) || 1,
          companies,
        });
      });
  }

  componentDidMount() {
    this.getCompaniesAndCountApi();
  }


  showCompany = (company) => {
    const { name, id, description, logoUrl } = company;
    return (
      <Row className="py-1" style={{borderWidth: 1,  'border-bottom-style': 'solid', 'border-color': '#CFD0E2'}}>
        <Col xs={1}><Image src={logoUrl} fluid={true}/></Col>
        <Col xs={{span: 2, offset: 0.1}}><Link to={`/admin/company/${id}/reviews`}>{name}</Link></Col>
        <Col xs={7}><p style={{color: "#666666"}}>{description}</p></Col>
        <Col xs={1}><Link to={`/admin/company/${id}/reviews`}>Reviews</Link></Col>
      </Row>
    );
  }

  searchCompanyByNameHandler = (event) => {
    event.preventDefault();
    this.getCompaniesAndCountApi();
  }

  paginationOnClickHandler = (newPage) => {
    const { status, size, totalPage, searchedCompanyName } = this.state;
    if (newPage < 0) newPage = 0;
    if (newPage >= totalPage) newPage = totalPage - 1;
    CompanyApi.getCompaniesByName(searchedCompanyName, newPage, size)
      .then((companies) => this.setState( { companies }));

    this.setState({
      page: newPage,
    });
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

  render() {
    const { companies = [], companyName, searchedCompanyName } = this.state;
    return(
      <>
        <AdminNavBar />
        <Container>
          <Row className="pt-2">
            <Col>
              <Form.Control
                type="text"
                name="companyName"
                placeholder="Search company by name ..."
                value={companyName}
                onChange={(e) => this.setState({ companyName: e.target.value })}
              /> 
            </Col>
            <Col>
              <Button
                variant="outline-secondary"
                type="submit"
                onClick={this.searchCompanyByNameHandler}
              >
                Search
              </Button>
            </Col>
          </Row>
          <Row className="pt-4">
            <b>{'All companies' + (searchedCompanyName ? `with name ${searchedCompanyName}` :'')}</b>
          </Row>
          <Row className="pt-2">
            {companies.map((company) => this.showCompany(company))}
          </Row>
          <Row>
            {this.showPaginationBar()}
          </Row>
        </Container>
      </>
    );
  }
}

export default AdminCompanyProfile;
