const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Utils = require('./utils');
// const utils = new Utils();

const REVIEW_STATUS = {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected'
};

var photoSchema = new Schema(
    {
        // photoId: { type: String, required: true, default: utils.generateUniqueId()},
        classId: { type: String, required: false },
        url: { type: String, required: false },
        createdAt: { type: Date, default: Date.now },
        status: { type: String, default: REVIEW_STATUS.PENDING },
    },
    {
        versionKey: false
    });

const photoModel = mongoose.model('photo', photoSchema);
module.exports = photoModel;