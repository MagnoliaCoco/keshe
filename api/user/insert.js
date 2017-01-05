let db = require('../../database');

let userinsert = (req, res) => {
    if (typeof req.query.user_uuid === "undefined") {
        db.conn.query('select * from user', function(err, rows) {
            res.send(err || rows);
        });
    } else {
        db.conn.query({
            sql: 'insert into user values(?,?,?,?,?,?,?,?,?,?,?,?)',
            values: [
                req.query.user_number,
                req.query.user_name,
                req.query.user_phone,
                req.query.user_email,
                req.query.user_password,
                req.query.user_service,
                req.query.user_area,
                req.query.user_variety,
                req.query.user_remark,
                req.query.user_uuid,
                req.query.importer_number,
                req.query.modify_number,
            ]
        }, function(err, rows) {
            res.send(err || rows);
        });
    }
}
let insert = {
    userinsert: userinsert
};

module.exports = insert;