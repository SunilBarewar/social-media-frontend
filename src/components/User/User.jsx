
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import { followUser, unfollowUser } from '../../actions/userAction.js';
import { useState } from 'react';

export const User = ({person}) => {
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
    const dispatch = useDispatch();
    const {user} = useSelector((state) =>state.authReducer.authData)
    const [following,setFollowing] = useState(person.followers.includes(user._id))
    const handleFollow = () =>{
        following
        ?dispatch(unfollowUser(person._id,user))
        :dispatch(followUser(person._id,user))

        setFollowing((prev) => !prev);

    }
    return (
        <div className='follower'>
            <div>
                <img src ={person.coverPicture? serverPublic + person.profilePicture : serverPublic + 'defaultProfile.png'} className= 'followerImg' alt=""  />
                <div className='name'>
                    <span>{person.firstname}</span>
                    <span>{person.username}</span>
                </div>
            </div>
            <button className={following ?'button fc-button UnfollowButton':'button fc-button'} onClick={handleFollow}>{following ?"Unfollow":"Follow"}</button>
        </div>
    )
}
