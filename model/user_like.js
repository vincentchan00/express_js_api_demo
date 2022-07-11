const sql = require("../config/db.js");
// constructor
const Tweet = function(user) {
    this.tweet_id = user.tweet_id;
    this.username = user.username;
    // this.confirmPassword = user.confirmPassword;
};

Tweet.like = (tweet, result) => {
    sql.query("SELECT * FROM user WHERE username = ?", tweet.username,(err,userRes )=>{
        sql.query("SELECT * FROM user_like WHERE user_id = ? and tweet_id = ?", [userRes[0].id,tweet.tweet_id],(err,res )=>{

            if (res.length != 0) {
                sql.query("DELETE FROM user_like WHERE id = ?", res[0].id, (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                        return;
                    }

                    sql.query("UPDATE tweet SET `like` = `like` - 1,  updated_at = ?  WHERE id = ?" , [new Date(),tweet.tweet_id],(err, res) => {
                        console.log("like with tweet id: ", tweet.tweet_id);
                        result(null, { id: tweet.tweet_id, 'like':  false });

                    });
                });

            }else{
                sql.query("INSERT INTO user_like SET ?", {"user_id":userRes[0].id,"tweet_id":tweet.tweet_id,"created_at":new Date(),"updated_at":new Date()}, (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(err, null);
                        return;
                    }
                    sql.query("UPDATE tweet SET `like` = `like` + 1,  updated_at = ?  WHERE id = ?" , [new Date(),tweet.tweet_id],(err, res) => {
                        console.log("like with tweet id: ", tweet.tweet_id);
                        result(null, { id: tweet.tweet_id, 'like':  true });

                    });

                });

            }
        });
    });
};
module.exports = Tweet;