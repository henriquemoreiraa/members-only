const registerUser = (req, res) => {
    res.json({ message: 'Register user' })
}

const loginUser = (req, res) => {
    res.json({ message: 'login user' })
}

const getUser = (req, res) => {
    res.json({ message: 'get user' })
}

const deleteUser = (req, res) => {
    res.json({ message: 'delete user' })
}

module.exports = {
    registerUser,
    loginUser,
    getUser,
    deleteUser
}