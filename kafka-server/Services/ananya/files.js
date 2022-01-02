const MySqlHandler = require('../../utils/mySqlHandler');
const util = require('util');
const mySqlHandler = new MySqlHandler();
async function handle_get_files(req,callback){
    var data = req.params.data.split(' ');
    console.log("entered here"+JSON.stringify(data));
    mySqlHandler.db.query("SELECT resumefilename FROM files WHERE jobID=? AND userId =? AND resumefilename IS NOT NULL ORDER BY idfiles DESC LIMIT 1",[data[0],data[1]],(err,result)=>{
        if(err){
            console.log("err"+err);
            callback(err,null)
        }
        else{
            console.log("res1234567890"+JSON.stringify(result));
            callback(null,result)
        }
    })

    
}
async function handle_get_cover(req,callback){
    var data = req.params.data.split(' ');
    console.log("entered here"+JSON.stringify(data));
    mySqlHandler.db.query("SELECT coverfilename FROM files WHERE jobID=? AND userId =? AND coverfilename IS NOT NULL ORDER BY idfiles DESC LIMIT 1",[data[0],data[1]],(err,result)=>{
        if(err){
            console.log("err"+err);
            callback(err,null)
        }
        else{
            console.log("cover"+JSON.stringify(result));
            callback(null,result)
        }
    })

    
}
exports.handle_get_files = handle_get_files
exports.handle_get_cover = handle_get_cover