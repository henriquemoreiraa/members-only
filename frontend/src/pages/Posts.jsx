import React, { useState, useEffect, useContext } from 'react';
import api from '../api'
import { Context } from '../context/AuthContext'
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom'
import PostForm from '../components/PostForm';

function Posts() {
  const [posts, setPosts] = useState([])

  const { authenticated } = useContext(Context)
  const memberStatus = localStorage.getItem('memberStatus')
  const navigate = useNavigate()

  useEffect(() => {
    if (authenticated) {
      (async () => {
        const { data } = await api.get('/api/posts')
        const posts = []
        for (let i in data) {
          posts.unshift(data[i])
        } 
        
        setPosts(posts)
      })()
    }
  }, [authenticated === true])

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    } 
  }, [])

  if (!authenticated) {
    return <Spinner />
  }

  return (
    <>
      <PostForm setPosts={setPosts} posts={posts}/>

      {posts.map(post => (
        <>
          {memberStatus ? <h3 className='user'>User: {post.userName}</h3> : <div className='anonymous'><p><strong>Anonymous user</strong> - <i>become a member to see who wrote this post</i> </p></div>}
          <div className='posts' key={post._id}>
            <p>{post.post}</p>
            <p className='date'>{new Date(post.createdAt).toLocaleString()}</p>
          </div>
        </>
      ))

      }
    </>
  )
}

export default Posts