const sql = require("../config/db.js");
// constructor
const User = function(user) {
    this.username = user.username;
    this.password = user.password;
    this.balance = user.balance;
    // this.confirmPassword = user.confirmPassword;
};

User.create = (newUser, result) => {
    sql.query("SELECT * FROM user WHERE username = ?", newUser.username,(err,res )=>{
        if (res.length != 0) {
            console.log("error: User already exists");
            result( {"message":"User already exists"}, null);
            return;
        }else{
            sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                console.log("created user: ", { id: res.insertId, ...newUser });
                result(null, { id: res.insertId, ...newUser });
            });
        }
    });

};
User.login = (user, result) => {
    sql.query(`SELECT * FROM user WHERE username = ?`,user.username, (err, res) => {
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

User.addbalance = ( user, result) => {
    sql.query("SELECT * FROM user WHERE username = ?", user.username,(err,useRes )=> {

        sql.query(
            "UPDATE user SET balance = balance + ? WHERE id = ?",
            [user.balance, useRes[0].id],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }
                if (res.affectedRows == 0) {
                    // not found Tutorial with the id
                    result({kind: "not_found"}, null);
                    return;
                }
                console.log("updated user balance: ", {id: useRes[0].id});
                result(null, {id: useRes[0].id, ...user});
            }
        );
    });
};
module.exports = User;