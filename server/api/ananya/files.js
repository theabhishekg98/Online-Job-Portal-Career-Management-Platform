
var kafka = require('../../kafka/client');


async function getFile(req,res){
    let payload = {
        params: req.params
    }
    kafka.make_request('getfiles', payload, function (err, results) {
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
async function getcover(req,res){
    let payload = {
        params: req.params
    }
    kafka.make_request('get_cover', payload, function (err, results) {
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


exports.getFile = getFile;
exports.getcover = getcover;
