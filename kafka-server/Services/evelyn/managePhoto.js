const photoApiClass = require('./api/photoApi');

const photoApi = new photoApiClass();

async function getPhotos(payload, callback) {
  // Parse and validate parameters
  const { status, page, size } = payload;

  // Execute
  try {
    const countPhotoPromise = photoApi.countPhotos(status);
    const photos = await photoApi.getPhotos(status, page, size);
    const photoCounts = await countPhotoPromise;
    const result = JSON.stringify({ count: photoCounts, photos });
    callback(null, result);
  } catch (err) {
    console.error(err);
    callback(err, null);
  }
}

async function updatePhotoStatus(payload, callback) {
  const { photoId, status } = payload;
  try {
    await photoApi.updatePhotoStatus(photoId, status);
    callback(null, 'Photo status updated');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
}

module.exports = {
  getPhotos,
  updatePhotoStatus,
};
