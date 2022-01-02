var kafka = require('../../kafka/client');

async function viewSavedJobs(req,res){
    let payload = {
        params: req.params,
        body: req.body
    }
    console.log("payload = ", payload);
    kafka.make_request('viewSavedJobs', payload, function (err, results) {
        console.log("Make request to get saved jobs");
        console.log(results);
        if (err) {
            console.log("Inside err",err);
            res.status(500).send({ "error": err });
        } else {
            res.status(200).send(results)
        }
    })
}

exports.viewSavedJobs=viewSavedJobs
