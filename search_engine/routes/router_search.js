const path = require('path');
const express = require('express');
const isAuth = require('../middleware/is-auth');
const router = express.Router();
const searchController = require("../controller/controller_search");
module.exports = router;
router.get('/index', isAuth, searchController.getIndex);