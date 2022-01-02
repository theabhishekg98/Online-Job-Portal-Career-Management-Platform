var express = require('express');
var router = express.Router();
var kafka = require('../../kafka/client')
var locationModel = require("../../models/locationModel")
var MySqlHandler = require('../../utils/mySqlHandler')
var application = require('../../models/applicationModel')
var messagemodel = require('../../models/messageModel')


const mySql = new MySqlHandler();

router.get("/updateJobStatus/:id/:status", (req, res) => {
    console.log("hjh")
    console.log(req.params)
    kafka.make_request('updateJobStatus', req.params, function (err, results) {
        console.log("In update Job route");
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                msg: "Err"
            })
        } else {

            res.send(results).status(200)

        }
    })

}
)








router.post("/postJob", async (req, res) => {
    //    console.log(req)
    console.log("sd")
    console.log(req.body)
    // console.log(req.params)
    kafka.make_request('PostJob', req.body, function (err, results) {
        console.log("In post job");
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                msg: "Err"
            })
        } else {
            res.send(results).status(200)

        }
    })
}
)


router.get("/GetJobs/:empId", async (req, res) => {

    kafka.make_request('GetJobsEmp', req.params, function (err, results) {
        console.log("In GetJobs");
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                msg: "Err"
            })
        } else {
            res.send(results.responseobj).status(200)

        }
    })

})

router.get("/GetApplicantName/:userId", async (req, res) => {

    let userId = req.params.userId

    let query = "SELECT firstName,lastName From user where id =?"

    console.log(userId)
    mySql.db.query(query, userId, async function (err, resp) {
        if (resp) {
            res.status(200).send(...resp)
        }
    }
    )


}
)

router.post("/PostMessage", async (req, res) => {    
    console.log(req.body)
    
    kafka.make_request('PostMessageEmp', req.body, function (err, results) {
        console.log("In post messages emp");
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                msg: "Err"
            })
        } else {
            res.send(results).status(200)

        }
    })

})


router.get("/CheckChat/:userId/:empId",async (req,res)=>
{   
    console.log("heyy")
    console.log(req.params)

    kafka.make_request('CheckChat', req.params, function (err, results) {
        console.log("In GetJobs");
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                msg: "Err"
            })
        } else {
            res.send(results).status(200)

        }
    })


})



router.get("/getCompanyName/:id", (req, res) => {
    console.log("Get Company Name")
    console.log(req.params)
    kafka.make_request('GetCompanyName', req.params, function (err, results) {
        console.log("In GetCompanyName route");
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                msg: "Err"
            })
        } else {

            res.send(results).status(200)

        }
    })

}
)







// router.post("/UpdateApplicantStatus", async (req, res) => {

//     application.find


// }
// )



module.exports = router