let db = require('../../database');

let roledelete = (req, res) => {
    if (typeof req.query.role_name === "undefined") {
    } else {
        db.conn.query({
            sql: 'delete from role where role_name=?',
            values: [req.query.role_name]
        }, function(err, rows) {
            res.send(err || rows);
        });
    }
}

module.exports = roledelete;