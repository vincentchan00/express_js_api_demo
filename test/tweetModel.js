// user.js

var express = require('express'); // (npm install --save express)
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
const Tweet = require("../model/tweet.js");
let User = require('../model/User');
var request = require('superagent');
var agent = request.agent();
chai.use(chaiHttp);


describe('Testing Tweet Function', function () {
    var app,
        date;
    this.timeout(5000);
    let account = {
        username: "account2",
        password: "password2"
    };

    before( (done) => {

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

    after(function () {
        console.log("Tweet function a tests done!");
    });


    it('register ', (done) => {
            agent
            .post("http://localhost:8000/api/user/login")
            .send(account)
            .end(( res) => {
                done();
            })
    });

    it('Test login', (done) => {
            agent
            .post("http://localhost:8000/api/user/login")
            .send(account)
            .end(( res) => {
                done();
            })
    });

    //
    it('Test create tweet', (done) => {
        let tweet = {
            content: "content1",
        }
            agent
            .post("http://localhost:8000/api/tweet")
            .send(tweet)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                    return done(err);
                }
                done();
            })

    });
    it('Test get all tweet', (done) => {
        agent
            .get("http://localhost:8000/api/tweet")
            .end((err, res) => {
                if (err) {
                    console.log(err);
                    return done(err);
                }
                done();
            })
    });
    it('Test update tweet', (done) => {
        let tweet = new Tweet({"content": "content1","username":"account2"});
        let newTweet = {
            content: "content2",
        }
        Tweet.create(tweet,(err, tweet) => {
                agent
                .put("http://localhost:8000/api/tweet/" + tweet.id)
                .send(newTweet)
                .end((err, res) => {
                    if (err) {
                        console.log(err);
                        return done(err);
                    }
                    done();
                })
        });
    });
    it('Test delete tweet', (done) =>{
        let tweet = new Tweet({"content": "content1","username":"account2"});
        Tweet.create(tweet,(err, tweet) => {
            agent
                .delete("http://localhost:8000/api/tweet/" + tweet.id)
                .end((err, res) => {
                    if (err) {
                        console.log(err);
                        return done(err);
                    }
                    done();
                })
        });

    });

});