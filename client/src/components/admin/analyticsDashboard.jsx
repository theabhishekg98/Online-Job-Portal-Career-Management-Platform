import React from 'react';
import { Row, Col, Container, Table, Form, Button } from 'react-bootstrap';
import {
  LineChart, Line, YAxis, XAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar,
} from 'recharts';
import { AnalyticsApi } from './apis';
import AdminNavBar from './adminNavBar';

function toFixedNumber(n) {
  return Number.isNaN(Number(n)) ? 'N/A' : n.toFixed(2);
}

class AdminAnalyticsDashboard extends React.Component {
  constructor(props) {
    super(props);

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();

    this.state = {
      reviewsPerDay: [
        // placeholder
        { name: '11/10', value: 0 }, 
      ],
      topReviwedCompanies: [
        // Placeholder
        { name: 'Company1', value: 7777 },
      ],
      topAverageRatingCompanies: [
        // Placeholder
        { name: 'Company5', value: 4.78 },
      ],
      topAccptedReviewJobSeekers: [
        // Placeholder
        { name: 'John', value: 3212 },
      ],
      topRatingCEOs: [
        // Placeholder
        { name: 'John', value: 4.9 },
      ],
      topViewedCompanyPerDay : [
        // Placeholder
        { name: 'Comapny1', value: 1 },
      ],
      topViewedCompanyTotal: [
        // Placeholder
        { name: 'Comapny1', value: 9999 },
      ],
      year: today.getFullYear(),
      newYear: today.getFullYear(),
      month: today.getMonth() + 1,
      newMonth: today.getMonth() + 1,
      date: today.getDate(),
      newDate: today.getDate(),
    };
  }

  componentDidMount() {
    AnalyticsApi.getDailyReviewCounts()
      .then((reviewsPerDay) => this.setState({ reviewsPerDay }));

    AnalyticsApi.getTop5ReviwedCompanies()
      .then((topReviwedCompanies) => this.setState({ topReviwedCompanies }));

    AnalyticsApi.getTop5AvergeRatingCompanies()
      .then((topAverageRatingCompanies) => this.setState({ topAverageRatingCompanies }));

    AnalyticsApi.getTop5JobSeekersOnApprovedReviws()
      .then((topAccptedReviewJobSeekers) => this.setState({ topAccptedReviewJobSeekers }));

    AnalyticsApi.getTop10MostViewedCompanies()
      .then((topViewedCompanyTotal) => this.setState({ topViewedCompanyTotal }));

    const { year, date, month } = this.state;
    AnalyticsApi.getTop10MostViewedCompaniesPerDay(year, month, date)
      .then((topViewedCompanyPerDay) => this.setState( { topViewedCompanyPerDay }));

    AnalyticsApi.getTopRatingCEOs()
      .then((topRatingCEOs) => this.setState({ topRatingCEOs }));
  }

  lineChart = (data, color='#0095FF') => {
    return (
      <Row>
        <LineChart width={800} height={300} data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke={color} />
        </LineChart>
      </Row>
    )
  }

  barChart = (data, color='#8884d8', width=800, height=300) => {
    return (
      <Row>
        <Col>
          <BarChart width={width} height={height} data={data}>
            <XAxis dataKey="name" interval="preserveStart" />
            <YAxis type="number" domain={[0, 5]} />
            <Bar dataKey="value" barSize={30} fill={color} />
          </BarChart>
        </Col>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {data.map((datapoint) => (
                <tr>
                  <td>{datapoint.name}</td>
                  <td>{datapoint.value}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    )
  }

  barChartTopRating = (data, color='#82ca9d') => {
    const ratings = data.map((o) => o.value).sort();
    const low = Number.isInteger(ratings[0]) ? ratings[0] - 1 : Math.floor(ratings[0]);
    const high = 5;  // Math.ceil(ratings[ratings.length-1]);
    const domain = [low, high];
    return (
      <Row>
        <Col>
          <BarChart width={800} height={300} data={data}>
            <XAxis dataKey="name" interval={0} />
            <YAxis type="number" domain={domain} />
            <Bar dataKey="value" barSize={30} fill={color} />
          </BarChart>
        </Col>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {data.map((datapoint) => (
                <tr>
                  <td>{datapoint.name}</td>
                  <td>{toFixedNumber(datapoint.value)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    )
  }

  queryTopViewedCompanyPerDay = (e) => {
    e.preventDefault();

    const { newYear, newMonth, newDate } = this.state;
    AnalyticsApi.getTop10MostViewedCompaniesPerDay(newYear, newMonth, newDate)
      .then((topViewedCompanyPerDay) => this.setState( {
        topViewedCompanyPerDay,
        year: newYear,
        month: newMonth,
        date: newDate,
      }));
  }

  render() {
    const {
      reviewsPerDay,
      topReviwedCompanies,
      topAverageRatingCompanies,
      topAccptedReviewJobSeekers,
      topRatingCEOs,
      topViewedCompanyTotal,
      topViewedCompanyPerDay,
      year, month, date,
      newYear, newMonth, newDate,
    } = this.state;
    return (
      <>
        <AdminNavBar />
        <Container>
          <h2>The number of reviews per day</h2>
          {this.lineChart(reviewsPerDay)}

          <h2>Top 5 Reviewed Companyies</h2>
          {this.barChart(topReviwedCompanies)}

          <h2>Top 5 companies based on average rating</h2>
          {this.barChartTopRating(topAverageRatingCompanies)}

          <h2>Top 5 job seekers based on total accepted reviews made</h2>
          {this.barChart(topAccptedReviewJobSeekers, '#FFA9A9')}

          <h2>Top 5 CEOs based on rating</h2>
          {this.barChartTopRating(topRatingCEOs, '#985543')}

          <h2>Top 10 companies based on views per day ({`${year}/${month}/${date}`})</h2>
          <Row className="pb-3">
            <Col>
              Year
              <Form.Control
                type="number"
                placeholder="year"
                value={newYear}
                min="1900"
                max="2300"
                onChange={(e) => this.setState({ newYear: e.target.value })}
              />
            </Col>
            <Col>
              Month
              <Form.Control
                type="number"
                placeholder="month"
                min="1"
                max="12"
                value={newMonth}
                onChange={(e) => this.setState({ newMonth: e.target.value })}
              />
            </Col>
            <Col>
              Date
              <Form.Control
                type="number"
                placeholder="date"
                min="1"
                max="31"
                value={newDate}
                onChange={(e) => this.setState({ newDate: e.target.value })}
              />
            </Col>
            <Col>
              <Button
                  variant="outline-secondary"
                  type="submit"
                  onClick={this.queryTopViewedCompanyPerDay}
                >
                  Query
                </Button>
            </Col>
          </Row>
          {this.barChart(topViewedCompanyPerDay, '#207788')}

          <h2>Top 10 companies based on total views</h2>
          {this.barChart(topViewedCompanyTotal, '#957788')}
        </Container>
      </>
    )
  };
}

export default AdminAnalyticsDashboard;