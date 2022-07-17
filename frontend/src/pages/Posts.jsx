import React, { useState, useEffect, useContext } from 'react';
import api from '../api'
import { Context } from '../context/AuthContext'
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom'

function Posts() {
  const [posts, setPosts] = useState([])

  const { authenticated } = useContext(Context)
  const navigate = useNavigate()

  useEffect(() => {
    if (authenticated) {
      (async() => {
        const { data } = await api.get('/api/posts')

        setPosts(data)
      })()
    }
  }, [authenticated === true])

  if (!localStorage.getItem('token')) {
    navigate('/login')
  }

  if (!authenticated) {
    return <Spinner />
  }

  console.log(posts)
  return (
    <>
      {posts.map(post => (
        <div>
          <h3>{post.userName}</h3>
          <p>{post.post}</p>
          <p>{post.createdAt.toLocaleString()}</p>
        </div>
      ))

      }
    </>
  )
}

export default Posts