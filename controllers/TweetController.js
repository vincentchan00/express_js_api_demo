const Tweet = require("../model/tweet.js");
const UserLike = require("../model/user_like.js");

// Create and Save a new Tutorial
exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: ""
        });
    }

    const tweet = new Tweet({
        "content": req.body.content,
        "username": req.session.username,
        "like":0,
    });

    Tweet.create(tweet, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the tweet."
            });
        else res.send(data);
    });

};

exports.findAll = (req, res) => {
    Tweet.getAll( (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving user."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Tweet.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Tweet with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Tweet with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.like = (req, res) => {
    const tweet = new UserLike({
        "tweet_id": req.params.id,
        "username": req.session.username,
    });
    UserLike.like( tweet,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving user."
            });
        else res.send(data);
    });
};
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    console.log(req.body);
    Tweet.updateById(
        req.params.id,
        new Tweet(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Tweet with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Tweet with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};
exports.delete = (req, res) => {
    Tweet.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Tweet with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Tweet with id " + req.params.id
                });
            }
        } else res.send({ message: `Tweet was deleted successfully!` });
    });
};