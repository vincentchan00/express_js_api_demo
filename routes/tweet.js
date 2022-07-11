
var express = require('express');
var router = express.Router();
const tweet = require("../controllers/TweetController.js");

/* GET home page. */
router.post("/", checkLogin,tweet.create);
router.get("/", tweet.findAll);
// router.get("/:id", tweet.findOne);
router.put("/:id", checkLogin,tweet.update);
router.delete("/:id", checkLogin,tweet.delete);
router.post("/like/:id", checkLogin,tweet.like);
router.post("/retweet/:id", checkLogin,tweet.like);
function checkLogin(req, res,next){
    if(req.session.loggedin){
        next();
    } else {
        var err = new Error("Not logged in!");
        next(err);
    }
}
module.exports = router;
