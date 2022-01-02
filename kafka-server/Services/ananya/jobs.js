  const MySqlHandler = require('../../utils/mySqlHandler');
const util = require('util');
const mySqlHandler = new MySqlHandler();
const mongoose = require('../../utils/mongo');
var applicationModel = require('../../models/applicationModel');

async function handle_get_jobs(req,callback){
        console.log("req"+req.params.data);
        mySqlHandler.db.query("Select * from job where companyid=?",[req.params.data],(err,result)=>{
            if(err){
                console.log(err);
                callback(err,null);
            }
            else if(result){
                console.log("results quali are"+JSON.stringify(result));
                callback(null,result);
            } 
      });
    
}
async function handle_get_job(req,callback){
   
    var data = req.params.companydetails.split(' ');
    console.log("reqdtfgyhujikl"+data[0]+'jnkfdm'+data[1]);
    mySqlHandler.db.query("Select * from job where companyid=? AND Id=?",[data[1],data[0]],(err,result)=>{
        if(err){
            console.log(err);
            callback(err,null);
        }
        else if(result){
            console.log("results quali are"+JSON.stringify(result));
            callback(null,result);
        } 
  });

}


async function handle_application(req,callback){
    console.log("here we are"+JSON.stringify(req.params));
    applicationModel.findOne({
        $and: [
            {userId : req.params.userId },{ jobId : req.params.jobId}
        ]
    },(err,result)=>{
        if(err){
            console.log("error"+err);
        }
        if(result){
            callback(null,"Already submitted the application");
        }
        else{
            mySqlHandler.db.query("Select firstName,lastName from user where id=?",[req.params.userId],(err,result)=>{
                if(err){
                    console.log("err"+err);
                }
                else{
                    console.log("result12345678765432"+JSON.stringify(result));
                    var applicationdata  = new applicationModel({
                        userId : req.params.userId,
                        jobId : req.params.jobId,
                        companyId : req.params.companyId,
                        status : req.params.status,
                        resumeLink: req.params.resumeData,
                        coverLink: req.params.coverdata,
                        userfName : result[0].firstName,
                        userlName : result[0].lastName
                    });
                    applicationdata.save((err,results)=>{
                        if(err){
                            console.log(err);
                        }
                        if(results){
                            callback(null,"Application submitted successfully");
                        }
                    })
                }
            })
           
        }
    })

}
exports.handle_get_jobs = handle_get_jobs
exports.handle_application = handle_application
exports.handle_get_job = handle_get_job


   












 