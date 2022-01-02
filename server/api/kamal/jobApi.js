const Constants = require('../../utils/constants');
const MySqlHandler = require('../../utils/mySqlHandler');
const C = new Constants();
const mySql = new MySqlHandler();


const jobApi = class {
    constructor() {
    }

    getJobs = async (params) => {
        console.log(params);
        var query = 'SELECT * FROM job';
        var values = [];
        var clause = {};
        if ('id' in params) {
            clause['id'] = params.id;
        }
        if ('companyId' in params) {
            clause['companyId'] = params.companyId;
        }
        if ('locationId' in params) {
            clause['locationId'] = params.locationId;
        }
        if ('roleName' in params) {
            clause['roleName'] = params.roleName;
        }

        if (Object.keys(clause).length != 0) {
            query += ' WHERE'
            for (var key in clause) {
                query += ` ${key} = ? AND`;
                values.push(clause[key]);
            }
            var n = query.lastIndexOf(' AND');
            query = query.slice(0, n) + query.slice(n).replace(' AND', '');
        }

        return new Promise(function (resolve, reject) {
            mySql.db.query(query, values, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}


module.exports = jobApi;