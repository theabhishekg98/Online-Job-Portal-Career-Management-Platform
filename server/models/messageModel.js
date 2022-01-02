const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var messageSchema = new Schema(
    {
        user: { type: Object, required: true },
        employer: { type: Object, required: true },
        message: {type:Array,required:true}
    },
    {
        versionKey: false,
        timestamps:true
    });

const messageModel = mongoose.model('message', messageSchema);
module.exports = messageModel;