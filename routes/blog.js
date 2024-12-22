const express = require('express');
const router = express.Router();
const { logics } = require('../controller/blog');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isBlogAuthor } = require('../middleware');

router.route('/:id/newblog')
    .get(isLoggedIn, logics.renderBlog)
    .post(catchAsync(logics.createNewBlog))



router.route('/:id/blog/:blogId')
    .delete(isLoggedIn, isBlogAuthor, catchAsync(logics.deleteBlog))


module.exports = router;