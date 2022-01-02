const redis = require('redis');
const { hostIP } = require('../../utils/Redis-config');
// const client = redis.createClient({
//     host:hostIP
// });
var reviewModel = require("../../models/reviewModel");
const { promisify } = require("util");
// const getAsync = promisify(client.get).bind(client);
async function handle_get_all_reviews(req, callback) {
    console.log("Inside handle get all reviews kafka")

    // getAsync('reviews').then(data => {
    //     if (data) {
    //         console.log('Reviews retrieved from Redis');
    //         callback(null, JSON.parse(data))
    //     } else {
    console.log(req.params.compId)
    reviewModel.find({companyId:parseInt(req.params.compId,10),status:'approved'}).then(result => {
        // client.setex('reviews', 500, JSON.stringify(result))
        // res.send(result)
        // console.log(JSON.stringify(result).length)
        callback(null, result)
    })
        .catch(err => {
            console.log("err inside handle_get_all_reviews ", err);
            callback(null, err);
        })
}
async function handle_updateFeaturedReview(req,callback){
    reviewModel.findOneAndUpdate({_id:req.body.reviewId},{isFeatured:req.body.isFeatured}).then(result =>{
        callback(null,result)
    }).catch(err=>{
        callback(null,err)
    })
}
exports.handle_get_all_reviews = handle_get_all_reviews
exports.handle_updateFeaturedReview=handle_updateFeaturedReview