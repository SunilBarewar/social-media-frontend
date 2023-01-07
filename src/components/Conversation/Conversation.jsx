import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getUser } from '../../api/UserRequest'
import '../../pages/Chat/Chat.css'
const Conversation = ({ data, currentUserId ,online}) => {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUserId)

    // console.log(userId);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId)
        setUserData(data)
        // console.log(data)
      } catch (error) {
        console.log(error);
      }


    }
    getUserData();
  }, [])
  return (
    <>
    <div className='follwer conversation'>
        <div>
          {  online && <div className="online-dot"></div>}
          <img src={userData?.profilePicture? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture :process.env.REACT_APP_PUBLIC_FOLDER + 'defaultProfile.png'} alt="" className='follwerImage' style={{width:'50px',height:'50px'}}/>

          <div className="name" style={{fontSize:'0.8rem'}}>
            <span>{userData?.firstname} {userData?.lastname}</span>
            <span>{online?'Online':"Offline"}</span>
          </div>
        </div>
    </div>
    <hr/>
    </>
  )
}

export default Conversation