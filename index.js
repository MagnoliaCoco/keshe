let express = require('express');
let mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rainylu1',
    database: 'keshe'
});

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