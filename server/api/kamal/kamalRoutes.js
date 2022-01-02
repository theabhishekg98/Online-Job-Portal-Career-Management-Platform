var express = require('express');
var router = express.Router();
const MainApiKamal = require('./MainApiKamal');
const apiKamal = new MainApiKamal();


router.post('/getCompany', (req, res) => {
    apiKamal.getCompany(req, res);
});

router.post('/getPhoto', (req, res) => {
    apiKamal.getPhoto(req, res);
});

router.post('/addPhoto', (req, res) => {
    apiKamal.addPhoto(req, res);
});

router.post('/getJobs', (req, res) => {
    apiKamal.getJobs(req, res);
});

router.post('/addApplication', (req, res) => {
    apiKamal.addApplication(req, res);
});

router.post('/getApplication', (req, res) => {
    apiKamal.getApplication(req, res);
});

router.post('/deleteApplication', (req, res) => {
    apiKamal.deleteApplication(req, res);
});

router.post('/addUser', (req, res) => {
    apiKamal.addUser(req, res);
});

router.post('/getCompanyList', (req, res) => {
    apiKamal.getCompanyList(req, res);
});

module.exports=router