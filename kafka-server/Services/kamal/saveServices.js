const Constants = require('../../utils/constants');
const C = new Constants();
const mongo = require('../../utils/mongo');
const save = require('../../models/saveModel');


const SaveServices = class {
    constructor() {
        console.log();
    }

    getApplication = async(msg, callback) => {
        var query = {};
        if ('userId' in msg) {
            query['userId'] = msg.userId;
        }
        if ('jobId' in msg) {
            query['jobId'] = msg.jobId;
        }

        return new Promise(function (resolve, reject) {
            save.find(query, (error, data) => {
                if (data) {
                    callback(null, JSON.parse(JSON.stringify(data)));
                }
                else if (error) {
                    console.log(error);
                }
                else {
                    callback(null, "Invalid Credentials");
                }
            });
        });
    }

    getSaveStatus = (params) => {
        console.log(params);
        var query = {};
        if ('userId' in params) {
            query['userId'] = params.userId;
        }
        if ('jobId' in params) {
            query['jobId'] = params.jobId;
        }

        return new Promise(function (resolve, reject) {
            save.find(query, (error, data) => {
                if (data) {
                    data = JSON.parse(JSON.stringify(data));
                    // console.log(data);
                    if(data.length <= 0){
                        resolve("false");
                    }
                    for(var ele of data){
                        if(ele['status'] == 'saved'){
                            resolve("true");
                        }
                    }
                    resolve("false");
                }
                else if (error) {
                    console.log(error);
                }
                else {
                    resolve("Invalid Credentials");
                }
            });
        });
    }

    addApplication = (msg, callback) => {
        console.log(msg);
        var data = new save({
            userId: msg.userId,
            jobId: msg.jobId,
            roleName: msg.roleName,
            status: msg.status
        });

        return new Promise(function (resolve, reject) {
            data.save((error, value) => {
                if (error) return reject(error);
                callback(null, 'Added');
            });
        });
    }

    deleteApplication = (msg, callback) => {
        console.log(msg);
        var query = {};
        if (!('userId' in msg) && !('jobId' in msg) && !('status' in msg)) {
            callback(null, "Missing Parameters");
        }
        
        query['userId'] = msg.userId;
        query['jobId'] = msg.jobId;
        query['status'] = msg.status;

        return new Promise(function (resolve, reject) {
            save.deleteOne(query, (error) => {
                if (error) {
                    callback(null, error);
                }
                callback(null, "Deleted");
            });
        });
    }

    mongoError = (error) => {
        if (error) {
            console.log(error);
            reject(error);
        }
    }

    mongoErrorDuplicate = (obj) => {
        if (obj) {
            reject(`ID already exists for ${obj}`);
        }
    }
}

module.exports = SaveServices;