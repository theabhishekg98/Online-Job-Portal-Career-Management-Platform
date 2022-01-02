const mysql = require("mysql");
const Constants = require('./constants');
const C = new Constants();

const MySqlHandler = class {
    constructor() {
        this.db = mysql.createConnection({
            user: C.MySql.user,
            host: C.MySql.host,
            password: C.MySql.password,
            database: C.MySql.db,
        });
    }
}


module.exports = MySqlHandler;