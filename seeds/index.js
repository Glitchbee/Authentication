const mongoose = require('mongoose');
const { User, Info } = require('../models/user');
const { Blog } = require('../models/blog');

async function connectDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/AuthenticationDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

async function reSeed() {
    try {
        const result = await Promise.all([
            User.deleteMany({}),
            Info.deleteMany({}),
            Blog.deleteMany({})
        ]);
        console.log(result);
    } catch (err) {
        console.error('Error during reseeding:', err);
    }
}

connectDB().then(() => {
    reSeed().then(() => {
        console.log('Reseeding completed');
        mongoose.connection.close();
    }).catch(err => {
        console.error('Reseeding failed:', err);
        mongoose.connection.close();
    });
}).catch(err => console.error('Failed to connect to MongoDB:', err));