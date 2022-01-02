var express = require('express');
var router = express.Router();

const {saveCompanyReview} = require('./writeReviews');
// const {getAverageSalaryForRole, getTopFiveSalariesForRole, getAverageSalaryForCompany} = require('./findSalary.js');
const {getAverageSalaryForRole, getTopFiveSalariesForRole} = require('./findSalary');
const {getUserProfile, saveUserProfile} = require('./userProfile')
const {getAllCompanyReviews, getSearchedCompanyReviews} = require('./companyReviewsTab')
const {deleteResume} = require('./deleteResume')
const {viewAppliedJobs} = require('./viewAppliedJobs');
const {viewYourReviews} = require('./viewYourReviews');
const {getResume} = require('./getResume');
const {viewSavedJobs} = require('./viewSavedJobs');

router.post('/company/write/review',saveCompanyReview);
router.post('/company/salary/averageSalary', getAverageSalaryForRole);
router.post('/company/salary/topFiveSalaries', getTopFiveSalariesForRole);
router.get('/user/:userId/profile/', getUserProfile);
router.post('/user/:userId/profile',saveUserProfile);
router.get('/company/getAll/companies', getAllCompanyReviews);
router.post('/company/getSearched/company', getSearchedCompanyReviews);
router.post('/delete/file/:userId', deleteResume);
router.post('/view/applied/jobs/:userId', viewAppliedJobs);
router.post('/view/saved/jobs/:userId', viewSavedJobs);
router.post('/view/your/reviews/:userId', viewYourReviews);
router.get('/get/file/:userId', getResume);
// router.post('/company/salary/averageSalaryOfCompany', getAverageSalaryForCompany);

module.exports=router