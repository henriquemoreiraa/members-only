const express = require('express');
const router = express.Router();
const { registerUser, getUser, loginUser, deleteUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser)
router.get('/user', protect, getUser);

// router.route('/:id').get(categorieDetail).put(putCategories).delete(deleteCategories);

module.exports = router;