import React, { useState, useEffect } from 'react';
import api from '../api'

function Posts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    (async() => {
      const { data } = await api.get('/api/posts')

      setPosts(data)
    })()
  }, [])

  return (
    <div>Posts</div>
  )
}

export default Posts