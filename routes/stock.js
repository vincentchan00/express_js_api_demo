var express = require('express');
var router = express.Router();
const stock = require("../controllers/StockController.js");

/* GET home page. */
router.post("/buy", checkLogin,stock.buy);
router.delete("/sell", checkLogin,stock.sell);
router.get("/", checkLogin,stock.getByUsername);
// router.delete("/sell", checkSignIn,stock.sell);
function checkLogin(req, res,next){
    if(req.session.loggedin){
        next();
    } else {
        var err = new Error("Not logged in!");
        next(err);
    }
}
module.exports = router;