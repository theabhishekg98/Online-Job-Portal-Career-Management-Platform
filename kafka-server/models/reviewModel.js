const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const REVIEW_STATUS = {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected'
  };

var reviewSchema = new Schema(
    {
        companyId: { type: String, required: false },
        userId: { type: Number, required: false },
        isFeatured:{type:Boolean,default:false},
        status: { type: String, default: REVIEW_STATUS.PENDING },
        overallRating:{ type: String, required: true},
        reviewSummary:{ type: String, required: true},
        fullReview:{ type: String, required: false},
        pros:{ type: String, required: false},
        cons:{ type: String, required: false},
        ceoApproval:{ type: String, required: false},
        interviewPrep:{ type:String, required: false},
        ishelp:{ type:String, required: false},
        helpcount:{ type:Number, required: false,default: 0 },
        nohelpcount:{ type:Number, required: false,default: 0},
        createdAt: { type: Date, default: Date.now },
        usercity:{ type:String, required: false},
        userstate:{ type:String, required: false},

    },
    {
        versionKey: false,
        timestamps:true
    });

const reviewModel = mongoose.model('review', reviewSchema);
module.exports = reviewModel;