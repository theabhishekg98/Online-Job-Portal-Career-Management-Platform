const MySqlHandler = require('../../utils/mySqlHandler');
const util = require('util');

async function handle_deleteResume(req,callback){
    try{
        console.log("reached handle delete resume");
        console.log(req);
        const mySql = new MySqlHandler();
        // mySql.db.connect();
        var query=util.promisify( mySql.db.query).bind(mySql.db)
        let userId = req.params.userId;
        console.log("handle get resume reuqest:", req);
        let deleteResumeQuery="DELETE from files where userId = ? and resumefilename is NOT NULL;"
        query(deleteResumeQuery,[userId]).then(result=>{
            // result = JSON.parse(JSON.stringify(result))
            console.log("delete query result 1: ", result)
            callback(null,result)
        })
    }catch(err){
        console.log(err)
        callback(err,null)
    }
    
}

exports.handle_deleteResume=handle_deleteResume