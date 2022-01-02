var applicationModel=require('../../models/applicationModel')
var _ = require('lodash');
const MySqlHandler = require('../../utils/mySqlHandler');
const util = require('util');
var totalApps=(req)=>applicationModel.aggregate([
    {
        "$match": 
        {
            companyId:req.params.empId
        }
    },
    {
        "$group":
        {
            _id: "$jobId" ,
            totalApplications: { $sum: 1 }
        }
    }
   
])
var totalAccepted=(req)=>applicationModel.aggregate([
    {
       "$match": 
       {
           companyId:req.params.empId,
           status: {"$in":["accepted"]}
       }
   },{
       "$group":
       {
           _id: "$jobId" ,
           acceptedApplications: { $sum: 1 }
       }
   }
])
var totalRejected=(req)=>applicationModel.aggregate([
    {
       "$match": 
       {
           companyId:req.params.empId,
           status: {"$in":["rejected"]}
       }
   },{
       "$group":
       {
           _id: "$jobId" ,
           rejectedApplications: { $sum: 1 }
       }
   }
])

async function handle_get_Employee_reports(req,callback){
    
    let stats=[];
    Promise.all([
        totalApps(req),
        totalAccepted(req),
        totalRejected(req)
    ]).then(([submiited,accepted,rejected])=>{
        stats=_(submiited).concat(accepted,rejected).groupBy('_id').map(_.spread(_.merge)).value();
        // res.send(stats)
        callback(null,stats)
    })
}

async function handle_get_employee_reports_2(req,callback){
    try{
        const mySql = new MySqlHandler();
        // mySql.db.connect();
        let getJobIds = "select id from job where empId=?"
        var query = util.promisify(mySql.db.query).bind(mySql.db)
        let stats
        query(getJobIds,[req.params.empId]).then(result=>{
            result=result.map(id=>id.id)
            console.log(result)
            applicationModel.find({jobId:{$in:result}}).select(["jobId","status"]).then(res=>{
                let totalApplicationsPerJob=_(res).countBy('jobId')
                let totalAccepted=_(res).filter({"status":"hired"}).countBy("jobId")
                let totalRejected=_(res).filter({"status":"rejected"}).countBy("jobId")
                // console.log(totalRejected)
                stats=_(totalApplicationsPerJob).concat(totalAccepted,totalRejected)
                callback(null,{allJobs:result,totalApplicationsPerJob,totalAccepted,totalRejected})
            })
        })
    }catch(err){

    }
}
exports.handle_get_Employee_reports=handle_get_Employee_reports
exports.handle_get_employee_reports_2=handle_get_employee_reports_2