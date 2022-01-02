const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companyViewsSchema = new Schema(
  {
    companyId: { type: Number, required: true },
    companyName: { type: String, required: false },
    totalViews: { type: Number, default: 0 },
    counts: {
      type: Map,
      of: Number,
      default: {},
    },
  },
  {
      versionKey: false
  }
);

const companyViewsModel = mongoose.model('companyViews', companyViewsSchema);
module.exports = companyViewsModel;