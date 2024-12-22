const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        unique: true
    },

    addlInfo: [{ type: Schema.Types.ObjectId, ref: 'Info' }],

})


const infoSchema = new Schema({
    education: {
        type: String,
        required: true,
        enum: ['Btech', 'Mtech', 'Barc', 'MBBS', 'Bsc', 'BBA']
    },
    hobbies: {
        type: [String],
        required: true
    }
})

userSchema.plugin(passportLocalMongoose);

module.exports.Info = mongoose.model('Info', infoSchema);
module.exports.User = mongoose.model('User', userSchema);

