let db = require('../../database');

let roleinsert = (req, res) => {
    if (typeof req.query.role_name === "undefined") {
        db.conn.query('select * from role', function(err, rows) {
            res.send(err || rows);
        });
    } else {
        db.conn.query({
            sql: 'insert into role values(?,?,?,?,?,?,?)',
            values: [
                rep.query.role_number,
                req.query.role_name,
                req.query.role_sys,
                req.query.rol_remark,
                req.query.rol_uuid,
                req.query.importer_number,
                req.query.modify_number
            ]
        }, function(err, rows) {
            res.send(err || rows);
        });
    }
}
module.exports = roleinsert;