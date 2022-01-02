const Constants = require('../../utils/constants');
const C = new Constants();
const mongo = require('../../utils/mongo');
const MySqlHandler = require('../../utils/mySqlHandler');
const mySql = new MySqlHandler();
const PhotoServices = require('./photoServices');
const photoServices = new PhotoServices();
const ReviewServices = require('./reviewServices');
const reviewServices = new ReviewServices();


const CompanyServices = class {
    constructor() {
        console.log();
    }

    getCompany = async (msg, callback) => {
        console.log('-----------------------');
        console.log(msg);

        var response = await this._getCompany(msg);
        var photoResponse = await photoServices.getPhotoById(response['logoId']);
        response['logo'] = Object.keys(photoResponse).length > 0 ? photoResponse['url'] : "";
        photoResponse = await photoServices.getPhotoById(response['bannerId']);
        response['banner'] = Object.keys(photoResponse).length > 0 ? photoResponse['url'] : "";

        let allReviews = await reviewServices.getSnapshotReview({ 'companyId': response['id'], 'isFeatured': true });
        console.log("========================");
        console.log(allReviews);
        response['featuredReviews'] = allReviews;
        callback(null, response);
    }

    _getCompany = async (params) => {
        var query = 'SELECT * FROM company';
        var values = [];
        var clause = {};
        if ('id' in params) {
            clause['id'] = params.id;
        }
        if ('headquarters' in params) {
            clause['headquarters'] = params.headquarters;
        }
        if ('name' in params) {
            clause['name'] = params.name;
        }

        if (Object.keys(clause).length != 0) {
            query += ' WHERE'
            for (var key in clause) {
                query += ` ${key} = ? AND`;
                values.push(clause[key]);
            }
            var n = query.lastIndexOf(' AND');
            query = query.slice(0, n) + query.slice(n).replace(' AND', '');
        }

        return new Promise(function (resolve, reject) {
            mySql.db.query(query, values, (err, result) => {
                if (err) {
                    console.log(err);
                    resolve(err);
                } else {
                    resolve(result[0]);
                }
            });
        });
    }

    getCompanyList = async (msg, callback) => {
        var query = 'SELECT id, name FROM company';
        var values = [];

        return new Promise(function (resolve, reject) {
            mySql.db.query(query, values, (err, result) => {
                if (err) {
                    console.log(err);
                    callback(null, err);
                } else {
                    console.log("===============");
                    console.log(result);
                    callback(null, result);
                }
            });
        });
    }

    getAllCompany = async () => {
        var query = 'SELECT * FROM company';
        var values = [];

        return new Promise(function (resolve, reject) {
            mySql.db.query(query, values, (err, result) => {
                if (err) {
                    console.log(err);
                    resolve(err);
                } else {
                    resolve(result);
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

module.exports = CompanyServices;