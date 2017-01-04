let express = require('express');
let router = express.Router();

router.get('/user/search', require('./user/search').usersearch);
router.get('/user/insert', require('./user/insert').userinsert);


module.exports = router;