const reviewApiClass = require('./api/reviewApi');
const companyApiClass = require('./api/companyApi');
const companyViewApiClass = require('./api/companyViews');
const userApiClass = require('./api/userApi');
const ceoRatingApiClass = require('./api/ceoRatingApi');

const reviewApi = new reviewApiClass();
const companyApi = new companyApiClass();
const companyViewsApi = new companyViewApiClass();
const userApi = new userApiClass();
const ceoRatingApi = new ceoRatingApiClass();

async function getDailyReviewCount(payload, callback) {
  try {
    const result = await reviewApi.getDailyReviewsWithinPastNDays();
    callback(null, JSON.stringify(result));
  } catch (err) {
    console.error(err);
    callback(err, null);
  }
}

async function getTopReviewedCompanies(payload, callback) {
  try {
    const topReviewedCompaniesIdAndCount = await reviewApi.getTopReviewedCompanysId();
    const companyIds = topReviewedCompaniesIdAndCount.map((item) => item._id);
    const companyNamesAndIds = await companyApi.getCompanyNamesByIds(companyIds);
    const mappings = companyNamesAndIds.reduce((obj, item) => Object.assign(obj, { [item.id]: item.name }), {});
    const hydratedTopReviewedCompaniesIdAndCount = topReviewedCompaniesIdAndCount.map((item) => {
      item.name = mappings[item._id];
      return item;
    });
    callback(null, JSON.stringify(hydratedTopReviewedCompaniesIdAndCount));
  } catch (err) {
    console.log(err);
    callback(err, null);
  }
}

async function getTopRatingCompanies(payload, callback) {
  try {
    const topRatedCompaniesIdAndCount = await reviewApi.getTopCompaniesIdOnAverageRates();
    const companyIds = topRatedCompaniesIdAndCount.map((item) => item._id);
    const companyNamesAndIds = await companyApi.getCompanyNamesByIds(companyIds);
    const mappings = companyNamesAndIds.reduce((obj, item) => Object.assign(obj, { [item.id]: item.name }), {});
    const hydratedTopRatedCompaniesIdAndCount = topRatedCompaniesIdAndCount.map((item) => {
      item.name = mappings[item._id];
      return item;
    });
    callback(null, JSON.stringify(hydratedTopRatedCompaniesIdAndCount));
  } catch (err) {
    console.error(err);
    callback(err, null);
  }
}

async function getTopJobseekersOnApprovedReviews(payload, callback) {
  try {
    const jobSeekerIdsAndCount = await reviewApi.getTopJobSeekersIdOnTotalApprovedReviews();
    const userIds = jobSeekerIdsAndCount.map((item) => item._id);
    const userNameAndIds = await userApi.getUserNames(userIds);
    const mappings = userNameAndIds.reduce(
      (obj, item) => Object.assign(obj, { [item.id]: `${item.firstName} ${item.lastName}` }),
      {})
    ;
    const hydratedjobSeekerIdsAndCount = jobSeekerIdsAndCount.map((item) => {
      item.name = mappings[item._id];
      return item;
    });
    callback(null, JSON.stringify(hydratedjobSeekerIdsAndCount));
  } catch (err) {
    console.error(err);
    callback(err, null);
  }
}

async function countOneViewToCompany(payload) {
  console.log('=== countOneViewToCompany ===');
  const { id } = payload;
  try {
    const { id: companyId, name: companyName } = await companyApi.getCompanyById(id);
    console.log({ companyId, companyName });
    const result = await companyViewsApi.countOneViewToCompany(companyId, companyName);
    console.log({ result }); 
  } catch (err) {
    console.error(err);
  }
}

async function getMostViewedCompanies(payload, callback) {
  try {
    const companies = await companyViewsApi.getMostViewedCompanies();
    callback(null, JSON.stringify(companies));
  } catch (err) {
    console.error(err);
    callback(err, null);
  }
}

async function getMostViewedCompaniesPerDay(payload, callback) {
  try {
    const { year, month, date } = payload;
    const companies = await companyViewsApi.getMostViewedCompaniesPerDay(year, month, date);
    callback(null, JSON.stringify(companies));
  } catch (err) {
    console.error(err);
    callback(err, null);
  }
}

async function getTopRatingCEOs(payload, callback) {
  try {
    const topCompaniesOnCeoRating = await reviewApi.getTopCompaniesIdOnAverageCeoRating();
    const comanyIds = topCompaniesOnCeoRating.map((obj) => obj._id);
    const companies = await companyApi.getCompanyCeoNamesByIds(comanyIds);
    const companiesIdToCeoMapping = companies.reduce((obj, company) =>
      Object.assign(obj, { [company.id]: company.ceo }),
      {}
    );

    const result =  topCompaniesOnCeoRating.map((obj) =>  
      Object.assign(obj, { ceo: companiesIdToCeoMapping[obj._id] || 'N/A' })
    );
    console.log({ topCompaniesOnCeoRating, companies, companiesIdToCeoMapping, result });
    callback(null, JSON.stringify(result));
  } catch (err) {
    console.error(err);
    callback(err, null);
  }
}

module.exports = {
  getDailyReviewCount,
  getTopReviewedCompanies,
  getTopRatingCompanies,
  getTopJobseekersOnApprovedReviews,
  countOneViewToCompany,
  getMostViewedCompanies,
  getMostViewedCompaniesPerDay,
  getTopRatingCEOs,
};
