const mongoose = require('../../utils/mongo');
const MySqlHandler = require('../../utils/mySqlHandler');
const util = require('util');
const mySqlHandler = new MySqlHandler();
var reviewModel = require('../../models/reviewModel');

mongoose

async function handle_save_Company_Review(req,callback){
    try{
        console.log("reached kafka write");
        console.log(req);
        var city;
        var state;
        if(req.params.compID){
            compID = req.params.compId;
        }
        if(req.params.userId){
            userID = req.params.userId;
        }
        else if(req.body){
            console.log("entered here")
            compID = req.body.compId;
            userID = req.body.userId;
        }
        mySqlHandler.db.query("SELECT city,state FROM user WHERE id=?",[userID],(err,result)=>{
            if(err){
                console.log("err"+err);
                callback(err,null)
            }
            console.log("results"+JSON.stringify(result));
            if(result){
              
               city = result[0].city;
               state = result[0].state;
               reviewModel.create(
                {
                    "companyId":compID,
                    "userId":userID,
                    "overallRating":req.body.overallRating,
                    "reviewSummary":req.body.reviewSummary,
                    "fullReview":req.body.yourReview,
                    "pros":req.body.pros,
                    "cons":req.body.cons,
                    "foundDate":req.body.foundDate,
                    "ceoApproval":req.body.ceoApproval,
                    "howToInterviewPrep":req.body.howToInterviewPrep,
                    "usercity":city,
                    "userstate":state
                }
            )
            }
        })
    }catch(err){ 
        console.log(err)
        callback(err,null)
    }
}

exports.handle_save_Company_Review=handle_save_Company_Review