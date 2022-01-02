const MySqlHandler = require('../../utils/mySqlHandler');
const util = require('util');

async function handle_getResume(req,callback){
    try{
        console.log("reached handle get resume");
        console.log(req);
        const mySql = new MySqlHandler();
        // mySql.db.connect();
        var query=util.promisify( mySql.db.query).bind(mySql.db)
        let userId = req.params.userId;
        // console.log("hgahgahghgashgaha:", req);
        let deleteResumeQuery="select resumefilename from files where userId = ? and resumefilename is NOT NULL;"
        query(deleteResumeQuery,[userId]).then(result=>{
            // result = JSON.parse(JSON.stringify(result))
            console.log("get query result 1: ", result)
            callback(null,result)
        })
    }catch(err){
        console.log(err)
        callback(err,null)
    }
    
}

exports.handle_getResume=handle_getResume