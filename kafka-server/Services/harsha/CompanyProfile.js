const MySqlHandler = require('../../utils/mySqlHandler');
const util = require('util');
const redis = require('redis');
const { hostIP } = require('../../utils/Redis-config');
const client = redis.createClient({
    host: hostIP
});
const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);
async function handle_get_Employee_Profile(req, callback) {
    try {
        const mySql = new MySqlHandler();
        // mySql.db.connect();
        // let getEmployeProfile="select * from employer where empId=?"
        let getEmployeProfile = "select user.*,employer.companyId,employer.role from user join employer on user.id=employer.userId where user.id=(select userId from employer where empId=?);"
        var query = util.promisify(mySql.db.query).bind(mySql.db)
        query(getEmployeProfile, req.params.empId).then(result => {
            console.log(result)
            callback(null, result)
        })
    } catch (err) {
        console.log(err)
        callback(err, null)
    }


}

async function handle_save_Employee_Profile(req, callback) {
    try {
        const mySql = new MySqlHandler();
        // mySql.db.connect();
        // let saveEmployeeProfile="update employer set firstName=? , lastName=?, role=? where empId=?"
        let saveEmployeeProfile = `START TRANSACTION;
        update user set firstName=?,lastName=?,city=?,state=?,country=?,zip=? where id =(select employer.userId from employer where empId=?);
        update employer set role=? where empId =?;
        commit;`
        var query = util.promisify(mySql.db.query).bind(mySql.db)
        query(saveEmployeeProfile, [req.body.fname, req.body.lname, req.body.city, req.body.state, req.body.country, req.body.zipcode,
        req.params.empId, req.body.role, req.params.empId]).then(result => {
            console.log(result)
            callback(null, result)
        })
    } catch (err) {
        console.log(err)
        callback(err, null)
    }
}

async function handle_get_Company_Profile(req, callback) {
    try {
        const mySql = new MySqlHandler();
        // mySql.db.connect();
        let getEmployeProfile = "select * from company where id=?"
        var query = util.promisify(mySql.db.query).bind(mySql.db)
        query(getEmployeProfile, req.params.compId).then(result => {
            console.log(result)
            callback(null, result)
        })
    } catch (err) {
        console.log(err)
        callback(err, null)
    }


}

async function handle_save_Company_Profile(req, callback) {
    try {
        const mySql = new MySqlHandler();
        // mySql.db.connect();
        let saveEmployeeProfile = "update company set name=?,website=? , companySize=?, revenue=? ,headquarters=? ,industry=?,foundDate=?,mission=?,ceo=?,companyType=? where id=?"
        var query = util.promisify(mySql.db.query).bind(mySql.db)
        let { ceoName, companySize, founded, headQuarters, industry, missionAndVision, revenue, website, companyName,companyType } = req.body
        let redisKey = {
            "topic": "companiesList"
        }
        query(saveEmployeeProfile, [companyName, website, companySize, revenue, headQuarters, industry, founded, missionAndVision, ceoName, companyType,req.params.compId]).then(result => {
            console.log(result)
            
            console.log("Cache reset ",client.del(JSON.stringify(redisKey)))
            callback(null, result)
        })
    } catch (err) {
        console.log(err)
        callback(err, null)
    }
}

async function handle_get_all_companiesList(req, callback) {
    try {
        const mySql = new MySqlHandler();
        // mySql.db.connect();
        let getCompaniesList = "SELECT id,name FROM indeed.company"
        var query = util.promisify(mySql.db.query).bind(mySql.db)
        let redisKey = {
            "topic": "companiesList"
        }
        console.log("Inside companies list")
        getAsync(JSON.stringify(redisKey)).then(data => {
            if (data) {
                console.log('Companies list retrieved from Redis');
                callback(null, JSON.parse(data))
                // callback(null, data)
            } else {
                query(getCompaniesList).then(result => {
                    // console.log(result)
                    console.log("Companies list set to redis")
                    client.setex(JSON.stringify(redisKey), 500, JSON.stringify(result))
                    callback(null, result)
                }).catch(err => {
                    callback(err, null)
                })
            }
        })
    } catch (err) {
        console.log(err)
        callback(err, null)
    }
}

async function handle_save_new_company(req, callback) {
    try {
        const mySql = new MySqlHandler();
        // mySql.db.connect();
        let saveCompany = "insert into company (name) values(?);SELECT id,name FROM indeed.company;"
        var query = util.promisify(mySql.db.query).bind(mySql.db)
        let redisKey = {
            "topic": "companiesList"
        }
        query(saveCompany, req.body.companyName).then(result => {
            console.log(result)
            console.log("Cache reset ",client.del(JSON.stringify(redisKey)))
            callback(null, result)
        }).catch(err => {
            console.log(err)
            callback(err, null)
        })

    } catch (err) {
        console.log(err)
        callback(err, null)
    }

}
exports.handle_save_new_company = handle_save_new_company
exports.handle_get_all_companiesList = handle_get_all_companiesList
exports.handle_get_Employee_Profile = handle_get_Employee_Profile
exports.handle_save_Employee_Profile = handle_save_Employee_Profile
exports.handle_get_Company_Profile = handle_get_Company_Profile
exports.handle_save_Company_Profile = handle_save_Company_Profile