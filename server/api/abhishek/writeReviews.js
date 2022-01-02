var kafka = require('../../kafka/client');

async function saveCompanyReview(req,res){
    let payload = {
        params: req.params,
        body: req.body
    }
    kafka.make_request('saveCompanyReview', payload, function (err, results) {
        console.log("Make request to save company review");
        // console.log(payload);
        if (err) {
            console.log("Inside err",err);
            res.status(500).send({ "error": err });
        } else {
            res.status(200).send(results)
        }
    })
}

exports.saveCompanyReview=saveCompanyReview