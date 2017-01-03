let express = require('express');
let router = express.Router();

router.get('/user', require('./user').usersearch);
router.get('/retribution', require('./retribution').research);

module.exports = router;