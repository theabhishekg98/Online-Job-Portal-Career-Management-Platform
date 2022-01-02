var express = require('express');
const { getFile,getcover } = require('./files');
const {  postApplication,getJobs,getJobandCompany } = require('./jobs');
const { postSalary } = require('./salary');
const { getPhoto,postUploads,postPhoto,postcoverletter } = require('./uploads');
const { getCompanyReviews,updateCompanyReviews} = require('./companyReviews');

var router = express.Router();

router.get('/files/:data',getFile)
router.get('/files/cover/:data',getcover)
router.get('/jobs/:data',getJobs)
router.get('/jobs/getjobs/:companydetails',getJobandCompany)
router.post('/jobs/apply',postApplication)
router.post('/salary/',postSalary)
router.post('/uploads/resume',postUploads)
router.get('/uploads/photo/:data',getPhoto)
router.post('/uploads/photo',postPhoto)
router.post('/uploads/coverletter',postcoverletter)
router.get('/companyReviews/:data',getCompanyReviews)
router.post('/companyReviews',updateCompanyReviews)


module.exports=router