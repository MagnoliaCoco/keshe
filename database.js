let mysql = require('mysql');
let config = require('./config');

let connection = mysql.createConnection(config.mysql);
connection.connect(function(err) {
    if (err) console.error(err);
});

module.exports = {
    get conn() {
        return connection;
    }
}