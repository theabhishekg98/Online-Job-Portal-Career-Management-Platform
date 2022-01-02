const mongoose = require('../../utils/mongo');
var reviewModel = require('../../models/reviewModel');

mongoose

async function handle_viewYourReviews(req,callback){
    try{
        console.log("reached view applied jobs");
        console.log(req);
        let userId = req.params.userId;
        console.log("handle view your reviews:", req);
       
        reviewModel.find({"userId":userId},(err,resp)=>
        {
            console.log("mongodb view review response", resp);
            callback(null, resp);
        });
    } catch(err){
        console.log(err)
        callback(err,null)
    }
}

exports.handle_viewYourReviews=handle_viewYourReviews