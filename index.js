let express = require('express');
let mysql = require('mysql');
let react = require('react');
let reactdom = require('react-dom');
let config = require('./config');


var connection = mysql.createConnection(config.mysql);
connection.connect(function(err) {
    if (err) console.error(err);
});

connection.query('select * from user', function(err, rows) {
    if (err) throw err;

});

let app = express();
app.get('/', function(req, res) {
    res.send('hello world');
});

app.listen(80);