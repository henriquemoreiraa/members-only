import React from 'react'
import api from '../api'

function DeletePost({ setDeletePost, postId, setPosts, posts }) {
    const handleDelete = async () => {       
        const { data } = await api.delete(`/api/posts/${postId}`)

        const deletedPost = posts.filter(post => post._id !== data.id)
        setPosts(deletedPost)
    }

  return (
    <div className='loadingSpinnerContainer'>
        <div className='containerDE'>
            <h1>Are you sure you want to delete this post?</h1>
            <button>Cancel</button>
            <button onClick={() => (handleDelete(), setDeletePost(false))}>Delete</button>
        </div>
    </div>
  )
}

export default DeletePost