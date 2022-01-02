var kafka = require('../../kafka/client');

async function getEmployerProfile(req,res){
    let payload = {
        params: req.params,
        body: req.body
    }
    kafka.make_request('getEmployeeProfile', payload, function (err, results) {
        console.log("Make request to get employee profile");
        // console.log(results);
        if (err) {
            console.log("Inside err",err);
            res.status(500).send({ "error": err });
        } else {
            res.status(200).send(results)
        }
    })



}
async function saveEmployeeProfile(req,res){
    let payload = {
        params: req.params,
        body: req.body
    }
    kafka.make_request('saveEmployeeProfile', payload, function (err, results) {
        console.log("Make request to save employee profile");
        // console.log(results);
        if (err) {
            console.log("Inside err",err);
            res.status(500).send({ "error": err });
        } else {
            res.status(200).send(results)
        }
    })
}

async function getCompanyProfile(req,res){
    let payload = {
        params: req.params,
        body: req.body
    }
    kafka.make_request('getCompanyProfile', payload, function (err, results) {
        console.log("Make request to get company profile");
        // console.log(results);
        if (err) {
            console.log("Inside err",err);
            res.status(500).send({ "error": err });
        } else {
            res.status(200).send(results)
        }
    })



}
async function saveCompanyProfile(req,res){
    let payload = {
        params: req.params,
        body: req.body
    }
    kafka.make_request('saveCompanyProfile', payload, function (err, results) {
        console.log("Make request to save company profile");
        // console.log(results);
        if (err) {
            console.log("Inside err",err);
            res.status(500).send({ "error": err });
        } else {
            res.status(200).send(results)
        }
    })
}
async function getAllCompanies(req,res){
    let payload = {
        params: req.params,
        body: req.body
    }
    kafka.make_request('companiesList', payload, function (err, results) {
        console.log("Make request to save company profile");
        // console.log(results);
        if (err) {
            console.log("Inside err",err);
            res.status(500).send({ "error": err });
        } else {
            res.status(200).send(results)
        }
    })
}

async function saveNewCompany(req,res){
    let payload = {
        params: req.params,
        body: req.body
    }
    kafka.make_request('registerNewCompany', payload, function (err, results) {
        console.log("Make request to save company ");
        // console.log(results);
        if (err) {
            console.log("Inside err",err);
            res.status(500).send({ "error": err });
        } else {
            res.status(200).send(results)
        }
    })
}
exports.saveNewCompany=saveNewCompany
exports.getAllCompanies=getAllCompanies
exports.getEmployerProfile=getEmployerProfile
exports.saveEmployeeProfile=saveEmployeeProfile
exports.getCompanyProfile=getCompanyProfile
exports.saveCompanyProfile=saveCompanyProfile