const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const Constants = require('../../utils/constants');
const C = new Constants();
const mongo = require('../../utils/mongo');
const location = require('../../models/locationModel');


const LocationApi = class {
    constructor() {
        console.log();
    }

    getLocation = (params) => {
        var query = {};
        if ('city' in params) {
            query = { city: params.city };
        }

        return new Promise(function (resolve, reject) {
            location.find(query, (error, data) => {
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

    getLocationById = (_id) => {
        return new Promise(function (resolve, reject) {
            location.findById(_id, (error, data) => {
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

module.exports = LocationApi;