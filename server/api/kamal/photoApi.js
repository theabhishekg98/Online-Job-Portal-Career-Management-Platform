const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const Constants = require('../../utils/constants');
const C = new Constants();
const mongo = require('../../utils/mongo');
const photos = require('../../models/photoModel');


const PhotoApi = class {
    constructor() {
        console.log();
    }

    getPhoto = (param) => {
        var query = {};
        if ('classId' in param) {
            query = { classId: param.classId };
        }

        return new Promise(function (resolve, reject) {
            photos.find(query, (error, data) => {
                if (data) {
                    resolve(JSON.parse(JSON.stringify(data)));
                }
                else if(error) {
                    console.log(error);
                }
                else {
                    resolve("Invalid Credentials");
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

    updateDish = (req, res) => {
        const query = { 'dishId': req.body.id };
        delete req.body['id'];

        dishes.findOneAndUpdate(query, req.body, { upsert: true }, function (err, doc) {
            if (err) return res.send(500, { error: err });
            res.status(200).send('Updated');
            res.end();
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

module.exports = PhotoApi;