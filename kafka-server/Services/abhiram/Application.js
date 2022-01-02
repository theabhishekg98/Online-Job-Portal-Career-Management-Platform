const mongo = require('../../utils/mongo');
const MySqlHandler = require('../../utils/mySqlHandler');
const mySql = new MySqlHandler();

let applicationmodel = require('../../models/applicationModel')




async function handleUpdateApplication(req,callback){

    console.log("Inside app update")
console.log(req)
callback(null,"success")

applicationmodel.updateOne({_id:req.id},{$set:{status:req.status}},(err,resp)=>
{
    if(resp)
    {
    
    callback(null,{message:"Success"})


    }
})



 }


exports.handlepdateApplication = handleUpdateApplication