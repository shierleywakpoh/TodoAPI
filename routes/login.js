const express = require('express');
const router = express.Router();
let ree = require('../controllers/login');
//const app = express();



router.post('/register', ree.register);
router.post('/login',ree.login);
router.post('/refresh',ree.refresh);

/**
 * 
 */




module.exports = router;