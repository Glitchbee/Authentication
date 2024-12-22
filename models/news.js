const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Blog } = require('./blog');

const blogListSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    blog: [{ type: Schema.Types.ObjectId, ref: 'Blog' }]
})

module.exports.News = mongoose.model('News', blogListSchema);