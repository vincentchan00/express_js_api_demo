
var express = require('express');
var router = express.Router();
const user = require("../controllers/UserController.js");

/* GET home page. */
router.post("/", user.create);
router.post("/login", user.login);
router.post("/addBalance", checkLogin,user.addBalance);
// router.get("/portfolio", user.portfolio);
function checkLogin(req, res, next){
    if(req.session.loggedin){
        next();
    } else {
        var err = new Error("Not logged in!");
        next(err);
    }
}
module.exports = router;
