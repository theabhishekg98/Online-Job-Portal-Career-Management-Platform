const mongo = require('../../utils/mongo');
const MySqlHandler = require('../../utils/mySqlHandler');
const mySql = new MySqlHandler();
const application = require('../../models/applicationModel')
let locationModel = require('../../models/locationModel')
const redis = require('redis');
const { hostIP } = require('../../utils/Redis-config');
const client = redis.createClient({
    host:hostIP
});
const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);

async function EmppostJobs(msg,callback)

{
    console.log(msg)
    let req = {body:{...msg}}
    let redisKey = {
      topic: "getAllJobs",
  }
    let InsertJob=(location)=>{

        let query = "INSERT into job(empId,companyId,locationId,JobTitle,Industry,jobType,JobMode,Salary,city,state,roleName,description,whatYouWillDo,whatYouWillNeed,whatYouWillLove,qualifications,responsibilities,street,country,zipCode) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
        
        console.log(req.body)
        
        
         mySql.db.query(query,[req.body.empId,req.body.companyId,location,req.body.JobTitle,req.body.industry,req.body.jobtype,req.body.jobMode,req.body.Salary,req.body.city,req.body.state,req.body.roleName,req.body.description,req.body.whatYouWillDo,req.body.whatYouWillNeed,req.body.whatYouWillLove,req.body.qualifications,req.body.responsibilities,req.body.street,req.body.country,req.body.zipCode],function(err,resp)
         {
          
           console.log(resp)
          if(resp)
          {

            client.del(JSON.stringify(redisKey))
            callback(null,{message:"Success"})
        
          }
          else
          {
            console.log(err)
    
              callback({"error":err})
          }
        
         }
         )
        
        
        }   
      
        
      //Inserting the location in location table first and then calling the function to insert into Mysql Job Table 
    
    //   var newlocation = new locationModel(
    //       {
    //         street: req.body.street,
    //         city: req.body.city,
    //         state: req.body.state,
    //         country: req.body.country,
    //         zipCode: req.body.zipCode
    //       }
    //   )
    
    // await  newlocation.save((err,data)=>
    //   {
       
    //     if(err)
    //         {
    //             callback({"error":err})
                  
    //         }
    //         else
    //         {
        
    //             location = data.id
    //             console.log(location)
    //             InsertJob(location)
                 
    //         }
      
    // }
    // )


  


  //Inserting the location in location table first and then calling the function to insert into Mysql Job Table 

  var newlocation = new locationModel(
    {
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      zipCode: req.body.zipCode
    }
  )

  await newlocation.save((err, data) => {

    if (err) {
      callback({ "error": err })

    }
    else {

      location = data.id
      console.log(location)
      InsertJob(location)

    }
  }
  )
}

async function GetJobs(msg, callback) {
  console.log("in here")
  console.log(msg)
  let req = { params: { ...msg } }
  let empId = req.params.empId
  let query = "SELECT * FROM job where empId=?"
  console.log("In Get Jobs")
  
  mySql.db.query(query, [empId], async function (err, resp) {

    let responseobj = []
    let promises = []
    if (resp) {
      for (let a in resp) {
        promises.push(
          new Promise((resolve) => {
            let jobId = resp[a].id
            application.find({ jobId: jobId }).lean().exec((err, resa) => {
              if (resa) {
                resp[a].Applicants = resa

                responseobj.push(resp[a])
                resolve()
              }

            })

          }))

      }
      Promise.all(promises).then((data) => {
        //  res.status(200).send(responseobj)
        callback(null, { responseobj })
      })

    }
  })
  

}

async function GetCompanyName(msg, callback) {

  let req = { params: { ...msg } }


  let query = "Select * from company where id=?"

  mySql.db.query(query, [req.params.id], function (err, resp){

   if(resp)
   {
     callback(null,resp)
   }
   else
   {
     callback(null,"error")
   }



  })
}
  
  
  
  // {
  //   console.log(resp)
  //   if (resp) {
  //     callback(null, resp)
  //   }
  //   else {
  //     callback(null, "error")
  //   }
  // }
  // )





 exports.GetCompanyName =  GetCompanyName
  exports.GetJobs = GetJobs

  exports.EmployeePostJob = EmppostJobs
