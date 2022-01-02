var kafka = require('../../kafka/client');

async function getAllStats(req,res){
    let payload = {
        params: req.params,
        body: req.body
    }
    kafka.make_request('getEmployeeReport', payload, function (err, results) {
        console.log("Make request to get reports stats");
        // console.log(results);
        if (err) {
            console.log("Inside err",err);
            res.status(500).send({ "error": err });
        } else {
            res.status(200).send(results)
        }
    })



}

exports.getAllStats=getAllStats