var kafka = require('../../kafka/client');

async function deleteResume(req,res){
    let payload = {
        params: req.params,
        body: req.body
    }
    console.log("payload = ", payload);
    kafka.make_request('deleteResume', payload, function (err, results) {
        console.log("Make request to delete resume");
        // console.log(results);
        console.log(payload);
        if (err) {
            console.log("Inside delete resume err",err);
            res.status(500).send({ "error": err });
        } else {
            console.log("deleted resume.. results = ", results);
            res.status(200).send({"resume delete result: ":results});
        }
    })
}

exports.deleteResume=deleteResume