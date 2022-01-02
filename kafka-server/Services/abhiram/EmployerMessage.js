const mongo = require('../../utils/mongo');
const MySqlHandler = require('../../utils/mySqlHandler');
const mySql = new MySqlHandler();
const application= require('../../models/applicationModel')
const messagemodel = require('../../models/messages')
let locationModel = require('../../models/locationModel')



async function PostMessage(msg,callback)
{
console.log("In Post Message")
console.log(msg)
    let req = { body:{...msg}}

    var newmessage = new messagemodel(
        {
            user: {
                id: req.body.userId,
                name: req.body.username
            },
            employer: {
                id: (req.body.empId).toString(),
                name:  req.body.empname
            },
            message:{from:"emp",message:req.body.msg}
        }
    )

    newmessage.save((err, data) => {
        if (err) {
            console.log(err)
            // res.send("err")
            callback(null,"err")
        }
        else {
            // res.send("success")
            callback(null,"success")
        }

    })



}


async function checkMessages(msg,callback)
{
    let req = {params:{...msg}}

    messagemodel.find({"user.id":req.params.userId},(err,resp)=>
    {
        if(resp && resp.length>0)
        {
            console.log(resp)
          for(a in resp)
          {
              if(resp[a].user.id == req.params.userId && resp[a].employer.id == req.params.empId)
              {
                //   res.send({
                //       status:"exists"
                //   })
                  callback(null,{status:"exists"})
                  break
              }
              else
              {
                //   res.send({
                //       status:"none"
                //   })
                  callback(null,{status:"none"})
              }
          }



        }
        else
        {
 
            callback(null,{status:"none  "})
            console.log(err)
        }
    })





}



exports.checkMessages = checkMessages
exports.PostMessage = PostMessage