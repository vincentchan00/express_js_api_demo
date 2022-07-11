const sql = require("../config/db.js");
// constructor
const Tweet = function(tweet) {
    this.content = tweet.content;
    this.username = tweet.username;
    this.like = tweet.like
    // this.confirmPassword = user.confirmPassword;
};


Tweet.create = (newTweet, result) => {
    sql.query("SELECT * FROM user WHERE username = ?", newTweet.username,(err,res )=>{
        if (!res) {
            console.log("error: User does not exists");
            result( {"message":"User does not exists"}, null);
            return;
        }else{
            let date = new Date();
            sql.query("INSERT INTO tweet SET ?", {"user_id":res[0].id,"content":newTweet.content,"like":newTweet.like,"created_at":date,"updated_at":date}, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                console.log("created user: ", { id: res.insertId, ...newTweet });
                result(null, { id: res.insertId, ...newTweet });
            });
        }
    });

};

Tweet.findById = (id, result) => {
    sql.query(`SELECT * FROM tweet WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
    });
};

Tweet.getAll = ( result) => {
    let query = "SELECT * FROM tweet";
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("user: ", res);
        result(null, res);
    });
};



Tweet.updateById = (id, tweet, result) => {
    let date = new Date();
    sql.query(
        "UPDATE tweet SET content = ?, updated_at = ?WHERE id = ?",
        [ tweet.content, date, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                // not found Tutorial with the id
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated tweet: ", { id: id, ...tweet });
            result(null, { id: id, ...tweet });
        }
    );
};

Tweet.remove = (id, result) => {
    sql.query("DELETE FROM tweet WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Tutorial with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted tweet with id: ", id);
        result(null, res);
    });
};

Tweet.removeAll = result => {
    sql.query("DELETE FROM tweet", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} tweet`);
        result(null, res);
    });
};
module.exports = Tweet;