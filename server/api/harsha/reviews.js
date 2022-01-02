var reviewModel = require("../../models/reviewModel");
var Fakerator = require("fakerator");
var fakerator = Fakerator("de-DE");
const redis = require('redis');
const { hostIP } = require("../../utils/Redis-config");
// const client = redis.createClient({
//     host:hostIP
// });
var kafka = require('../../kafka/client');
/**
 * Get All reviews without any caching/kafka
 * @param {*} req 
 * @param {*} res 
 */
// async function getAllReviews(req, res) {
//     try {
//         reviewModel.find().then(result => {
//             res.send(result)
//         })
//     } catch (err) {
//         console.log(err);
//         res.status(500).send(err);
//     }
// }
/**
 * Get all reviews with only caching
 * @param {*} req 
 * @param {*} res 
 */
async function getAllReviewsWithCaching(req, res) {
    try {
        client.get('reviews', (err, data) => {
            if (err) {
                console.error(err);
                throw err;
            }

            if (data) {
                console.log('Reviews retrieved from Redis');
                res.status(200).send(JSON.parse(data));
            } else {
                reviewModel.find().then(result => {
                    client.setex('reviews',500,JSON.stringify(result))
                    res.send(result)
                })
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}
/**
 * Get All reviews with kafka and caching
 * @param {*} req 
 * @param {*} res 
 */
async function getAllReviews(req, res) {
    let payload = {
        params: req.params,
        body: req.body
    }
    kafka.make_request('getReviewsTopic', payload, function (err, results) {
        console.log("Make request to get reviews");
        // console.log(results);
        if (err) {
            console.log("Inside err",err);
            res.status(500).send({ "error": err });
        } else {
            res.status(200).send(results)
        }
    })
}

async function updateFeaturedReview(req,res){
    let payload = {
        params: req.params,
        body: req.body
    }
    kafka.make_request('updateFeaturedReview', payload, function (err, results) {
        console.log("Make request to get reviews");
        // console.log(results);
        if (err) {
            console.log("Inside err",err);
            res.status(500).send({ "error": err });
        } else {
            res.status(200).send(results)
        }
    })
}

/**
 * Function to add random review to mongo DB
 * @param {} req 
 * @param {} res 
 */
async function addRandomReviews(req, res) {
    try {
        let i = 0;
        const review = new reviewModel({
            companyId: getRandomCompanyId(1, 50),
            userId: getRandomUserId(1, 1000),
            review: getRandomReview(),
            isFeatured: getRandomIsFeatured()

        })
        review.save().then(result => {
            res.send(result._id);
        })
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
}


function getRandomCompanyId(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomUserId(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomReview() {
    return fakerator.lorem.paragraph();
}
function getRandomIsFeatured() {
    Math.random() > 0.5 ? true : false;
}

exports.getAllReviews = getAllReviews;
exports.addRandomReviews = addRandomReviews;
exports.getAllReviewsWithCaching=getAllReviewsWithCaching;
exports.updateFeaturedReview = updateFeaturedReview;