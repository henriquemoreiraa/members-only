const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    post: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Post', postSchema);