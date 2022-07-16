const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../modules/userModules');

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
            member_status: user.member_status,
            token: generateToken(user._id)
        });

    } else {
        res.status(400);
        throw new Error('Invalid user data')
    };
});

const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    
    if (user && (await bcrypt.compare(password, user.password))) {

        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            member_status: user.member_status,
            token: generateToken(user._id)
        });
    
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    };
    
});

const getUser = asyncHandler( async (req, res) => {
    res.status(200).json(req.user);
});

const deleteUser = asyncHandler( async (req, res) => {
    res.json({ message: 'delete user' });
});

const generateToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = {
    registerUser,
    loginUser,
    getUser,
    deleteUser,
};