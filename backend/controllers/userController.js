const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../modules/userModules');
const { use } = require('../routes/userRoutes');

const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields')
    };

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        member_status: false
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            member_status: user.member_status
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data')
    };
});

const loginUser = asyncHandler( async (req, res) => {
    res.json({ message: 'login user' });
});

const getUser = asyncHandler( async (req, res) => {
    res.json({ message: 'get user' });
});

const deleteUser = asyncHandler( async (req, res) => {
    res.json({ message: 'delete user' });
});

module.exports = {
    registerUser,
    loginUser,
    getUser,
    deleteUser
};