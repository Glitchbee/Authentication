const express = require('express');
const router = express.Router();
const { logics } = require('../controller/user');
const { blogLogic } = require('../controller/blog');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const { isLoggedIn } = require('../middleware');

// Demo
// router.get('/demoauth', logics.demoHash);

router.route('/secret')
    .get(isLoggedIn, logics.info);

router.route('/register')
    .get(logics.renderRegister)
    .post(catchAsync(logics.createNewUser));


router.route('/login')
    .get(logics.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/user/login', keepSessionInfo: true }), logics.authUserLogin)


router.route('/logout')
    .post(logics.authUserLogout)


router.route('/:id/moreinfo')
    .get(isLoggedIn, catchAsync(logics.renderMoreInfo))
    .post(catchAsync(logics.addMoreUserInfo));



// router.route('/:id/newblog')
//     .get(isLoggedIn, logics.renderBlog)

module.exports = router;