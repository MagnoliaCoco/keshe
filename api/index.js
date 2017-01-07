let express = require('express');
let router = express.Router();

router.get('/user/login', 
    require('./user/search').userlogin);

router.get('/user/search', 
    require('./user/search').usersearch);
router.get('/user/insert', 
    require('./user/insert'));
router.get('/user/delete',
    require('./user/delete'));
router.get('/user/update',
    require('./user/update'));

router.get('/retribution/search', 
    require('./retribution/search'));
router.get('/retribution/insert', 
    require('./retribution/insert'));
router.get('/retribution/delete',
    require('./retribution/delete'));
router.get('/retribution/update',
    require('./retribution/update'));


router.get('/role/search', 
    require('./role/search'));
router.get('/role/insert', 
    require('./role/insert'));
router.get('/role/delete',
    require('./role/delete'));

module.exports = router;