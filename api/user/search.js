let db = require('../../database');

let userlogin = (req, res) => {
    if ((typeof req.query.loginname === "undefined" )|| (typeof req.query.loginpassword === "undefined" )) {
        console.error('null username or password')
        res.send('Fuck off.');
    } else {
        db.conn.query({
            sql: 'select * from user where user_name=? and user_password=?',
            values: [
                req.query.loginname,
                req.query.loginpassword
            ]
        }, function(err, rows) {
            res.send(err || rows);
        });
    }
}

let usersearch = (req, res) => {
    if (typeof req.query.name === "undefined") {
        db.conn.query('select * from user', function(err, rows) {
            res.send(err || rows);
        });
    } else {
        db.conn.query({
            sql: 'select * from user where user_name=?',
            values: [req.query.name]
        }, function(err, rows) {
            res.send(err || rows);
        });
    }
}

let search = {
    usersearch: usersearch,
    userlogin: userlogin
};

module.exports = search;