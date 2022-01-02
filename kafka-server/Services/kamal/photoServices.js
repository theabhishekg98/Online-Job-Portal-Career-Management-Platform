const Constants = require('../../utils/constants');
const C = new Constants();
const mongo = require('../../utils/mongo');
const photos = require('../../models/photoModel');


const PhotoServices = class {
    constructor() {
        console.log();
    }

    getPhoto = (msg, callback) => {
        var query = {};
        if ('classId' in msg) {
            query = { classId: msg.classId };
        }

        return new Promise(function (resolve, reject) {
            photos.find(query, (error, data) => {
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

    getPhotoById = (_id) => {
        return new Promise(function (resolve, reject) {
            photos.findById(_id, (error, data) => {
                if (data) {
                    resolve(JSON.parse(JSON.stringify(data)));
                }
                else if (error) {
                    resolve([]);
                    // console.log(error);
                }
                else {
                    resolve("Invalid Credentials");
                }
            });
        });
    }

    addPhoto = (param) => {
        var data = new photos({
            classId: param.classId,
            url: param.url,
        });

        return new Promise(function (resolve, reject) {
            data.save((error, value) => {
                if (error) return reject(error);
                resolve('Added');
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

module.exports = PhotoServices;