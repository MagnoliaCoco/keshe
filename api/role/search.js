let db = require('../../database');

let rolesearch = (req, res) => {
    if (typeof req.query.name === "undefined") {
        db.conn.query('select * from role', function(err, rows) {
            res.send(err || rows);
        });
    } else {
        db.conn.query({
            sql: 'select * from role where role_name=?',
            values: [req.query.name]
        }, function(err, rows) {
            res.send(err || rows);
        });
    }
}

module.exports = rolesearch;