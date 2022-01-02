const Constants = require('../../utils/constants');
const C = new Constants();
const mongo = require('../../utils/mongo');
const review = require('../../models/reviewModel');


const ReviewServices = class {
    constructor() {
        console.log();
    }

    getReview = (params) => {
        var query = {};
        if ('companyId' in params) {
            query['companyId'] = params.companyId+"";
        }
        if ('isFeatured' in params) {
            query['isFeatured'] = params.isFeatured;
        }

        return new Promise(function (resolve, reject) {
            review.find(query, (error, data) => {
                if (data) {
                    resolve(JSON.parse(JSON.stringify(data)));
                }
                else {
                    resolve("something went wrong");
                }
            });
        });
    }

    getSnapshotReview = async (params) => {
        var negativeReview = await this.getNegativeReview(params);
        var featuredReview = await this.getFeaturedReview(params);
        return negativeReview.concat(featuredReview);
    }
    
    getNegativeReview = async (params) => {
        console.log("----------", params);
        var query = {};
        if ('companyId' in params) {
            query['companyId'] = params.companyId + "";
        }
        query['overallRating'] = { $lte: "2" };

        return new Promise(function (resolve, reject) {
            review.find(query, (error, data) => {
                // this.mongoError(callback, error);

                if (data) {
                    resolve(JSON.parse(JSON.stringify(data)));
                }
                else {
                    resolve("something went wrong");
                }
            }).limit(1);
        });
    }

    getFeaturedReview = async (params) => {
        var query = {};
        if ('companyId' in params) {
            query['companyId'] = params.companyId + "";
        }
        if ('isFeatured' in params) {
            query['isFeatured'] = true;
        }

        return new Promise(function (resolve, reject) {
            review.find(query, (error, data) => {
                if (data) {
                    resolve(JSON.parse(JSON.stringify(data)));
                }
                else {
                    resolve("something went wrong");
                }
            }).limit(4);
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

module.exports = ReviewServices;