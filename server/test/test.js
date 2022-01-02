var supertest = require("supertest");
var should = require("should");
var expect = require('chai').expect;
const assert = require("chai").assert
var server = supertest.agent("http://localhost:3001");
// const chai = require("chai")

// describe("Get Jobs details", function () {
//     it("should return jobs details for provided role name", function (done) {
//         server
//             .post("/k/getJobs")
//             .send({})
//             .expect("Content-type", /json/)
//             .expect(200)
//             .end(function (err, res) {
//                 res.status.should.equal(200);
//                 done();
//             });
//     });
// });

describe("Get Company details", function () {
    it("should return company details if correct name is given", function (done) {
        server
            .post("/k/getCompany")
            .send({ id: 1})
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                done();
            });
    });
});

describe("Get Application details", function () {
    it("should return application data for provided jobId", function (done) {
        server
            .post("/k/getApplication")
            .send({ })
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                done();
            });
    });
});

describe("Get multiple Company details", function () {
    it("should return company data for all companies available", function (done) {
        server
            .post("/k/getCompanyList")
            .send({})
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                done();
            });
    });
});


describe("Get jobs based on emp ID",function()
{
    it("Should return the jobs posted by the employee",function(done)
    {
        server.get("/abhi/GetJobs/3")
        .send({})
        .expect(200)
        .end(function(err,res)
        {
      
              res.status.should.equal(200)
            done()
        })

    })

}
)

describe("Check if chat has been initiated",function()
{
    it("Should check if chat has been initiated",function(done)
    {
        server.get("/abhi/CheckChat/4/1")
        .send({})
        .expect(200)
        .end(function(err,res)
        {
              res.status.should.equal(200)
            done()
        })

    })

}
)


describe("Pull chat based on empId",function()
{
    it("Pull chats based on empId",function(done)
    {
        server.get("/ha/chats/emp/1")
        .send({})
        .expect(200)
        .end(function(err,res)
        {
              res.status.should.equal(200)
            done()
        })

    })

}
)

describe("Get all the company details",function()
{
    it("Get all the company details",function(done)
    {
        server.get("/ha/companies/all")
        .send({})
        .expect(200)
        .end(function(err,res)
        {
              res.status.should.equal(200)
            done()
        })

    })

}
)


describe("Get Employee profile details based on emp id",function()
{
    it("Get employee profile details based on emp id",function(done)
    {
        server.get("/ha/employer/1/profile")
        .send({})
        .expect(200)
        .end(function(err,res)
        {
              res.status.should.equal(200)
            done()
        })

    })

}
)

describe("Get company profile details based on emp Id",function()
{
    it("Fetching company profile details based on emp id",function(done)
    {
        server.get("/ha/employer/1/companyProfile")
        .send({})
        .expect(200)
        .end(function(err,res)
        {
              res.status.should.equal(200)
            done()
        })

    })

}
)


describe("Get jobs based on company id",function()
{
    it("Fetching jobs based on company id",function(done)
    {
        server.get("/an/jobs/2")
        .send({})
        .expect(200)
        .end(function(err,res)
        {
              res.status.should.equal(200)
            done()
        })

    })

}
)

