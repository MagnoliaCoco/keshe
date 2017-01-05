let express = require('express');
let router = express.Router();

router.get('/user/login', 
    require('./user/search').userlogin);

router.get('/user/search', 
    require('./user/search').usersearch);
router.get('/user/insert', 
    require('./user/insert').userinsert);
router.get('/user/delete',
    require('./user/delete'));

router.get('/retribution/search', 
    require('./retribution/search').research);
router.get('/retribution/insert', 
    require('./retribution/insert').reinsert);
router.get('/retribution/delete',
    require('./retribution/delete'));


router.get('/role/search', 
    require('./role/search').rolesearch);
router.get('/role/insert', 
    require('./role/insert').roleinsert);
router.get('/role/delete',
    require('./role/delete'));

module.exports = router;