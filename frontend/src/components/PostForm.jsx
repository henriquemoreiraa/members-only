import React, { useContext, useState } from 'react'
import { Context } from '../context/AuthContext'
import api from '../api'
import { RiSendPlaneFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

function PostForm({ setPosts, posts }) {
    const [post, setPost] = useState('')
    const memberStatus = localStorage.getItem('memberStatus')

    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault()
    
        handlePost()
      }
      
    const handlePost = async () => { 
        
        const { data } = await api.post('/api/posts/', {
            post,
        })
        setPosts([{
            post: data.post,
            userName: data.userName,
            createdAt: data.createdAt,
            _id: data._id,
        }, ...posts])
        setPost('')
    }
        
    

  return (
    <section className='form postForm'>
        <h1>{memberStatus ? 'Create new post' : 'Become a member to start creating posts!' }</h1>
        {memberStatus ?
        <>
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
                        autoFocus
                        placeholder='What are you thinking?'
                    />
                </div>
                <div className="form-btn">
                    <button className='btn btn-post' type='submit'>Post</button>
                </div>
            </form>
        </>
        : ''}
    </section>
  )
}

export default PostForm