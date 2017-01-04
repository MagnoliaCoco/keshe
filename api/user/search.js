let db = require('../../database')

let usersearch = (req, res) => {
    if (typeof req.query.uuid === "undefined") {
        db.conn.query('select * from user', function(err, rows) {
            res.send(err || rows);
        });
    } else {
        db.conn.query({
            sql: 'select * from user where user_uuid=?',
            values: [req.query.uuid]
        }, function(err, rows) {
            res.send(err || rows);
        });
    }
}

let search = {
    usersearch: usersearch
};

module.exports = search;