const companyViewsModel = require('../../../models/companyViews');

function getDateString(date) {
  return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
}

const companyViewsApi = class {
  countOneViewToCompany = async (companyId, companyName) => {
    const today = getDateString(new Date());
    return companyViewsModel.find({ companyId })
      .then((companyFound) => {
        const company = companyFound.length ? companyFound[0] : new companyViewsModel({ companyId, companyName });
        const newCount =  company.counts.get(today) || 0;
        company.counts.set(today, newCount + 1);

        let totalViews = 0;
        for (const val of company.counts.values()) {
          totalViews += val;
        }
        company.totalViews = totalViews;

        return company.save();
      });
  }

  getMostViewedCompanies = async (size=10) => {
    const projection = { companyId: 1, companyName: 1, totalViews: 1 };
    return companyViewsModel.find({}, projection)
      .sort({ totalViews: -1, companyId: 1 })
      .limit(size);
  }

  getMostViewedCompaniesPerDay = async (year, month, date, size=10) => {
    const fullDate = `${year}/${month}/${date}`;
    const key = `\$counts.${fullDate}`
    return await companyViewsModel.aggregate([
      {
        $addFields: {
          fullDate: fullDate,
          dailyViews: key
        }
      },
      { $match: { dailyViews: { $ne: null } } },
      { $project: { companyId: 1, companyName: 1, fullDate: 1, dailyViews: 1, _id: 0 } },
      { $sort: { dailyViews: -1, companyId: 1 } },
      { $limit: size },
    ]);
  }
};

module.exports = companyViewsApi;