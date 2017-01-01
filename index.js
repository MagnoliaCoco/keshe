const express = require('express');
let app = express();
app.get('/', function(req, res) {
    res.send({ status: 'ok' });
});

app.use('/api', require('./api/index'));

app.listen(80);