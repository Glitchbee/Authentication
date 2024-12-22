const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { logics } = require('../controller/news');

router.route('/viewblogpost')
    .get(catchAsync(logics.displayBlogs))

module.exports = router;
