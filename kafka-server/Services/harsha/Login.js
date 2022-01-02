const bcrypt = require('bcrypt');
const saltRounds = 10;
const util = require('util');
const MySqlHandler = require('../../utils/mySqlHandler');

async function handle_login(req, callback) {
    let authenticated = false;
    let empId;
    let usrId;
    let adminId;
    let companyId;

    try {
        const mySql = new MySqlHandler();
        // mySql.db.connect();
        var query = util.promisify(mySql.db.query).bind(mySql.db)
        var loginQuery = "select * from user where email=? "
        let result = await query(loginQuery, [req.body.email])
        // console.log(result)
        let hashedPass = result[0]?.password
        let user_id = result[0]?.id
        let user_type = result[0]?.userType
        let user_fname = result[0]?.firstName
        let user_lname = result[0]?.lastName
        if (hashedPass) {
            console.log("inside hashed pass")
            authenticated = await bcrypt.compare(req.body.password, hashedPass)
            if (user_type == "employer" && authenticated) {
                let getEmployerDetails = "select * from employer where userId=?"
                let empResult = await query(getEmployerDetails, [user_id])
                empId = empResult[0]?.empId
                companyId = empResult[0]?.companyId
                callback(null, {
                    authenticated: authenticated,
                    type: "emp",
                    employerId: empId,
                    companyId: companyId,
                    fname: user_fname,
                    lname: user_lname
                })
            } else if (user_type === "jobSeeker" && authenticated) {
                // let getJobSeekerDetails="select * from jobSeeker where userId=?"
                // let jobSeekerResult=await query(getJobSeekerDetails,[user_id])
                // usrId=jobSeekerResult[0]
                callback(null, {
                    authenticated: authenticated,
                    type: "user",
                    userId: user_id,
                    fname: user_fname,
                    lname: user_lname
                })

            } else if (user_type === "admin" && authenticated) {
                callback(null,{
                    authenticated: authenticated,
                    type: "admin",
                    userId: user_id,
                    fname: user_fname,
                    lname: user_lname
                })
            }
            // query()
        }
        callback(null, {
            authenticated:false
        })

        // bcrypt.compare()
    } catch (err) {
        console.log(err)
        callback(err, null)
    }
}
exports.handle_login = handle_login