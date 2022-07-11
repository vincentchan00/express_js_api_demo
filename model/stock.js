const sql = require("../config/db.js");
// constructor
const Stock = function (stock) {
    this.instrument = stock.instrument;
    this.share = stock.share;
    this.trade_price = stock.trade_price;
    this.username = stock.username;
};

Stock.buy = (stock, result) => {
    sql.query("SELECT * FROM user WHERE username = ?", stock.username, (err, useRes) => {
        var total_price = stock.trade_price * stock.share;
        if (useRes[0].balance >= total_price) {

            sql.query(
                "UPDATE user SET balance = balance - ? WHERE id = ?",
                [total_price, useRes[0].id],
                (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                        return;
                    }
                    console.log("updated user balance: ", {id: useRes[0].id});
                }
            );
        } else {
            console.log("error: User does not have enough balance");
            result({"message": "User does not have enough balance"}, null);
            return
        }

        sql.query("SELECT * FROM stock WHERE user_id = ? and instrument = ?", [
            useRes[0].id, stock.instrument
        ], (err, stockRes) => {
            let date = new Date();
            if (stockRes.length != 0) {
                var total_share = stockRes[0].share+ stock.share;
                var avg_price = (stockRes[0].avg_price * stockRes[0].share + stock.trade_price * stock.share)/total_share;
                sql.query("UPDATE stock SET share =  ?, avg_price = ?, updated_at=? WHERE user_id = ? and instrument = ?", [
                    total_share,
                    avg_price,
                    date,
                    useRes[0].id,
                    stock.instrument,
                ], (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(err, null);
                        return;
                    }
                    console.log("sell stock: ", {id: res.insertId, ...stock});
                    result(null, {id: res.insertId, ...stock});

                });
            } else {

                let date = new Date();
                sql.query("INSERT INTO stock SET ?", {
                    "user_id": useRes[0].id,
                    "instrument": stock.instrument,
                    "avg_price": stock.trade_price,
                    "share": stock.share,
                    "created_at": date,
                    "updated_at": date
                }, (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(err, null);
                        return;
                    }
                    console.log("buy stock: ", {id: res.insertId, ...stock});
                    result(null, {id: res.insertId, ...stock});

                });
            }
        });
    });
};

Stock.sell = (stock, result) => {
    sql.query("SELECT * FROM user WHERE username = ?", stock.username, (err, useRes) => {


        sql.query("SELECT * FROM stock WHERE user_id = ? and instrument = ?", [
            useRes[0].id, stock.instrument
        ], (err, stockRes) => {
            if(stockRes.length>0)
            if ( stockRes[0].share >= stock.share) {
                var total_price = stock.trade_price * stock.share;
                sql.query(
                    "UPDATE user SET balance = balance + ? WHERE id = ?",
                    [total_price, useRes[0].id],
                    (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(null, err);
                            return;
                        }
                        console.log("updated user balance: ", {id: useRes[0].id});
                    }
                );
                if (stockRes[0].share == stock.share)
                    sql.query("DELETE FROM stock WHERE user_id = ? and instrument = ? ", [
                        useRes[0].id,
                        stock.instrument,
                    ], (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(err, null);
                            return;
                        }
                        console.log("sell stock: ", {id: res.insertId, ...stock});
                        result(null, {id: res.insertId, ...stock});

                    });
                else
                    sql.query("UPDATE stock SET share =  ? WHERE user_id = ? and instrument = ?", [
                        stock.share,
                        useRes[0].id,
                        stock.instrument,
                    ], (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(err, null);
                            return;
                        }
                        console.log("sell stock: ", {id: res.insertId, ...stock});
                        result(null, {id: res.insertId, ...stock});

                    });
            } else {

                result({"message": "User does not have enough shares"}, null);
                return
            }
            else
                result({"message": "User does not have this stock"}, null);
                return
        });


    });
}
Stock.getByUsername = (username, result) => {
    sql.query("SELECT * FROM user WHERE username = ?", username, (err, useRes) => {
        sql.query(`SELECT * FROM stock WHERE user_id = ${useRes[0].id}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.length) {
                console.log("found stock: ", res);
                result(null, res);
                return;
            }
            // not found Tutorial with the id
            result({kind: "not_found"}, null);
        });
    });

};

module.exports = Stock;