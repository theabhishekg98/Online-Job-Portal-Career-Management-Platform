const util = require('util');
var messageModel=require('../../models/messages')
async function handle_get_All_Chats(req,callback){
    try{
        if(req.params.userType==='emp'){
            console.log("Inside")
            messageModel.find({"employer.id":req.params.id}).then(result=>{
                callback(null,result)
            }).catch(err=>{
                callback(err,null)
            })
        }else if(req.params.userType==='user'){
            messageModel.find({"user.id":req.params.id}).then(result=>{
                callback(null,result)
            }).catch(err=>{
                callback(err,null)
            })
        }
    }catch(err){
        console.log(err)
        callback(err,null)
    }

    
}
async function handle_add_message(req,callback){
    try{
        let message={
            from:req.body.from,
             message:req.body.message
        }
        messageModel.findByIdAndUpdate(
            {_id:req.params.chatId},
            {$push:{message}},{new:true}
        ).then(result=>{
            callback(null,result)
        }).catch(err=>{
            callback(err,null)
        })
    }catch(err){
        console.log(err)
        callback(err,null)
    }
}
exports.handle_get_All_Chats=handle_get_All_Chats
exports.handle_add_message=handle_add_message