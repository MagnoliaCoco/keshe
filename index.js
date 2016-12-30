let express = require('express');
let mysql = require('mysql');
let ejs = require('ejs');
let config = require('./config');

var connection = mysql.createConnection(config.mysql);

connection.connect(function(err) {
    if (err) {
        console.error(err);
    }
});



let app = express();
app.get('/', function(req, res) {
    res.send('hello world');
});

app.listen(80);