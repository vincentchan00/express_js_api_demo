const Stock = require("../model/stock.js");

// Create and Save a new Tutorial
exports.buy = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: ""
        });
    }
    console.log(req.body);
    const stock = new Stock({
        "instrument": req.body.instrument,
        "share": req.body.share,
        "trade_price": req.body.trade_price,
        username: req.session.username,
    });
    Stock.buy(stock, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while buy the stock."
            });
        else res.send(data);
    });

};
// Create and Save a new Tutorial
exports.sell = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: ""
        });
    }
    const stock = new Stock({
        "instrument": req.body.instrument,
        "share": req.body.share,
        "trade_price": req.body.trade_price,
        "username": req.session.username,
    });
    Stock.sell(stock, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while sell the stock."
            });
        else res.send(data);
    });

};

exports.getByUsername = (req, res) => {
    const user = req.session.username;
    Stock.getByUsername(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while get stock."
            });
        else res.send(data);
    });
};


