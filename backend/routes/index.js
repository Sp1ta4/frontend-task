const express = require('express');
const router = express.Router();
const main = require('./main.js')

/* GET home page. */
router.use('/', main);

module.exports = router;
