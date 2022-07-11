const User = require("../model/user.js");
const bcrypt = require("bcrypt");

// Create and Save a new Tutorial
exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: ""
        });
    }

    const user = new User({
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10),
        balance: req.body.balance || 0,
    });

    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        else res.send(data);
    });

};
exports.login = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: ""
        });
    }
    console.log(req.body);
    const user = new User({
        username: req.body.username,
        password: req.body.password,
    });
    User.login(user, async (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        else {
            if (await bcrypt.compare(user.password, data.password)) {
                req.session.loggedin = true;
                req.session.username = data.username;
                console.log(req.session);
                res.send({"username": data.username}); //return username and id to frontend
            } else {
                res.status(400).send({
                    message: "Wrong Password."
                });
            }

        }
    });
};
exports.addBalance = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: ""
        });
    }
    const user = new User({
        username: req.session.username,
        balance: req.body.balance,
    });
    User.addbalance(user, async (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        else {

            res.send({"username": data.username,"balance":data.balance});
        }
    });
};
exports.logout = async (req, res) => {
    req.session.loggedin = false;
    req.session.username = '';
};
