const mysql = require('mysql');
const MySqlHandler = require('../../../utils/mySqlHandler');

const mySqlHandler = new MySqlHandler();

const userApi = class {
  getUserNames = async (userIds) => {
    if (!Array.isArray(userIds) || userIds.length === 0)
      return [];
  
    const sql = mysql.format(
      `SELECT id, firstName, lastName FROM user WHERE id IN (${mysql.escape(userIds)})`
    );
    return new Promise((resolve, reject) => mySqlHandler.db.query(sql, (err, results) => {
      if (err) {
        console.error(`Failed to execute SQL ${sql}`, err);
        return reject(new Error(`Cannot not get user name by ids: ${userIds}`));
      }
      return resolve(results);
    }));
  }
};
  
  module.exports = userApi;