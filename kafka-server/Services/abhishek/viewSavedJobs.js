const mongoose = require('../../utils/mongo');
const saveModel = require('../../models/saveModel')
const MySqlHandler = require('../../utils/mySqlHandler');
const util = require('util');
const { promisify } = require("util");

mongoose

async function handle_viewSavedJobs(req,callback){
    try{
        console.log("reached view saved jobs");
        console.log(req);
        let userId = req.params.userId;
        console.log("handle view saved jobs:", userId);
        console.log("view saved jobs :", req);
        
        saveModel.find({"userId":userId},(err,resp)=>
        {
            console.log("mongodb response", resp);
            callback(null, resp);
        });

    } catch(err){
        console.log(err)
        callback(err,null)
    }
}

exports.handle_viewSavedJobs=handle_viewSavedJobs