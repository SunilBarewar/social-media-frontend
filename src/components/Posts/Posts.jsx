import React, { useEffect } from 'react'
import "./Posts.css"

// import {PostsData} from '../../Data/PostData'
import Post from '../Post/Post'
import { useDispatch,useSelector } from 'react-redux'
import { getTimeLinePosts } from '../../actions/postAction'
import {useParams} from 'react-router-dom'



const Posts = () => {
  const dispatch = useDispatch()
  const {user} =  useSelector((state) =>state.authReducer.authData)
  let {posts,loading} = useSelector((state) => state.postReducer)

  useEffect(() => {
    dispatch(getTimeLinePosts(user._id))
  }, [])
  
  const params = useParams();
  if(!posts) return 'no posts';
  if(params.id) posts = posts.filter((post) => post.userId === params.id);
  

  
  return (
    <div className='Posts'>
        {loading
          ?"Fetching Posts..."
           : posts.map((post,id) =>{
                return <Post data = {post} id ={id} key = {id}/>
            })
        }
    </div>
  )
}

export default Posts