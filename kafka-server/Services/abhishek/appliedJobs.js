const mongoose = require('../../utils/mongo');
var reviewModel = require('../../models/reviewModel');
const applicationmodel = require('../../models/applicationModel')
const MySqlHandler = require('../../utils/mySqlHandler');
const util = require('util');
const { promisify } = require("util");

mongoose

async function handle_viewAppliedJobs(req,callback){
    try{
        console.log("reached view applied jobs");
        console.log(req);
        let userId = req.params.userId;
        console.log("handle view applied jobs:", userId);
        console.log("view applied jobs :", req);
        
        const mySql = new MySqlHandler();
        // mySql.db.connect();
        var query=util.promisify( mySql.db.query).bind(mySql.db)
        let getJobRoles="select roleName from job where id = ?";
        
        applicationmodel.find({"userId":userId}).lean().exec((err,res)=>
        {
            // console.log("applied jobs mongo response : ", typeof resp);
            // let dup_resp = []
            // resp = JSON.parse(JSON.stringify(resp));
            // console.log("nnn", JSON.parse(JSON.stringify(resp)))
            // console.log("legngth == ", resp.length)
            // // let promises = []
            // for(let i=0;i<resp.length;i++) {
            //     // promises.push(
            //     //     new Promise((resolve) => {
            //             query(getJobRoles,[resp[i].jobId])
            //             .then(result=>{
            //                 // result = JSON.parse(JSON.stringify(result))
            //                 console.log(typeof resp);
            //                 console.log("job role name: ", result[0].roleName)
            //                 resp[i].roleName = result[0].roleName;
            //                 console.log("updatdsbdhfds: ", resp[i].roleName)
            //             })
            //         // })
            //     // )
            // }
            console.log("mongodb response", res);
            let responseList=[]
            let respObj = res
            let jobIdsList=res.map(i=>i.jobId)
            console.log(jobIdsList)
            let getJobName="select * from  job where id in (?)"
            mySql.db.query(getJobName,[jobIdsList],function(err,resp)
            {
               
                if(resp)
                {
      
                //   client.del(JSON.stringify(redisKey))
                //   callback(null,{message:"Success"})
                console.log("Mysql resp" ,resp)
                for(a in res)
                { 
                    for(b in resp)
                    {
                        console.log("outside",resp[b])
                        console.log("res[a]",res[a].jobId)
                        console.log("idd",resp[b].roleName)
                       if(res[a].jobId ==resp[b].id)
                       {
                           respObj[a].name = resp[b].roleName
                           console.log(resp[b].roleName)
                           responseList.push(respObj[a])
                       }
                    }
                }
                console.log("After for loop",respObj)
                console.log("After for loop list",responseList)
                callback(null,responseList)
              
                }
                else
                {
                    console.log(err)
                    console.log("hello")
                }



            }
            )
            // callback(null, resp);
        });
        // applicationmodel.find({"userId":userId}).lean().exec(function(err, data){
        //     for(let i=0;i<data.length;i++) {
        //         query(getJobRoles,[data[i].jobId])
        //             .then(result=>{
        //                 // result = JSON.parse(JSON.stringify(result))
        //                 console.log(typeof data);
        //                 console.log("job role name: ", result[0].roleName)
        //                 data[i].roleName = result[0].roleName;
        //                 console.log("updatdsbdhfds: ", data[i].roleName)
        //             })
        //     }
        // });
    } catch(err){
        console.log(err)
        callback(err,null)
    }
}

exports.handle_viewAppliedJobs=handle_viewAppliedJobs