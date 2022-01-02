
var kafka = require('../../kafka/client');


async function postSalary(req,res){
    let payload = {
        params: req.body
    }
    kafka.make_request('post_salary', payload, function (err, results) {
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

  exports.postSalary = postSalary;