const bcrypt = require('bcrypt');
const Constants = require('../../utils/constants');
const C = new Constants();
const mongo = require('../../utils/mongo');
const MySqlHandler = require('../../utils/mySqlHandler');
const mySql = new MySqlHandler();
const PhotoServices = require('./photoServices');
const photoServices = new PhotoServices();
const saltRounds = 10;


const UserServices = class {
    constructor() {
        console.log();
    }

    addUser = async (msg, callback) => {
        await this._addUser(msg);
        var userId = await this.getUserID(msg);
        if (msg.userType == 'admin') {
            await this._addAdmin({ 'userId': userId });
        } else if (msg.userType == 'employer') {
            await this._addEmployer({ 'userId': userId, 'companyId': msg.companyId});
        } else {
            await this._addJobSeeker({ 'userId': userId });
        }

        callback(null, 'User added');
    }

    _addUser = async (params) => {        
        var hashedPassword = await bcrypt.hash(params.password, saltRounds);

        return new Promise(function (resolve, reject) {
            mySql.db.query(
                "INSERT INTO user (firstName, lastName, email, password, userType) VALUES (?,?,?,?,?)",
                [params.firstName, params.lastName, params.email, hashedPassword, params.userType], (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        resolve('User added');
                    }
                });
        });
    }

    getUserID = async (params) => {
        console.log('-----------------------');
        console.log(params);

        var query = 'SELECT * FROM user WHERE email = ?';
        var values = [params.email];
        console.log(values);

        return new Promise(function (resolve, reject) {
            mySql.db.query(query, values, (err, result) => {
                if (err) {
                    console.log(err);
                    resolve(err);
                } else {
                    resolve(result[0].id);
                }
            });
        });
    }

    _addJobSeeker = async (params) => {
        console.log('jobseeker-----------------------');
        console.log(params);

        return new Promise(function (resolve, reject) {
            mySql.db.query("INSERT INTO jobSeeker (userId) VALUES (?)",
                [params.userId], (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        resolve('Job Seeker added');
                    }
                });
        });
    }

    _addEmployer = async (params) => {
        console.log('employer-----------------------');
        console.log(params);

        return new Promise(function (resolve, reject) {
            mySql.db.query("INSERT INTO employer (userId, companyId) VALUES (?,?)",
                [params.userId, params.companyId], (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        resolve('Employer added');
                    }
                });
        });
    }

    _addAdmin = async (params) => {
        console.log('admin-----------------------');
        console.log(params);

        return new Promise(function (resolve, reject) {
            mySql.db.query("INSERT INTO admin (userId) VALUES (?)",
                [params.userId], (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        resolve('Admin added');
                    }
                });
        });
    }

    mongoError = (callback, error) => {
        if (error) {
            console.log(error);
            callback(null, error)
        }
    }

    mongoErrorDuplicate = (callback, obj) => {
        if (obj) {
            callback(null, `ID already exists for ${obj}`)
        }
    }
}

module.exports = UserServices;