module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must have to sign in first!!!');
        return res.redirect('/user/login');
    }
    next();
}