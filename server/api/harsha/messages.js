var kafka = require('../../kafka/client');

async function getAllchats(req,res){
    let payload = {
        params: req.params,
        body: req.body
    }
    kafka.make_request('getChats', payload, function (err, results) {
        console.log("Make request to get chats ");
        // console.log(results);
        if (err) {
            console.log("Inside err",err);
            res.status(500).send({ "error": err });
        } else {
            res.status(200).send(results)
        }
    })



}

async function getMessagesByChatId(req,res){
    let payload = {
        params: req.params,
        body: req.body
    }
    kafka.make_request('getMessages', payload, function (err, results) {
        console.log("Make request to get messages ");
        // console.log(results);
        if (err) {
            console.log("Inside err",err);
            res.status(500).send({ "error": err });
        } else {
            res.status(200).send(results)
        }
    })



}

async function addMessage(req,res){
    let payload = {
        params: req.params,
        body: req.body
    }
    kafka.make_request('addMessage', payload, function (err, results) {
        console.log("Make request to add messages ");
        // console.log(results);
        if (err) {
            console.log("Inside err",err);
            res.status(500).send({ "error": err });
        } else {
            res.status(200).send(results)
        }
    })
}

exports.getAllchats=getAllchats
exports.getMessagesByChatId=getMessagesByChatId
exports.addMessage=addMessage