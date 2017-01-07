let db = require('../../database');

let research = (req, res) => {
    if (typeof req.query.area_number === "undefined") {
        db.conn.query('select * from retribution', function(err, rows) {
            res.send(err || rows);
        });
    } else {
        db.conn.query({
            sql: 'select * from retribution where area_number=?',
            values: [req.query.area_number]
        }, function(err, rows) {
            res.send(err || rows);
        });
    }
}

module.exports = research;