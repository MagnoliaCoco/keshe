const express = require('express');
let app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/api', require('./api/index'));
app.use('/', express.static('./view/build'));

app.listen(80);
console.log('running at localhost:80');
