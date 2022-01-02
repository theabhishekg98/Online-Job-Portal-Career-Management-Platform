const express = require('express');

const kafka = require('../../kafka/client');

const router = express.Router();

// Print request
const requestUriPayload = (req) => {
  const payload = req.method === 'POST' ? req.body : req.query;
  return `${req.method} ${req.baseUrl + req.path} ${JSON.stringify(payload)}`;
};
router.use((req, res, next) => {
  console.log(requestUriPayload(req));
  next();
});

function makeKafkaRequestWrapper(topic, payload, res) {
  kafka.make_request(topic, payload, (err, result) => {
    if (!err) res.send(result);
    else {
      console.error(err);
      res.status(500).send(err.message);
    }
  });
}

// =======================================================
// For admin manage reviews tab
// =======================================================
router.get('/reviews/get', (req, res) => {
  // Parse and validate parameters
  const { query: { status, page: pageIdx, size: sizeNumber } } = req;
  const page = pageIdx ? parseInt(pageIdx, 10) : 0;
  const size = pageIdx ? parseInt(sizeNumber, 10) : 10;
  if (Number.isNaN(page) || Number.isNaN(size)) {
    res.status(400).send(`page and size should be integer numbers - ${pageIdx}/${sizeNumber}`);
    return;
  }
  makeKafkaRequestWrapper('adminGetReviews', { status, page, size }, res);
});

router.post('/review/status/update', (req, res) => {
  const { body: { reviewId, status } } = req;
  makeKafkaRequestWrapper('adminUpdateReviewStatus',  { reviewId, status }, res);
});

// =======================================================
// For admin manage photos tab
// =======================================================
router.get('/photos/get', (req, res) => {
  // Parse and validate parameters
  const { query: { status, page: pageIdx, size: sizeNumber } } = req;
  const page = pageIdx ? parseInt(pageIdx, 10) : 0;
  const size = pageIdx ? parseInt(sizeNumber, 10) : 10;
  if (Number.isNaN(page) || Number.isNaN(size)) {
    res.status(400).send(`page and size should be integer numbers - ${pageIdx}/${sizeNumber}`);
    return;
  }
  makeKafkaRequestWrapper('adminGetPhotos', { status, page, size }, res);
});

router.post('/photo/status/update', (req, res) => {
  const { body: { photoId, status } } = req;
  makeKafkaRequestWrapper('adminUpdatePhotoStatus', { photoId, status }, res);
});

// =======================================================
// For admin company profile tab
// =======================================================
router.get('/companies/get/by/name', (req, res) => {
  // Parse and validate parameters
  const { query: { companyName, page: pageIdx, size: sizeNumber } } = req;
  const page = pageIdx ? parseInt(pageIdx, 10) : 0;
  const size = pageIdx ? parseInt(sizeNumber, 10) : 10;
  if (Number.isNaN(page) || Number.isNaN(size)) {
    res.status(400).send(`page and size should be integer numbers - ${pageIdx}/${sizeNumber}`);
    return;
  }
  makeKafkaRequestWrapper('adminGetCompaniesByName', { companyName, page, size }, res);
});

// =======================================================
// For admin company profile reviews tab
// =======================================================
router.get('/company/:companyId/reviews/closed/get', (req, res) => {
  // Parse and validate parameters
  const { params: { companyId } } = req;
  const { query: { page: pageIdx, size: sizeNumber } } = req;
  const page = pageIdx ? parseInt(pageIdx, 10) : 0;
  const size = pageIdx ? parseInt(sizeNumber, 10) : 10;
  if (Number.isNaN(page) || Number.isNaN(size)) {
    res.status(400).send(`page and size should be integer numbers - ${pageIdx}/${sizeNumber}`);
    return;
  }
  makeKafkaRequestWrapper('adminGetComapnyClosedReviews', { companyId, page, size }, res);
});

router.get('/company/:companyId/application/status/analytics', (req, res) => {
  const { params: { companyId } } = req;
  makeKafkaRequestWrapper('adminGetCompanyApplicationStatistics', { companyId }, res);
});

// =======================================================
// For admin analystics dashboard tab
// =======================================================
router.get('/analytics/daily/reviews/count', (req, res) => {
  makeKafkaRequestWrapper('adminGetDailyReviewCount', {}, res);
});

router.get('/analytics/top/reviewed/companies', (req, res) => {
  makeKafkaRequestWrapper('adminGetTopReviewedCompanies', {}, res);
}); 

router.get('/analytics/top/rating/companies', (req, res) => {
  makeKafkaRequestWrapper('adminGetTopRatingCompanies', {}, res);
});

router.get('/analytics/top/jobseekers/on/approved/review', (req, res) => {
  makeKafkaRequestWrapper('adminGetTopJobseekersOnApprovedReviews', {}, res);
});

router.get('/analytics/most/viewed/companies', (req, res) => {
  makeKafkaRequestWrapper('adminGetMostViewedCompanies', {}, res);
});

router.get('/analytics/most/viewed/companies/per/day', (req, res) => {
  let { query: { year, month, date } } = req;
  if (!year || !month || !date) {
    const today = new Date();
    year = today.getFullYear();
    month = today.getMonth() + 1;
    date = today.getDate();
  }
  makeKafkaRequestWrapper('adminGetMostViewedCompaniesPerDay', {year, month, date}, res);
});

router.get('/analytics/top/rating/ceos', (req, res) => {
  makeKafkaRequestWrapper('adminGetTopRatingCEOs', {}, res);
});

module.exports=router;