const express = require('express');
const router = express.Router();
const { registerUser, getUser, loginUser, deleteUser } = require('../controllers/userController');

router.route('/').post(registerUser);
router.route('/login').post(loginUser)
router.route('/user').get(getUser)

// router.route('/:id').get(categorieDetail).put(putCategories).delete(deleteCategories);

module.exports = router;