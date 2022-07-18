const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    post: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }, 
    userName: {
        type: String,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Post', postSchema);