var express = require('express');
const { getEmployerProfile ,saveEmployeeProfile, saveCompanyProfile, getCompanyProfile,getAllCompanies, saveNewCompany} = require('./CompanyProfile');
const { getLogin } = require('./Login');
const { getAllchats, getMessagesByChatId, addMessage } = require('./messages');
const {  getAllStats } = require('./reports');
const { getAllReviews,updateFeaturedReview } = require('./reviews');
var router = express.Router();
/**
 * Get Reviews without Base
 */
// router.get('/employer/reviews/all', getAllReviews);
// /**
//  * Get Reviews with caching
//  */
// router.get('/employer/reviews/cached/all',getAllReviewsWithCaching);

// router.get('/employer/reviews/random',addRandomReviews);


router.get('/employer/:compId/reviews', getAllReviews);
router.put('/employer/review',updateFeaturedReview)
/**
 * Get all stats
 */
router.get('/employer/:empId/reports/stats',getAllStats)

router.get('/employer/:empId/profile',getEmployerProfile)

router.post('/employer/:empId/profile',saveEmployeeProfile)

router.get('/employer/:compId/companyProfile',getCompanyProfile)
router.post('/employer/:compId/companyProfile',saveCompanyProfile)
/**
 * To get all chats of a particular person
 */
router.get('/chats/:userType/:id',getAllchats)
/**
 * To get chat details of a particular chat id
 */
router.get('/chat/:chatId',getMessagesByChatId)

router.post('/chat/:chatId',addMessage)

router.get('/companies/all',getAllCompanies)

router.post('/company/new',saveNewCompany)

router.post('/login',getLogin)

module.exports=router