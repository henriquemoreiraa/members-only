const Post = require('../modules/postModules');
const asyncHandler = require('express-async-handler');
const { post } = require('../routes/userRoutes');

const getPost = asyncHandler(async (req, res) => {
    const posts = await Post.find();

    res.status(200).json(posts);
})

const postPost = asyncHandler(async (req, res) => {
    if (!req.body.post) {
        res.status(400);
        throw new Error('Please add a post');
    };

    const post = await Post.create({
        post: req.body.post,
        user: req.user.id
    });

    res.status(200).json(post);
})

const putPost = asyncHandler(async (req, res) => {
    res.json({ message: 'Update post' })
})

const deletePost = asyncHandler(async (req, res) => {
    res.json({ message: 'delete post' })
})

module.exports = {
    getPost,
    postPost,
    putPost,
    deletePost
}