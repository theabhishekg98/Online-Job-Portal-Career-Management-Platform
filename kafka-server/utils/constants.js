const Constants = class {
    constructor() {
        this.RootPath = "/Users/kkkosariya/Projects/php-projects/sjsu/cmpe-273/cmpe-273-indeed/server";
        // this.RootPath = "/var/www/html/cmpe-273-uber-eats-kafka/server";
        
        this.Path = {
            upload: `${this.RootPath}/assets/upload`,
        }
        
        this.Server = { 
            URL: "http://13.56.209.71/:3001",
            // URL: "http://54.67.75.13:3001",
            Port:3001
        };

        this.Client = {
            URL: "http://13.56.209.71/:3000",
            // URL: "http://54.67.75.13:3000",
            Port: 3000
        };

        this.JWT = {
            Secret:"cmpe_273_uber_eats"
        };

        this.AWS = {
            accessKey: "AKIAXQTZVVJXTK66L2XP",
            accessSecret: "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",
            s3Bucket: "cmpe273",
            s3Path: "https://cmpe273.s3.amazonaws.com"
        };

        this.MySql = { host: "indeed.czswadpcnzv3.us-west-1.rds.amazonaws.com", user: "admin", password: "admin1234", db: "indeed" };
    }
}

module.exports = Constants;