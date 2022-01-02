var kafka = require('../../kafka/client');

async function getResume(req,res){
    let payload = {
        params: req.params,
        body: req.body
    }
    console.log("payload = ", payload);
    kafka.make_request('getResume', payload, function (err, results) {
        console.log("Make request to get resume");
        // console.log(results);
        console.log(payload);
        if (err) {
            console.log("Inside get resume err",err);
            res.status(500).send({ "error": err });
        } else {
            console.log("get resume.. results = ", results);
            res.status(200).send({results});
        }
    })
}

exports.getResume=getResume