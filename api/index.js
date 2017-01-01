let express = require('express');
let router = express.Router();

router.get('/user', require('./user').get);

module.exports = router;