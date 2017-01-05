let db = require('../../database');

let research = (req, res) => {
    if (typeof req.query.id === "undefined") {
        db.conn.query('select * from retribution', function(err, rows) {
            res.send(err || rows);
        });
    } else {
        db.conn.query({
            sql: 'select * from retribution where area_number=?',
            values: [req.query.id]
        }, function(err, rows) {
            res.send(err || rows);
        });
    }
}

let search = {
    research: research
};

module.exports = search;