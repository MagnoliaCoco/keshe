let db = require('../database')

let usersearch = function(req, res) {
    if (typeof req.query.id === "undefined") {
        db.conn.query('select * from user', function(err, rows) {
            res.send(err || rows);
        });
    } else {
        db.conn.query({
            sql: 'select * from user where user_uuid=?',
            values: [req.query.id]
        }, function(err, rows) {
            res.send(err || rows);
        });
    }
}

let data = {
    get: usersearch,

};

module.exports = data;