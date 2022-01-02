const mysql = require('mysql');
const MySqlHandler = require('../../../utils/mySqlHandler');

const mySqlHandler = new MySqlHandler();

const companyApi = class {
  getCompanyById = async (companyId) => {
    let sql = `SELECT id, name FROM company `;
    if (companyId)
      sql +=  mysql.format(`WHERE id = ? `, [companyId]);
    sql += `LIMIT 1`;

    return  new Promise((resolve, reject) => mySqlHandler.db.query(sql, (err, results) => {
      if (err) {
        console.error(`Failed to execute SQL ${sql}`, err);
        return reject(new Error(`Cannot not get company name by ids: ${companyId}`));
      }
      return resolve(results[0]);
    }));
  }

  getCompanyNamesByIds = async (companyIds) => {
    if (!Array.isArray(companyIds) || companyIds.length === 0)
      return [];

    const sql = mysql.format(
      `SELECT id, name FROM company WHERE id IN (${mysql.escape(companyIds)})`
    );
    return new Promise((resolve, reject) => mySqlHandler.db.query(sql, (err, results) => {
      if (err) {
        console.error(`Failed to execute SQL ${sql}`, err);
        return reject(new Error(`Cannot not get company name by ids: ${companyIds}`));
      }
      return resolve(results);
    }));
  }

  getCompanyCeoNamesByIds = async (companyIds) => {
    if (!Array.isArray(companyIds) || companyIds.length === 0)
      return [];

    const sql = mysql.format(
      `SELECT id, ceo FROM company WHERE id IN (${mysql.escape(companyIds)})`
    );
    return new Promise((resolve, reject) => mySqlHandler.db.query(sql, (err, results) => {
      if (err) {
        console.error(`Failed to execute SQL ${sql}`, err);
        return reject(new Error(`Cannot not get company ceo name by ids: ${companyIds}`));
      }
      return resolve(results);
    }));
  }

  countCompaniesByName = (companyName=undefined) => {
    let sql = `SELECT COUNT(id) as count FROM company `;
    if (companyName)
      sql += mysql.format(`WHERE name LIKE ?`, [`%${companyName}%`]);

    return new Promise((resolve, reject) => mySqlHandler.db.query(sql, (err, results) => {
      if (err) {
        console.error(`Failed to execute SQL ${sql}`, err);
        return reject(new Error(`Cannot not count companies by name: ${companyName}`));
      }
      return resolve(results[0]);
    }));
  }

  getCompaniesByName = (companyName=undefined, page=0, size=10) => {
    let sql = `SELECT * from company `
    if (companyName)
      sql += mysql.format(`WHERE name LIKE ? `, [`%${companyName}%`]);
    sql += mysql.format(`LIMIT ?, ? `, [page*size, size]);
    return new Promise((resolve, reject) => mySqlHandler.db.query(sql, (err, results) => {
      if (err) {
        console.error(`Failed to execute SQL ${sql}`, err);
        return reject(new Error(`Cannot not get companies by name: ${companyName}`));
      }
      return resolve(results);
    }));
  }
};

module.exports = companyApi;