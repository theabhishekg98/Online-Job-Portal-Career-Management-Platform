const mongoose = require('../../utils/mongo');
var reviewModel = require('../../models/reviewModel');
const MySqlHandler = require('../../utils/mySqlHandler');
const util = require('util');

mongoose

async function handle_getSearchedCompanyReviews(req,callback){
    try{
        console.log("reached handle get searched companies kafka");
        console.log(req);
        const mySql = new MySqlHandler();
        // mySql.db.connect();
        var query=util.promisify( mySql.db.query).bind(mySql.db)
        let {roleName, city}=req.body;
        console.log("rolename:", roleName);
        console.log("city:",city);
        if(roleName != undefined && city != undefined) {
            let getCompanyQuery="SELECT * FROM company where name like CONCAT('%', ?, '%') and headquarters like CONCAT('%', ?, '%')"; //= (select companyId from job where roleName=? and city=?)";
            query(getCompanyQuery,[roleName,city]).then(result=>{
                result = JSON.parse(JSON.stringify(result))
                console.log("query result 1: ", result)
                callback(null,result)
            })
        }
        else if(roleName != undefined) {
            let getCompanyQuery="SELECT * FROM company where name like CONCAT('%', ?, '%')";
            query(getCompanyQuery,[roleName]).then(result=>{
                result = JSON.parse(JSON.stringify(result))
                console.log("query result 2: ", result)
                callback(null,result)
            })
        }
        else if(city != undefined) {
            let getCompanyQuery="SELECT * FROM company where headquarters like CONCAT('%', ?, '%')";
            query(getCompanyQuery,[city]).then(result=>{
                result = JSON.parse(JSON.stringify(result))
                console.log("query result 3: ", result)
                callback(null,result)
            })
        }
        
    }catch(err){
        console.log(err)
        callback(err,null)
    }
    
}

async function handle_getAllCompanyReviews(req,callback){
    try{
        console.log("reached handle get all companies kafka");
        console.log("req =", req);
        const mySql = new MySqlHandler();
        // mySql.db.connect();
        var query=util.promisify( mySql.db.query).bind(mySql.db)
       
        let getAllCompanyQuery="SELECT * FROM company ORDER BY id LIMIT 5";
        query(getAllCompanyQuery).then(result=>{
            result = JSON.parse(JSON.stringify(result))
            console.log("query result 1: ", result)
            callback(null,result)
        })

    }catch(err){
        console.log(err)
        callback(err,null)
    }
}

exports.handle_getSearchedCompanyReviews=handle_getSearchedCompanyReviews
exports.handle_getAllCompanyReviews=handle_getAllCompanyReviews