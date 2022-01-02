const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var saveSchema = new Schema(
    {
        userId: { type: String, required: false },
        jobId: { type: String, required: false },
        roleName: { type: String, required: false },
        status: { type: String, required: false },
        createdAt: { type: Date, default: Date.now }
    },
    {
        versionKey: false
    });

const saveModel = mongoose.model('save', saveSchema);
module.exports = saveModel;