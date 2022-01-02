const Constants = require('../../utils/constants');
const MySqlHandler = require('../../utils/mySqlHandler');
const C = new Constants();
const mySql = new MySqlHandler();
const CompanyServices = require('./companyServices');
const companyServices = new CompanyServices();
const LocationServices = require('./locationServices');
const locationServices = new LocationServices();
// const ApplicationServices = require('./applicationServices');
// const applicationServices = new ApplicationServices();
const SaveServices = require('./saveServices');
const saveServices = new SaveServices();
const ReviewServices = require('./reviewServices');
const reviewServices = new ReviewServices();
const redis = require('redis');
const { hostIP } = require('../../utils/Redis-config');
const client = redis.createClient({
    host: hostIP
});
const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);

const jobServices = class {
    constructor() {
    }

    getJobs = async (msg, callback) => {
        console.log('-----------------------');
        console.log(msg);

        var params = msg;
        if ('companyName' in params) {
            let response = await companyServices._getCompany({ 'name': params.companyName });
            params['companyId'] = response['id'];
        }

        // if ('city' in params) {
        //     let response = await locationServices.getLocation({ 'city': params.city });
        //     console.log(response);
        //     params['locationId'] = response[0]['_id'];
        // }

        let response = await this._getJobs(params);
        var totalJobs = await this._getTotalJobs2(params);
        var companyResponse = await companyServices.getAllCompany();
        var allCompany = {};
        for (var company of companyResponse) {
            allCompany[company['id']] = company;
        }

        for (var ele of response) {
            ele['totalJobs'] = totalJobs;
            if (ele['companyId']) {
                ele['company'] = allCompany[ele['companyId']];
                // var companyResponse = await companyServices._getCompany({ 'id': ele['companyId'] });
                // ele['company'] = Object.keys(companyResponse).length > 0 ? companyResponse : {};
            }

            if ('userId' in params) {
                var saveStatus = await saveServices.getSaveStatus({ 'jobId': ele['id'], 'userId': params.userId });
                ele['isSaved'] = saveStatus;
            }

            let responses = await reviewServices.getReview({ 'companyId': ele['companyId'] });
            ele['totalReviews'] = responses.length;
            ele['averageRating'] = this.getAverageRating(responses)
        }

        callback(null, response);
    }

    _getJobs = async (params) => {
        console.log(params);
        var query = 'SELECT * FROM job';
        var values = [];
        var clause = {};
        if ('id' in params) {
            clause['id'] = params.id;
        }
        if ('companyId' in params) {
            clause['companyId'] = params.companyId;
        }
        if ('locationId' in params) {
            clause['locationId'] = params.locationId;
        }
        if ('roleName' in params) {
            clause['roleName'] = params.roleName;
        }
        if ('city' in params) {
            clause['city'] = params.city;
        }

        if (Object.keys(clause).length != 0) {
            query += ' WHERE'
            for (var key in clause) {
                if (key == 'roleName') {
                    query += ` ${key} LIKE "${clause[key]}%" AND`;
                } else {
                    query += ` ${key} = ? AND`;
                    values.push(clause[key]);
                }
            }
            var n = query.lastIndexOf(' AND');
            query = query.slice(0, n) + query.slice(n).replace(' AND', '');
        } query += ' LIMIT 3 OFFSET '+ params.offset;

        return new Promise(function (resolve, reject) {
            console.log(query);
            mySql.db.query(query, values, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        // return new Promise(function (resolve, reject) {
        //     console.log(query)
        //     let redisKey = {
        //         topic: "getAllJobs",
        //     }
        //     getAsync(JSON.stringify(redisKey)).then(data => {
        //         if (data) {
        //             console.log('Jobs retrieved from Redis');
        //             resolve(JSON.parse(data))
        //             // callback(null, data)
        //         } else {
        //             mySql.db.query(query, values, (err, result) => {
        //                 if (err) {
        //                     console.log(err);
        //                     reject(err);
        //                 } else {
        //                     console.log("set jobs in redis")
        //                     client.setex(JSON.stringify(redisKey), 500, JSON.stringify(result))
        //                     resolve(result);
        //                 }
        //             });
        //         }
        //     })
        // });
    }

    _getTotalJobs = async () => {
        var query = 'SELECT COUNT(*) as count FROM job';
        var values = [];

        return new Promise(function (resolve, reject) {
            mySql.db.query(query, values, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(result[0].count);
                }
            });
        });
    }

    _getTotalJobs2 = async (params) => {
        console.log(params);
        var query = 'SELECT COUNT(*) as count FROM job';
        var values = [];
        var clause = {};
        if ('id' in params) {
            clause['id'] = params.id;
        }
        if ('companyId' in params) {
            clause['companyId'] = params.companyId;
        }
        if ('locationId' in params) {
            clause['locationId'] = params.locationId;
        }
        if ('roleName' in params) {
            clause['roleName'] = params.roleName;
        }
        if ('city' in params) {
            clause['city'] = params.city;
        }

        if (Object.keys(clause).length != 0) {
            query += ' WHERE'
            for (var key in clause) {
                if (key == 'roleName') {
                    query += ` ${key} LIKE "${clause[key]}%" AND`;
                } else {
                    query += ` ${key} = ? AND`;
                    values.push(clause[key]);
                }
            }
            var n = query.lastIndexOf(' AND');
            query = query.slice(0, n) + query.slice(n).replace(' AND', '');
        }

        return new Promise(function (resolve, reject) {
            console.log(query);
            mySql.db.query(query, values, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(result[0].count);
                }
            });
        });

        // return new Promise(function (resolve, reject) {
        //     console.log(query)
        //     let redisKey = {
        //         topic: "getAllJobs",
        //     }
        //     getAsync(JSON.stringify(redisKey)).then(data => {
        //         if (data) {
        //             console.log('Jobs retrieved from Redis');
        //             resolve(JSON.parse(data))
        //             // callback(null, data)
        //         } else {
        //             mySql.db.query(query, values, (err, result) => {
        //                 if (err) {
        //                     console.log(err);
        //                     reject(err);
        //                 } else {
        //                     console.log("set jobs in redis")
        //                     client.setex(JSON.stringify(redisKey), 500, JSON.stringify(result))
        //                     resolve(result);
        //                 }
        //             });
        //         }
        //     })
        // });
    }

    getAverageRating = (params) => {
        if (params.length <= 0) {
            return 0;
        }
        var sum = 0, count = 0;
        for (var ele of params) {
            var rating = parseInt(ele['overallRating']);
            sum += ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(rating)) ? rating : 0;
            count += 1;
        }
        return (sum / count).toFixed(1);
    }

}


module.exports = jobServices;