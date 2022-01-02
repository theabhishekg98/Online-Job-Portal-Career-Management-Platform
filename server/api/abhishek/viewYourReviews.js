var kafka = require('../../kafka/client');

async function viewYourReviews(req,res){
    let payload = {
        params: req.params,
        body: req.body
    }
    console.log("payload = ", payload);
    kafka.make_request('viewYourReviews', payload, function (err, results) {
        console.log("Make request to get your reviews");
        // console.log(results);
        console.log(payload);
        if (err) {
            console.log("Inside err",err);
            res.status(500).send({ "error": err });
        } else {
            res.status(200).send(results)
        }
    })
}

exports.viewYourReviews=viewYourReviews
