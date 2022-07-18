const express = require('express');
const router = express.Router();
const { registerUser, getUser, loginUser, deleteUser, putUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser)
router.get('/user', protect, getUser);
router.route('/:id').put(protect, putUser).delete(protect, deleteUser);

module.exports = router;