var kafka = require('../../kafka/client');

async function getAverageSalaryForRole(req,res){
    // console.log("^^^^^^^^^^^^^^^^^^^^^^^");
    let payload = {
        params: req.params,
        body: req.body
    }
    console.log(payload);
    kafka.make_request('getAverageSalaryForRole', payload, function (err, results) {
        console.log("Make request to get average salary for role");
        console.log(payload);
        if (err) {
            console.log("Inside err",err);
            res.status(500).send({ "error": err });
        } else {
            console.log("SQL:::::::", results);
            console.log(typeof results);
            res.status(200).send({"avgSalary":results});
        }
    })
}

async function getTopFiveSalariesForRole(req,res){
    let payload = {
        params: req.params,
        body: req.body
    }
    console.log("payload = ", payload);
    kafka.make_request('getTopFiveSalariesForRole', payload, function (err, results) {
        console.log("Make request to get top five salaries");
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

// async function getAverageSalaryForCompany(req,res){
//     let payload = {
//         params: req.params,
//         body: req.body
//     }
//     // console.log(payload);
//     kafka.make_request('getAverageSalaryForCompany', payload, function (err, results) {
//         console.log("Make request to get average salary for company");
//         // console.log(results);
//         console.log(payload);
//         if (err) {
//             console.log("Inside err",err);
//             res.status(500).send({ "error": err });
//         } else {
//             res.status(200).send(results)
//         }
//     })
// }

// exports.getAverageSalaryForCompany=getAverageSalaryForCompany
exports.getAverageSalaryForRole=getAverageSalaryForRole
exports.getTopFiveSalariesForRole=getTopFiveSalariesForRole
