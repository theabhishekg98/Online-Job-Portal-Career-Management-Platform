const applicationModel = require('../../../models/applicationModel');

const APPLICATION_STATUS = {
  SUBMITTED: 'submitted',
  REVIEWED: 'reviewed',
  INITIAL_SCREENING: 'initial screening',
  INTERVIEWING: 'interviewing',
  HIRED: 'hired',
  REJECTED: 'rejected',
};

const applicationApi = class {
  countByStatus = async (jobIds) => {
    const jobIdsStr = jobIds.map((jobId) => jobId.toString());
    const result = await applicationModel.aggregate([
      { $match: { jobId: { $in: jobIdsStr }}},  
      { $group: {
        _id: '$status',
        count: { $sum : 1},
      }},
      { $sort: { _id: 1 }},
    ]);
    const transformedResult = result.reduce((obj, item) => Object.assign(obj, { [item._id]: item.count }), {});
    Object.values(APPLICATION_STATUS).forEach((status) => {
      if (!transformedResult[status]) transformedResult[status] = 0;
    });
    return transformedResult;
  }
};

module.exports = applicationApi;