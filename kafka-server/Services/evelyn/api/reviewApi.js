const mongo = require('../../../utils/mongo');
const reviewModel = require('../../../models/reviewModel');

const REVIEW_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

const ReviewApi = class {

  countReviews = async (status) => {
    let filter = { status: { $in: [ status ] } };
    if (status === 'pending') {
      // Backward compatible, some documents had existed prior to adding default status in model.
      filter.status.$in.push(undefined);
    }
    return await reviewModel.countDocuments(filter);
  };

  getReviews = async (status, page=0, size=10) => {
    let filter = { status: { $in: [ status ] } };
    if (status === REVIEW_STATUS.PENDING) {
      // Backward compatible, some documents had existed prior to adding default status in model.
      filter.status.$in.push(undefined);
    }
    const reviews = await reviewModel.find(filter)
      .sort({ _id: 1 })
      .limit(size)
      .skip(page*size)
      .exec();
    return reviews;
  };

  countClosedReviewsByCompanyId = async (companyId) => {
    const filter = {
      companyId,
      status: { $in: [ REVIEW_STATUS.APPROVED, REVIEW_STATUS.REJECTED ]}
    };
    return await reviewModel.countDocuments(filter);
  }

  getCloedReviewsByCompanyId = async (companyId, page=0, size=10) => {
    const filter = {
      companyId,
      status: { $in: [ REVIEW_STATUS.APPROVED, REVIEW_STATUS.REJECTED ]}
    };
    const reviews = await reviewModel.find(filter)
      .sort({ _id: 1 })
      .limit(size)
      .skip(page*size)
      .exec();
    return reviews;
  }

  updateReviewStatus = async (reviewId, status) => {
    if (!Object.values(REVIEW_STATUS).includes(status)) {
      throw new Error(`Unaccpeted review status: ${status}`);
    }

    const filter = { _id: reviewId };
    const update = { status };
    return await reviewModel.updateOne(filter, update);
  };

  getDailyReviewsWithinPastNDays = async (limit=100) => {
    return await reviewModel.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        }
      },
      { $sort   : { _id: 1 } },
      { $limit: limit },
    ]);
  }

  getTopReviewedCompanysId = async (limit=5) => {
    return await reviewModel.aggregate([
      {
        $group: {
          _id: '$companyId',
          count: { $sum: 1 },
        }
      },
      { $sort   : { count : -1, _id: 1 } },
      { $limit: limit },
    ]);
  }

  getTopCompaniesIdOnAverageRates = async(limit=5) => {
    return await reviewModel.aggregate([
      {
        $addFields: {
          rate: { $toDouble: "$overallRating" },
        },
      },
      {
        $group: {
          _id: '$companyId',
          averageRate: { $avg: '$rate' },
        }
      },
      { $match: { averageRate: { $ne: null } }},
      { $sort   : { averageRate : -1, _id: 1 } },
      { $limit: limit },
    ]);
  }

  getTopCompaniesIdOnAverageCeoRating = async (limit=5) => {
    return reviewModel.aggregate([
      {
        $addFields: {
          ceoRate: {
            $convert: {
              input: "$ceoApproval",
              to: "double",
              onError: null,
              onNull: null,
            },
          }
        }
      },
      { $match: { ceoRate: { $ne: null } } },
      {
        $group: {
          _id: '$companyId',
          averageRate: { $avg: '$ceoRate' },
        }
      },
      { $match: { averageRate: { $ne: null } }},
      { $sort   : { averageRate : -1, _id: 1 } },
      { $limit: limit },
    ]);
  }

  getTopJobSeekersIdOnTotalApprovedReviews = async (limit=5) => {
    // SELECT COUNT(*) as count, userId as _id FROM reviews
    //   WHERE status = 'approved'
    //   GROUP BY userId
    //   ORDER BY count DESC, _id ASC
    return await reviewModel.aggregate([
      { $match: { status: 'approved' }},
      { $group: { 
        _id: '$userId',
        count: { $sum: 1 }}},
      { $sort   : { count : -1, _id: 1 } },
      { $limit: limit },
    ]);
  }
};

module.exports = ReviewApi;