const Constants = class {
    constructor() {
        this.RootPath = "";
        
        this.Server = { 
            URL: "http://13.56.209.71/:3001",
            Port:3001
        };

        this.Client = {
            URL: "http://13.56.209.71/:3000",
            Port: 3000
        };

        this.JWT = {
            Secret:"cmpe_273_indeed"
        };

        this.MySql = { host: "indeed.czswadpcnzv3.us-west-1.rds.amazonaws.com", user: "admin", password: "admin1234", db: "indeed" };
    }
}

module.exports = Constants;