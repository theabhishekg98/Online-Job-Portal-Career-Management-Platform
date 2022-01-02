const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const fs = require("fs");
const path = require('path');
// const AWSS3 = require('../utils/awss3.js');
// let awss3Obj = new AWSS3();
// const multer = require('multer');
// const { resolve } = require("path");
const Constants = require('../../utils/constants');
const C = new Constants();
// const mongo = require('../utils/mongo');
// const users = require('../../models/userModel');
const jwt = require('jsonwebtoken');
// const { auth } = require('../utils/passport');
// auth();


const K_UserApi = class {
    constructor() {
        console.log();
    }

    getUser = (req, res) => {
        console.log(req.body);
        var isLogin = false;
        var query = {};

        if ('id' in req.body) {
            query = { userId: req.body.id };
        } else if ('email' in req.body && 'password' in req.body) {
            query = { email: req.body.email, password: req.body.password };
            isLogin = true;
        }

        users.find(query, (error, doc) => {
            this.mongoError(res, error);

            if (doc) {
                var data = JSON.parse(JSON.stringify(doc));
                if (isLogin) {
                    const payload = { userId: data[0].userId, email: data[0].email };
                    const token = jwt.sign(payload, C.JWT.Secret, { expiresIn: 1008000 });
                    data[0]['token'] = "JWT " + token;
                }

                res.status(200).send(data);
                res.end();
            }
            else {
                res.status(401).send("Invalid Credentials");
                res.end();
            }
        });
    }

    mongoError = (res, error) => {
        if (error) {
            console.log(error);
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            })
            res.end();
        }
    }

    mongoErrorDuplicate = (res, obj) => {
        if (obj) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end(`ID already exists for ${obj}`);
        }
    }
}

module.exports = K_UserApi;