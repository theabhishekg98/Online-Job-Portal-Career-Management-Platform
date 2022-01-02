const MySqlHandler = require('../../utils/mySqlHandler');
const util = require('util');

async function handle_getUserProfile(req,callback){
    try{
        const mySql = new MySqlHandler();
        // mySql.db.connect();
        // console.log("eroefkdslkdnfjfd", req.params.userId);
        let getUserProfile="select * from user where id=?"
        var query=util.promisify( mySql.db.query).bind(mySql.db)
        query(getUserProfile,req.params.userId).then(result=>{
            console.log("this is ahndle:", result)
            callback(null,result)
        })
    }catch(err){
        console.log(err)
        callback(err,null)
    }
}

async function handle_saveUserProfile(req,callback){
    try{
        const mySql = new MySqlHandler();
        // mySql.db.connect();
        console.log("request data to updte user profile:", req);
        let getUserProfile="update user SET firstName=?, lastName=?, city=?, state=?, country=?, zip=? WHERE id=?";
        var query=util.promisify( mySql.db.query).bind(mySql.db)
        query(getUserProfile,[req.body.fname,req.body.lname,req.body.city,req.body.state, req.body.country, req.body.zip, req.params.userId]).then(result=>{
            console.log(result)
            callback(null,result)
        })
    }catch(err){
        console.log(err)
        callback(err,null)
    }
}

exports.handle_getUserProfile=handle_getUserProfile
exports.handle_saveUserProfile=handle_saveUserProfile