const express = require('express');
const router = express.Router();
const { getPost, postPost, putPost, deletePost } = require('../controllers/postController');

router.route('/').get(getPost).post(postPost);

router.route('/:id').put(putPost).delete(deletePost);

module.exports = router;