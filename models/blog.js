const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    author: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports.Blog = mongoose.model('Blog', blogSchema);

