const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Utils = require('./utils');
const utils = new Utils();

const APPLICATION_STATUS = {
    SUBMITTED: 'submitted',
    REVIEWED: 'reviewed',
    INITIAL_SCREENING: 'initial screening',
    INTERVIEWING: 'interviewing',
    HIRED: 'hired',
    REJECTED: 'rejected', 
};

var applicationSchema = new Schema(
    {
        // applicationId: { type: String, required: true, default: utils.generateUniqueId()},
        userId: { type: String, required: false },
        companyId:{type: String, required: false },
        jobId: { type: String, required: false },
        status: { type: String, required: false, default: APPLICATION_STATUS.SUBMITTED },
        createdAt: { type: Date, default: Date.now },
        userfName :{type: String,required : false},
        userlName :{type: String,required : false},
        resumeLink :{type: String,required : false},
        coverLink :{type: String,required : false},
        companyName :{type: String, required : false}

    },
    {
        versionKey: false
    });

const applicationModel = mongoose.model('application', applicationSchema);
module.exports = applicationModel;