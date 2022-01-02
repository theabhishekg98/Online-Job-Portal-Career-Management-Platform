var kafka = require('../../kafka/client');

async function getLogin(req,res){
    let payload = {
        params: req.params,
        body: req.body
    }
    kafka.make_request('login', payload, function (err, results) {
        console.log("Make request togetLogin");
        // console.log(results);
        if (err) {
            console.log("Inside err",err);
            res.status(500).send({ "error": err });
        } else {
            if(results?.authenticated && results.type==="emp"){
                res.cookie('empCookie',results,{maxAge: 900000, httpOnly: false, path : '/'});
                res.status(200).send(results)
            }else if(results?.authenticated && results.type==="user"){
                res.cookie('userCookie',results,{maxAge: 900000, httpOnly: false, path : '/'});
                res.status(200).send(results)
            }else if(results?.authenticated && results.type==="admin"){
                res.cookie('adminCookie',results,{maxAge: 900000, httpOnly: false, path : '/'});
                res.status(200).send(results)
            }
            else{
            res.status(403).send(results)
            }
        }
    })



}
exports.getLogin=getLogin