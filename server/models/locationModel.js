const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Utils = require('./utils');
const utils = new Utils();


var locationSchema = new Schema(
    {
        street: { type: String, required: false },
        city: { type: String, required: false },
        state: { type: String, required: false },
        country: { type: String, required: false },
        zipCode: { type: String, required: false },
        // createdAt: { type: Date, default: Date.now },
    },
    {
        versionKey: false
    });

const locationModel = mongoose.model('location', locationSchema);
module.exports = locationModel;