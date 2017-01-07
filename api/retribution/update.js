let db = require('../../database');

let reupdate = (req, res) => {
    if (typeof req.query.reinfo_number === "undefined") {
        db.conn.query('select * from retribution', function(err, rows) {
            res.send(err || rows);
        });
    } else {
        db.conn.query({
            sql: `update retribution set 
            reinfo_number=?,
            area_number=?,
            publisher_number=?,
            org_number=?,
            re_info=?,
            re_uuid=?,
            importer_number=?,
            modify_numebr=?
            where reinfo_number=?`,
            values: [
                req.query.reinfo_number, 
                req.query.area_number, 
                req.query.publisher_number, 
                req.query.org_number, 
                req.query.re_info, 
                req.query.re_uuid, 
                req.query.importer_number, 
                req.query.modify_numebr,
                req.query.reinfo_number
            ]
        }, function(err, rows) {
            res.send(err || rows);
        });
    }
}

module.exports = reupdate;