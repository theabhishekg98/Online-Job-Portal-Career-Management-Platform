var kafka = require('../../kafka/client');

async function postUploads(req,res){
    let payload = {
        body: req.body
    }
    kafka.make_request('postuploads', payload, function (err, results) {
        console.log("Make request to get reports stats");
        // console.log(results);
        if (err) {
            console.log("Inside err",err);
            res.status(500).send({ "error": err });
        } else {
            console.log("result"+JSON.stringify(results));
            res.status(200).send(results)
        }
    })
 
 }

 async function postPhoto(req,res){
    let payload = {
        body: req.body
    }
    kafka.make_request('postphoto', payload, function (err, results) {
        console.log("Make request to get reports stats");
        // console.log(results);
        if (err) {
            console.log("Inside err",err);
            res.status(500).send({ "error": err });
        } else {
            console.log("result"+JSON.stringify(results));
            res.status(200).send(results)
        }
    })
 }
 async function getPhoto(req,res){
     console.log("helloworld"+JSON.stringify(req.params));
    let payload = {
        params: req.params
    }
    kafka.make_request('get_photo', payload, function (err, results) {
        console.log("Make request to get reports stats");
        // console.log(results);
        if (err) {
            console.log("Inside err",err);
            res.status(500).send({ "error": err });
        } else {
            console.log("result"+JSON.stringify(results));
            res.status(200).send(results)
        }
    })
};

async function postcoverletter(req,res){
    let payload = {
        body: req.body
    }
    kafka.make_request('postcoverletter', payload, function (err, results) {
        console.log("Make request to get reports stats");
        // console.log(results);
        if (err) {
            console.log("Inside err",err);
            res.status(500).send({ "error": err });
        } else {
            console.log("result"+JSON.stringify(results));
            res.status(200).send(results)
        }
    })
 
 }

exports.getPhoto = getPhoto;
exports.postUploads = postUploads;
exports.postPhoto = postPhoto;
exports.postcoverletter = postcoverletter;


