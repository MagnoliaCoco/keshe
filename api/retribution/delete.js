let db = require('../../database');

let redelete = (req, res) => {
    if (typeof req.query.reinfo_number === "undefined") {
    } else {
        db.conn.query({
            sql: 'delete from role where =?',
            values: [req.query.reinfo_number]
        }, function(err, rows) {
            res.send(err || rows);
        });
    }
}

module.exports = redelete;