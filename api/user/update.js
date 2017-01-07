let db = require('../../database');

let userupdate = (req, res) => {
    if (typeof req.query.user_number === "undefined") {
        db.conn.query('select * from user', function(err, rows) {
            res.send(err || rows);
        });
    } else {
        db.conn.query({
            sql: `update user set 
            user_number=?,
            user_name=?,
            user_phone=?,
            user_email=?,
            user_password=?,
            user_service=?,
            user_area=?,
            user_variety=?,
            user_remark=?,
            user_uuid=?,
            importer_number=?,
            modify_number=?
            where user_number=?`,
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
                req.query.user_number
            ]
        }, function(err, rows) {
            res.send(err || rows);
        });
    }
}
module.exports = userupdate;