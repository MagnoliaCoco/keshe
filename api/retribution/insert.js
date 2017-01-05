let db = require('../../database');

let reinsert = (req, res) => {
    if (typeof req.query.re_uuid === "undefined") {
        db.conn.query('select * from retribution', function(err, rows) {
            res.send(err || rows);
        });
    } else {
        db.conn.query({
            sql: 'insert into retribution values(?,?,?,?,?,?,?,?)',
            values: [
                req.query.reinfo_number, 
                req.query.area_number, 
                req.query.publisher_number, 
                req.query.org_number, 
                req.query.re_info, 
                req.query.re_uuid, 
                req.query.importer_number, 
                req.query.modify_numebr
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