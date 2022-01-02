const reviewApiClass = require('./api/reviewApi');
const companyApiClass = require('./api/companyApi');
const userApiClass = require('./api/userApi');

const reviewApi = new reviewApiClass();
const companyApi = new companyApiClass();
const userApi = new userApiClass();

async function getReviews(payload, callback) {
  const { status, size, page } = payload;

  console.log({ status, size, page  });

  try {
    // Execute
    const countReviewsPromise = reviewApi.countReviews(status);

    // Hydrate reviews with company name and user name
    const reviews = await reviewApi.getReviews(status, page, size); 
    const companyIds = reviews.map((review) => review.companyId);
    const userIds = reviews.map((review) => review.userId);
    const getCompanyNamesByIdsPromise = companyApi.getCompanyNamesByIds(companyIds);
    const getUserNamesByIdsPromise = userApi.getUserNames(userIds);
    const companyNamesByIds = await getCompanyNamesByIdsPromise;
    const comanyIdNameMapping = companyNamesByIds.reduce(
      (obj, item) => Object.assign(obj, { [item.id]: item.name }),
      {}
    );
    const userNamesByids = await getUserNamesByIdsPromise;
    const userIdNameMapping = userNamesByids.reduce(
      (obj, item) => Object.assign(obj, { [item.id]: `${item.firstName} ${item.lastName}` }),
      {} 
    );
    const hydratedReviews = reviews.map((review) => Object.assign(review._doc, {
      companyName: comanyIdNameMapping[review.companyId] || 'N/A',
      userName: userIdNameMapping[review.userId] || 'N/A',
    }));
    const reviewCount = await countReviewsPromise;

    // Construct response result
    const result = JSON.stringify({
      count: reviewCount,
      reviews: hydratedReviews,
    });

    console.log({ result });

    callback(null, result);
  } catch (err) {
    callback(err, null);
  }
}

async function updateReviewStatus(payload, callback) {
  const { reviewId, status } = payload;
  try {
    await reviewApi.updateReviewStatus(reviewId, status);
    callback(null, 'Review status updated');
  } catch (err) {
    callback(err, null);
  }
}

module.exports = {
  getReviews,
  updateReviewStatus,
};