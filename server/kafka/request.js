const kafka = require('./client');


const makeRequest = (url, req) => {
    return new Promise(function (resolve, reject) {
        kafka.make_request(url, req.body, function (err, results) {
            console.log('in result');
            console.log(results);
            if (err) {
                reject("Inside err");
                return ("System Error, Try Again.");
            } else {
                console.log("Inside else");
                resolve(results);
            }
        });
    });
}

exports.makeRequest = makeRequest;