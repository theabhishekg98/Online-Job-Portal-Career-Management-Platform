const ceoRatingModel = require('../../../models/ceoRatingModel');

const ceoRatingApi = class {
  getTopRatingCEOs = async (size=10) => {
    return ceoRatingModel.find({})
      .sort({ averageRating: 1 })
      .limit(size);
  }
};

module.exports = ceoRatingApi;