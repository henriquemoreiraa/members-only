const express = require('express');
const router = express.Router();
const { getPost, postPost, putPost, deletePost } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getPost).post(protect, postPost);

router.route('/:id').put(protect, putPost).delete(protect, deletePost);

module.exports = router;