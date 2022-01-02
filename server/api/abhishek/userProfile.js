var kafka = require('../../kafka/client');

async function getUserProfile(req,res){
    console.log("---------------------");
    let payload = {
        params: req.params,
        body: req.body
    }
    console.log(payload);
    kafka.make_request('getUserProfile', payload, function (err, results) {
        console.log("Make request to get user profile");
        console.log(payload);
        if (err) {
            console.log("Inside err",err);
            res.status(500).send({ "error": err });
        } else {
            console.log("SQL111::::", results);
            console.log(typeof results);
            res.status(200).send({"userProfile":results});
        }
    })
}


async function saveUserProfile(req,res){
    console.log("---------------------");
    let payload = {
        params: req.params,
        body: req.body
    }
    console.log(payload);
    kafka.make_request('saveUserProfile', payload, function (err, results) {
        console.log("Make request to save user profile");
        console.log(payload);
        if (err) {
            console.log("Inside err",err);
            res.status(500).send({ "error": err });
        } else {
            console.log("SQL222:::::::", results);
            console.log(typeof results);
            res.status(200).send({"userProfile":results});
        }
    })
}

exports.getUserProfile=getUserProfile
exports.saveUserProfile=saveUserProfile
