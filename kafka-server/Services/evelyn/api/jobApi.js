const mysql = require('mysql');
const MySqlHandler = require('../../../utils/mySqlHandler');

const mySqlHandler = new MySqlHandler();

const jobApi = class {
  getJobsIdByCompanyId(companyId) {
    const sql = mysql.format(
        `SELECT id FROM job WHERE companyId = ?`, [companyId]
    );
    return new Promise((resolve, reject) => mySqlHandler.db.query(sql, (err, results) => {
        if (err) {
          console.error(`Failed to execute SQL ${sql}`, err);
          return reject(new Error(`Cannot not get jobs by companyId: ${companyId}`));
        }
        return resolve(results.map((item) => item.id));
      }));
  }
}

module.exports = jobApi;