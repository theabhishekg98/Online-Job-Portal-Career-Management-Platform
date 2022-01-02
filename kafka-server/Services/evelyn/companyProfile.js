const companyApiClass = require('./api/companyApi');
const photoApiClass = require('./api/photoApi');
const reviewApiClass = require('./api/reviewApi');
const jobApiClass = require('./api/jobApi');
const applicationApiClass = require('./api/applicationApi');

const companyApi = new companyApiClass();
const photoApi = new photoApiClass();
const reviewApi = new reviewApiClass();
const jobApi = new jobApiClass();
const applicationApi = new applicationApiClass();

async function getCompaniesByName(payload, callback) {
  const { companyName, page, size } = payload;
  try {
    // Execute
    const countCompanyPromise = companyApi.countCompaniesByName(companyName);

    // Hydrate companies with logo url
    const companies = await companyApi.getCompaniesByName(companyName);
    const photoIds = companies.map((company) => company.logoId);
    const photoIdUrls = await photoApi.getPhotosUrlByIds(photoIds);
    const mapping = photoIdUrls.reduce(
      (obj, item) => Object.assign(obj, { [item._id]: item.url }),
      {}
    );

    const hydratedCompanies = companies.map((company) => ({
      ...company,
      logoUrl: mapping[company.logoId],
    }));

    // Construct response
    const companyCount = await countCompanyPromise;
    
    // Construct response result
    const result = JSON.stringify({
      count: companyCount,
      companies: hydratedCompanies,
    });
    callback(null, result);
  } catch (err) {
    console.error(err);
    callback(null, err);
  }
}

async function getCompanyClosedReviews(payload, callback) {
  const { companyId, page, size } = payload;
  try {
    // Execute
    const countReviewsPromise = reviewApi.countClosedReviewsByCompanyId(companyId);
    const getReviewsPromise = reviewApi.getCloedReviewsByCompanyId(companyId, page, size);
    const getCompanyNamesByIdsPromise = companyApi.getCompanyNamesByIds([companyId]);

    // Construct response
    const count = await countReviewsPromise;
    const reviews = await getReviewsPromise;
    const companyNamesByIds = await getCompanyNamesByIdsPromise;
    const company = companyNamesByIds.find((item) => {
      return Number(item.id) === Number(companyId);
    });
    const companyName = company ? company.name : 'N/A';
    const result = JSON.stringify({
      count,
      companyName,
      reviews,
    });
    callback(null, result);
  } catch (err) {
    console.error(err);
    callback(err, null);
  }
}

async function getCompanyApplicationStatistics(payload, callback) {
  const { companyId } = payload;
  try {
    const jobIds = await jobApi.getJobsIdByCompanyId(companyId);
    const result = await applicationApi.countByStatus(jobIds);
    callback(null, JSON.stringify(result));
  } catch (err) {
    console.error(err);
    callback(err, null);
  }
}

module.exports = {
  getCompaniesByName,
  getCompanyClosedReviews,
  getCompanyApplicationStatistics,
};
