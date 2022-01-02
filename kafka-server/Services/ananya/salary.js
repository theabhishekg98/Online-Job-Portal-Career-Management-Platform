const MySqlHandler = require('../../utils/mySqlHandler');
const util = require('util');
const mySqlHandler = new MySqlHandler();

async function handle_post_salary(req,callback){
  
var num = 0;
if(req.params.currently_working=='Yes'){
    num =1;
}
mySqlHandler.db.query("INSERT INTO salary (company_name,currently_working,job_title,salary,locationId,experience,benifits,otherbenefits,enddate) VALUES (?,?,?,?,?,?,?,?,?)",
[req.params.company_name,
    num,
    req.params.job_title,
    req.params.salary,
    req.params.locationId,
    req.params.experience,
    req.params.benifits,
    req.params.otherbenefits,
    req.params.enddate],(err,result)=>{
    if(err){
        console.log(err);
        callback(err,null);
    }
    else if(result){
        callback(null,"SUCCESS");
// res.send(JSON.stringify("SUCCESS"));
    }
})

    
}
exports.handle_post_salary = handle_post_salary











 