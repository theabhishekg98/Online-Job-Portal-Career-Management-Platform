const MySqlHandler = require('../../utils/mySqlHandler');
const util = require('util');
const mongoose = require('../../utils/mongo');
var reviewModel = require('../../models/reviewModel');

mongoose

async function handle_getAverageSalaryForRole(req,callback){
    try{
        console.log("reached kafka (average salary) read");
        console.log(req);
        const mySql = new MySqlHandler();
        // mySql.db.connect();
        var query=util.promisify( mySql.db.query).bind(mySql.db)
        let {roleName, city}=req.body;
        if(roleName != undefined && city != undefined) {
            let findAvgSal="select ROUND(AVG(Salary),-1) as averageSalary from job where roleName like CONCAT('%', ?, '%') and city like CONCAT('%', ?, '%')";
            
            query(findAvgSal,[roleName,city]).then(result=>{
                console.log("query result 1: ", result)
                callback(null,result[0].averageSalary)
            })
        }
        else if(roleName != undefined) {
            let findAvgSal="select ROUND(AVG(Salary),-1) as averageSalary from job where roleName like CONCAT('%', ?, '%')";
            query(findAvgSal,[roleName]).then(result=>{
                console.log("query result 2: ", result)
                console.log(typeof result[0].averageSalary);
                callback(null,result[0].averageSalary)
            })
        }
        else if(city != undefined) {
            let findAvgSal="select ROUND(AVG(Salary),-1) as averageSalary from job where city like CONCAT('%', ?, '%')";
            query(findAvgSal,[city]).then(result=>{
                console.log("query result 2: ", result)
                console.log(typeof result[0].averageSalary);
                callback(null,result[0].averageSalary)
            })
        }
        
    }catch(err){
        console.log(err)
        callback(err,null)
    }
}

async function handle_getTopFiveSalariesForRole(req,callback){
    try{
        console.log("reached kafka (top 5 salaries) read");
        console.log(req);
        const mySql = new MySqlHandler();
        // mySql.db.connect();
        var query=util.promisify( mySql.db.query).bind(mySql.db)
        let {roleName, city}=req.body;

        if(roleName != undefined && city != undefined) {
            let findTopFive="select c.name, ROUND(AVG(Salary),-1) as avg from job as j join company as c on c.id = j.companyId where roleName like CONCAT('%', ?, '%') and city like CONCAT('%', ?, '%') GROUP BY c.name ORDER BY salary DESC LIMIT 5";
            query(findTopFive,[roleName,city]).then(result=>{
                console.log("query result 1: ", result)
                callback(null,result)
            })
        }
        else if(roleName != undefined) {
            let findTopFive="select c.name, ROUND(AVG(Salary),-1) as avg from job as j join company as c on c.id = j.companyId where roleName like CONCAT('%', ?, '%') GROUP BY c.name ORDER BY salary DESC LIMIT 5";
            query(findTopFive,[roleName]).then(result=>{
                console.log("query result 2: ", result)
                callback(null,result)
            })
        }
        else if(city != undefined) {
            let findTopFive="select c.name, ROUND(AVG(Salary),-1) as avg from job as j join company as c on c.id = j.companyId where city like CONCAT('%', ?, '%') GROUP BY c.name ORDER BY salary DESC LIMIT 5";
            query(findTopFive,[city]).then(result=>{
                console.log("query result 3: ", result)
                callback(null,result)
            })
        }
        

    }catch(err){
        console.log(err)
        callback(err,null)
    }
}


exports.handle_getAverageSalaryForRole=handle_getAverageSalaryForRole
exports.handle_getTopFiveSalariesForRole=handle_getTopFiveSalariesForRole