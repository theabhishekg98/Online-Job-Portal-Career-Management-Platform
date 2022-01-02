import axios from 'axios';
import serverroute from '../../webconfig';

export class ReviewApi {
  static async getReviews(status, page=0, size=10) {
    const params = { status, page, size };
    const { data } = await axios.get(`${serverroute}/evelyn/reviews/get`, { params });
    return data;
  }

  static async updateReviewStatus(reviewId, status) {
    const data = { reviewId, status };
    return axios.post(`${serverroute}/evelyn/review/status/update`, data);
  }

  static async getClosedReviewsByCompanyId(companyId, page, size) {
    const params = { page, size };
    const { data } = await axios.get(`${serverroute}/evelyn/company/${companyId}/reviews/closed/get`, { params });
    return data;
  }
}

export class CompanyApi {
  static async getCompaniesByName(companyName, page=0, size=10) {
    const params = { companyName, page, size };
    const { data } = await axios.get(`${serverroute}/evelyn/companies/get/by/name`, { params });
    return data;
  }

  static async getApplicationAnalysticsByCompanyId(companyId) {
    const { data } = await axios.get(`${serverroute}/evelyn/company/${companyId}/application/status/analytics`);
    return data;
  }
}

export class PhotoApi {
  static async getPhotos(status, page=0, size=10) {
    const params = { status, page, size };
    const { data } = await axios.get(`${serverroute}/evelyn/photos/get`, { params });
    return data;
  }

  static async updatePhotoStatus(photoId, status) {
    const data = { photoId, status };
    return axios.post(`${serverroute}/evelyn/photo/status/update`, data);
  }
}

export class AnalyticsApi {
  static async getDailyReviewCounts() {
    const { data } = await axios.get(`${serverroute}/evelyn/analytics/daily/reviews/count`);
    const transformed = data.map((item) => ({ name: item._id, value: item.count }));
    return transformed;
  }

  static async getTop5ReviwedCompanies() {
    const { data } = await axios.get(`${serverroute}/evelyn/analytics/top/reviewed/companies`);
    const transformed = data.map((item) => ({name: item.name || 'N/A', value: item.count}));
    return transformed;
  }

  static async getTop5AvergeRatingCompanies() {
    const { data } = await axios.get(`${serverroute}/evelyn/analytics/top/rating/companies`);
    const transformed = data.map((item) => ({name: item.name || 'N/A', value: item.averageRate}));
    return transformed;
  }

  static async getTop5JobSeekersOnApprovedReviws() {
    const { data } = await axios.get(`${serverroute}/evelyn/analytics/top/jobseekers/on/approved/review`);
    const transformed = data.map((item) => ({name: item.name || 'N/A', value: item.count}));
    return transformed;
  }

  static async getTop10MostViewedCompanies() {
    const { data } = await axios.get(`${serverroute}/evelyn/analytics/most/viewed/companies`);
    const transformed = data.map((item) => ({name: item.companyName || 'N/A', value: item.totalViews}));
    return transformed;
  }

  static async getTop10MostViewedCompaniesPerDay(year, month, date) {
    const params = { year, month, date };
    const { data } = await axios.get(`${serverroute}/evelyn/analytics/most/viewed/companies/per/day`, { params });
    const transformed = data.map((item) => ({name: item.companyName || 'N/A', value: item.dailyViews}));
    return transformed;
  }

  static async getTopRatingCEOs() {
    const { data } = await axios.get(`${serverroute}/evelyn/analytics/top/rating/ceos`);
    const transformed = data.map((item) => ({name: item.ceo || 'N/A', value: item.averageRate}));
    return transformed;
  }
}