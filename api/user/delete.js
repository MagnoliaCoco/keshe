let db = require('../../database');

let userdelete = (req, res) => {
    if (typeof req.query.user_name === "undefined") {
    } else {
        db.conn.query({
            sql: 'delete from user where user_name=?',
            values: [req.query.user_name]
        }, function(err, rows) {
            res.send(err || rows);
        });
    }
}

module.exports = userdelete;