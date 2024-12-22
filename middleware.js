const { Blog } = require('./models/blog');


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must have to sign in first!!!');
        return res.redirect('/user/login');
    }
    next();
}


module.exports.isBlogAuthor = async (req, res, next) => {
    const { id, blogId } = req.params;
    const userBlog = await Blog.findById(blogId);
    if (!userBlog.author.equals(req.user._id)) {
        req.flash('error', 'You are not authorized to make changes!!!');
        return res.redirect('/user/secret');
    }
    next();
}