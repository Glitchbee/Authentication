
const { News } = require('../models/news');

module.exports.logics = {
    displayBlogs: async (req, res) => {
        const news = await News.find().populate({
            path: 'blog',
            populate: {
                path: 'author'
            }
        })

        // const news = await News.find().populate('blog')

        // console.log('And now...')
        // news.forEach(post => {
        //     post.blog.forEach(posts => {
        //         console.log(posts)
        //     })
        // })

        res.render('blog/post', {news})
    }
}


