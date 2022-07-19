import React, { useState, useEffect, useContext } from 'react';
import api from '../api'
import { Context } from '../context/AuthContext'
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom'
import PostForm from '../components/PostForm';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri'
import DeletePost from '../components/DeletePost'
import EditPost from '../components/EditPost';

function Posts() {
  const [posts, setPosts] = useState([])
  const [deletePost, setDeletePost] = useState(false)
  const [editPost, setEditPost] = useState(false)
  const [postId, setPostId] = useState('')
  const [currentPost, setCurrentPost] = useState('')

  const { authenticated } = useContext(Context)
  const memberStatus = localStorage.getItem('memberStatus')
  const userId = localStorage.getItem('userId')
  const navigate = useNavigate()

  useEffect(() => {
    if (authenticated) {
      (async () => {
        const { data } = await api.get('/posts')
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

  return (
    <>
      <PostForm setPosts={setPosts} posts={posts}/>

      {!authenticated ? <Spinner /> : posts.map(post => (
        <>
          {deletePost && <DeletePost setDeletePost={setDeletePost} postId={postId} setPosts={setPosts} posts={posts}/>}
          {editPost && <EditPost setEditPost={setEditPost} postId={postId} setPosts={setPosts} posts={posts} currentPost={currentPost}/>}
          {memberStatus ? 
          <div className='post-details'>
            <h3 className='user'>User: {post.userName}</h3>
            {userId === post.userId ? <div className='delete-edit'>
              <button onClick={() => (setDeletePost(true), setPostId(post._id))} title='Delete post'>
                <RiDeleteBinLine /> 
              </button>
              <button onClick={() => (setEditPost(true), setPostId(post._id), setCurrentPost(post.post))} title='Edit post'>
                <RiEditLine /> 
              </button>
            </div> : ''}
          </div>
          : <div className='anonymous'>
              <p><strong>Anonymous user</strong> - <i>become a member to see who wrote this post</i> </p>
            </div>
          }

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