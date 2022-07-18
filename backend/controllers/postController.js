const Post = require('../modules/postModules');
const asyncHandler = require('express-async-handler');
const User = require('../modules/userModules');

const getPost = asyncHandler(async (req, res) => {
    const posts = await Post.find();

    res.status(200).json(posts);
})

const postPost = asyncHandler(async (req, res) => {
    if (!req.body.post) {
        res.status(400);
        throw new Error('Please add a post');
    };

    const user = await User.findById(req.user.id);

    const post = await Post.create({
        post: req.body.post,
        userName: user.name, 
        userId: req.user.id
    });

    res.status(200).json(post);
})

const putPost = asyncHandler(async (req, res) => {
    const postId = await Post.findById(req.params.id);

    if (!postId) {
        res.status(400);
        throw new Error('Post not fount');
    };

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });

    res.status(200).json(updatedPost);
})

const deletePost = asyncHandler(async (req, res) => {
    const postId = await Post.findById(req.params.id);

    if (!postId) {
        res.status(400);
        throw new Error('Post not found');
    };

    await postId.remove();

    res.status(200).json({id: req.params.id});
})

module.exports = {
    getPost,
    postPost,
    putPost,
    deletePost
}