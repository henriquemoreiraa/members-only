const getPost = (req, res) => {
    res.json({ message: 'Get posts' })
}

const postPost = (req, res) => {
    res.json({ message: 'Post post' })
}

const putPost = (req, res) => {
    res.json({ message: 'Update post' })
}

const deletePost = (req, res) => {
    res.json({ message: 'delete post' })
}

module.exports = {
    getPost,
    postPost,
    putPost,
    deletePost
}