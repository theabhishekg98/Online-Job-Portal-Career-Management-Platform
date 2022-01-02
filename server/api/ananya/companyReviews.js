const express = require("express");
const router = express.Router();
const mongoose = require("../../utils/mongo");
const ReviewModel = require("../../models/reviewModel");
async function getCompanyReviews(req,res){
    ReviewModel.find({companyId:`${req.params.data}`},(err,result)=>{
        if(err){
            console.log(err);
        }
        if(result){
            console.log("wrong"+JSON.stringify(result))
            res.send(result)
        }
    })
}

async function updateCompanyReviews(req,res){
    console.log("req"+JSON.stringify(req.body))
    var flag = false;
    if(req.body.ishelp=="Yes"){
        flag = true;
    }
    else{
        flag = false;
    }
    var updateRevi = {$set: {
        ishelp : flag,
        helpcount: req.body.helpcount,
        nohelpcount: req.body.nohelpcount,

      }}

    ReviewModel.updateOne({_id:req.body.id},updateRevi,(err,result)=>{
        if(err){
            console.log(err);
        }
        if(result){
            console.log("result"+JSON.stringify(result))
            res.send(result)
        }
    })


}
exports.getCompanyReviews = getCompanyReviews;
exports.updateCompanyReviews = updateCompanyReviews;
