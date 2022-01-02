const Constants = require('../../utils/constants');
const C = new Constants();
const kafkaRequest = require('../../kafka/request');


const MainApiKamal = class {
    constructor() {
    }

    getCompany = async (req, res) => {
        kafkaRequest.makeRequest('getCompany', req, res).then((value) => {
            res.status(200).send(value);
            res.end();
        });
    }

    getPhoto = (req, res) => {
        kafkaRequest.makeRequest('getPhoto', req, res).then((value) => {
            res.status(200).send(value);
            res.end();
        });
    }

    getJobs = (req, res) => {
        kafkaRequest.makeRequest('getJobs', req, res).then((value) => {
            res.status(200).send(value);
            res.end();
        });
    }

    addApplication = (req, res) => {
        kafkaRequest.makeRequest('addApplication', req, res).then((value) => {
            res.status(200).send(value);
            res.end();
        });
    }

    getApplication = (req, res) => {
        kafkaRequest.makeRequest('getApplication', req, res).then((value) => {
            res.status(200).send(value);
            res.end();
        });
    }

    deleteApplication = (req, res) => {
        kafkaRequest.makeRequest('deleteApplication', req, res).then((value) => {
            res.status(200).send(value);
            res.end();
        });
    }

    getCompanyList = (req, res) => {
        kafkaRequest.makeRequest('getCompanyList', req, res).then((value) => {
            res.status(200).send(value);
            res.end();
        });
    }

    addUser = (req, res) => {
        kafkaRequest.makeRequest('addUser', req, res).then((value) => {
            res.status(200).send(value);
            res.end();
        });
    }

    addPhoto = (req, res) => {
        var response = photo.addPhoto(req.body);

        response.then(value => {
            res.status(200).send(value);
        }, err => {
            console.log(err);
            res.status(500).send(err);
        });
    }
}


module.exports = MainApiKamal;