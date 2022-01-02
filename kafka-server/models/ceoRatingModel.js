const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ceoRatingSchema = new Schema(
  {
    ceo: { type: String, required: true },
    companyId: { type: Number, required: false },
    averageRating: { type: Number, default: 0.0 },
  },
  {
    versionKey: false
  }
);

const ceoRatingModel = mongoose.model('ceoRating', ceoRatingSchema);
module.exports = ceoRatingModel;