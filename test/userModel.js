// user.js

var express = require('express'); // (npm install --save express)
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
chai.use(chaiHttp);

describe('Testing User Function', function () {
    var app,
        date;


    this.timeout(5000);


    beforeEach(function () {
        date = new Date();
    });

    after(function () {
        console.log("User function a tests done!");
    });


    it('Test registration user', (done) =>{
        let account = {
            username: "account1",
            password: "password1"
        }
        chai.request(server)
            .post("/api/user/")
            .send(account)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                    return done(err); }
                done();

            })
    });

    it('Test login user', (done) =>{
        let account = {
            username: "account1",
            password: "password1"
        }
        chai.request(server)
            .post("/api/user/login")
            .send(account)
            .end((err, res) => {

                if (err) {
                    console.log(err);
                return done(err);
                }
                done();

            })
    });
});