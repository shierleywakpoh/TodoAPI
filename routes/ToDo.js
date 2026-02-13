const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const todo = require('../controllers/ToDo');
const rateLimit = require("../middlewares/rateLimitng")
const throttling = require("../middlewares/throttling")


router.post('/todos', auth,rateLimit, todo.create);
router.put('/todos/:id',auth,rateLimit,todo.update);
router.delete('/todos/:id',auth,rateLimit,todo.dlt);
router.get("/todos",auth,throttling,rateLimit,todo.pfs);
//router.get("/todos",auth,todo.filter);


module.exports = router;