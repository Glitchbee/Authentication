const { User } = require('../models/user');
const { Blog } = require('../models/blog');
const { News } = require('../models/news');

module.exports.logics = {

    renderBlog: async (req, res) => {
        const { id } = req.params;
        const user = await User.findById(id);
        res.render('userInfo/blog', { user });
    },

    createNewBlog: async (req, res) => {
        const { content } = req.body;
        const newPost = new Blog({ content });
        newPost.author = req.user._id;
        const exUser = await News.findOne({ author: req.user._id });
        if (exUser) {
            exUser.blog.push(newPost);
        }
        await Promise.all([newPost.save(), exUser.save()]);
        req.flash('success', 'Created a new blog successfully...')
        res.redirect('/user/secret');
    },

    deleteBlog: async (req, res) => {
        const { id, blogId } = req.params;
        await Blog.findByIdAndDelete(blogId);

        const news = await News.findOne({ author: id });
        if (news) {
            news.blog.pull(blogId);
            await news.save();
        }

        req.flash('success', 'Deleted a blog successfully...');

        res.redirect('/user/secret')
    }
}