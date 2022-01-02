var kafka = require('../../kafka/client');

async function getAllCompanyReviews(req,res){
    let payload = {
        params: req.params,
        body: req.body
    }
    // console.log(payload);
    kafka.make_request('getAllCompanyReviews', payload, function (err, results) {
        console.log("Make request to get all companies");
        console.log(payload);
        if (err) {
            console.log("Inside err",err);
            res.status(500).send({ "error": err });
        } else {
            console.log("SQL:::::::", results);
            console.log(typeof results);
            res.status(200).send({"allCompanies":results});
        }
    })
}

async function getSearchedCompanyReviews(req,res){
    let payload = {
        params: req.params,
        body: req.body
    }
    console.log("payload = ", payload);
    kafka.make_request('getSearchedCompanyReviews', payload, function (err, results) {
        console.log("Make request to get searched companies");
        // console.log(results);
        console.log(payload);
        if (err) {
            console.log("Inside err",err);
            res.status(500).send({ "error": err });
        } else {
            console.log("whateverid_companu", results);
            res.status(200).send({"allCompanies":results});
        }
    })
}

exports.getAllCompanyReviews=getAllCompanyReviews
exports.getSearchedCompanyReviews=getSearchedCompanyReviews