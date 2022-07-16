const express = require('express');
const router = express.Router();
const { getPost, postPost, putPost, deletePost } = require('../controllers/postController');

// const { protect } = require('../middleware/authMiddleware');

router.route('/').get( getPost).post( postPost);

router.route('/:id').put( putPost).delete( deletePost);

module.exports = router;