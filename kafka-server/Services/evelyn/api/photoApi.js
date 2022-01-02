const photoModel = require('../../../models/photoModel');

const REVIEW_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

const phtotoApi = class {

  countPhotos = async (status) => {
    let queryParams = { status: { $in: [ status ] } };
    if (status === 'pending') {
      // Backward compatible, some documents had existed prior to adding default status in model.
      queryParams.status.$in.push(undefined);
    }
    return await photoModel.countDocuments(queryParams);
  }

  getPhotos = async (status, page=0, size=10) => {
    let queryParams = { status: { $in: [ status ] } };
    if (status === REVIEW_STATUS.PENDING) {
      // Backward compatible, some documents had existed prior to adding default status in model.
      queryParams.status.$in.push(undefined);
    }
    const reviews = await photoModel.find(queryParams)
      .sort({ _id: 1 })
      .limit(size)
      .skip(page*size)
      .exec();
    return reviews;
  }

  updatePhotoStatus = async (photoId, status) => {
    if (!Object.values(REVIEW_STATUS).includes(status)) {
      throw new Error(`Unaccpeted photo status: ${status}`);
    }
    const filter = { _id: photoId };
    const update = { status };
    return await photoModel.updateOne(filter, update);
  };

  getPhotosUrlByIds = async (photoIds) => {
    const filter = { _id: { $in : photoIds } };
    const projection = { url: 1 };
    const photos = await photoModel.find(filter, projection).exec();
    return photos;
  }
}

module.exports = phtotoApi;