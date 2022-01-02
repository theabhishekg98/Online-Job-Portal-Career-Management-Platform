const MySqlHandler = require('../../utils/mySqlHandler');
const util = require('util');
const mySqlHandler = new MySqlHandler();
const photoModel = require('../../models/photoModel')
async function handle_post_uploads(req,callback){
    console.log("entered here"+JSON.stringify(req.body));
mySqlHandler.db.query("INSERT INTO files (jobId,userId,resumefilename) VALUES (?,?,?)",[req.body.jobId,req.body.userId,req.body.filename],(err, result) => {
                if (err) {
                   console.log("err"+err);
                }
            });
            callback(null,req.body.filename);
    
}
async function handle_post_cover(req,callback){
    mySqlHandler.db.query("INSERT INTO files (jobId,userId,coverfilename) VALUES (?,?,?)",[req.body.jobId,req.body.userId,req.body.filename],(err, result) => {
                    if (err) {
                       console.log("err"+err);
                    }
                });
                callback(null,req.body.filename);
        
    }
async function handle_post_photo(req,callback){
    console.log("req.body"+JSON.stringify(req.body));
    var newPhoto = new photoModel({
        classId : req.body.classId,
        url : `https://273-indeed.s3.us-east-2.amazonaws.com/`+req.body.url
    });
    newPhoto.save((err,result)=>{
        if (err) { 
           console.log("error"+err);
        }
        if(result){
    console.log("result"+JSON.stringify(result));
    callback(null,req.body);
        }

});
    
}
async function handle_get_photo(req,callback){
    console.log("req.body picythjbkn"+JSON.stringify(req.params));
    photoModel.find({ $and: [
        {classId : req.params.data},{ status : "approved"}
    ]},(err,result)=>{
        if(err){
            console.log("error"+err);
        }
        else {
            console.log("result"+JSON.stringify(result));
            callback(null,result);
        }
    })
    
}

exports.handle_post_uploads = handle_post_uploads;
exports.handle_post_photo = handle_post_photo;
exports.handle_get_photo = handle_get_photo;
exports.handle_post_cover = handle_post_cover;
