
var kafka = require('../../kafka/client');

async function getJobs(req,res){
    let payload = {
        params: req.params
    }
    kafka.make_request('get_jobs', payload, function (err, results) {
        console.log("Make request to get reports stats");
        if (err) {
            console.log("Inside err",err);
            res.status(500).send({ "error": err });
        } else {
            console.log("result"+JSON.stringify(results));
            res.status(200).send(results)
        }
    })
}

async function postApplication(req,res){
    let payload = {
        params: req.body
    }
    kafka.make_request('postapplication', payload, function (err, results) {
        console.log("Make request to get reports stats");
        if (err) {
            console.log("Inside err",err);
            res.status(500).send({ "error": err });
        } else {
            console.log("result"+JSON.stringify(results));
            res.status(200).send(results)
        }
    })
  }

  async function getJobandCompany(req,res){
      console.log("REQPARAMETERS"+JSON.stringify(req.params));
    let payload = {
        params: req.params
    }
    kafka.make_request('get_jobcompany', payload, function (err, results) {
        console.log("Make request to get reports stats");
        if (err) {
            console.log("Inside err",err);
            res.status(500).send({ "error": err });
        } else {
            console.log("result"+JSON.stringify(results));
            res.status(200).send(results)
        }
    })
}

  exports.postApplication = postApplication;
  exports.getJobs = getJobs;
  exports.getJobandCompany = getJobandCompany;