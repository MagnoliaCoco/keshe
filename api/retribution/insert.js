let db = require('../../database')

let reinsert = (req, res) => {
    if (typeof req.query.user_uuid === "undefined") {
        db.conn.query('select * from user', function(err, rows) {
            res.send(err || rows);
        });
    } else {
        db.conn.query({
            sql: 'insert into retribution values(?,?,?,?,?,?,?,?,?,?,?,?)',
            values: [

            ]
        }, function(err, rows) {
            res.send(err || rows);
        });
    }
}
let insert = {
    reinsert: reinsert
};

module.exports = insert;