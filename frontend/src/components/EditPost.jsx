import { useState } from 'react'
import api from '../api'
import { RiSendPlaneFill } from 'react-icons/ri'

function EditPost({ setEditPost, postId, setPosts, posts, currentPost }) {
    const [post, setPost] = useState(currentPost)
    
    const onSubmit = (e) => {
        e.preventDefault()
    
        handlePut()
        setEditPost(false)
    }

    const handlePut = async () => { 
    
        const { data } = await api.put(`/api/posts/${postId}`, {
            post,
        })
           
        setPosts([{
            post: data.post,
            userName: data.userName,
            updatedAt: data.updatedAt,
            _id: data._id,
        }, ...posts])
        setPost('')
    }

  return (
    <div className='loadingSpinnerContainer'>
        <div className='containerDE containerE'>
            <h1>Update your post</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text"></label>
                    <textarea
                        rows={5}
                        type="post"
                        name='post'
                        id='post'
                        value={post}
                        onChange={(e) => setPost(e.target.value)}
                        className='text-post'
                        required
                    />
                </div>
                <button>Cancel</button>
                <button type='submit'>Update</button>                    
            </form>
        </div>
    </div>
  )
}

export default EditPost