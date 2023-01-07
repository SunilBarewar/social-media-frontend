import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { addMessage, getMessages } from '../../api/MessageRequest'
import { getUser } from '../../api/UserRequest'
import InputEmoji from 'react-input-emoji'
import './ChatBox.css'
import {format} from 'timeago.js'
import { useRef } from 'react'

const ChatBox = ({chat,currentUser,setSendMessage,receiveMessage}) => {
    const [userData,setUserData] =useState(null)
    const [messages,setMessages] =useState([])
    const [newMessage,setNewMessage] =useState('null')

    const scroll = useRef()

    useEffect(() =>{
        if(receiveMessage !== null && receiveMessage.chatId === chat._id){
            // console.log("data received in Child ChatBox",receiveMessage);
            setMessages([...messages,receiveMessage])
        }
    },[receiveMessage])


    const handleChange = (newMessage) =>{
        setNewMessage(newMessage)
    }
    
    // fetching data for header
    useEffect(() =>{
        const userId = chat?.members.find((id) => id !== currentUser)

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

        if(chat !== null)getUserData();
    },[chat,currentUser])

    useEffect(() =>{
        const fetchMessages = async() =>{

            try {
                const {data} = await getMessages(chat._id) 
                setMessages(data)
                // console.log(data);
            } catch (error) {
                console.log(error);
            }
        }

        if(chat !== null) fetchMessages();
    },[chat])
    
    const handleSend = async(e) =>{
        const message = {
            senderId:currentUser,
            text:newMessage,
            chatId:chat._id
        }
        // send message to database
        
        try {
            const {data} = await addMessage(message);
            setMessages([...messages,data])
            setNewMessage("")
        } catch (error) {
            console.log(error)
        }

        // send message to socket server

        const receiverId = chat.members.find((id) => id !== currentUser);
        setSendMessage({...message,receiverId})
    }

    // Always scroll to last message
    useEffect(() =>{
        scroll.current?.scrollIntoView({behavior: "smooth"})
    },[messages])
  return (
    <div className="ChatBox-container">
        {chat?(

       
        <>
        <div className="chat-header">
        <div className='follwer conversation'>
        <div>
          <img src={userData?.profilePicture? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture :process.env.REACT_APP_PUBLIC_FOLDER + 'defaultProfile.png'} alt="" className='follwerImage' style={{width:'50px',height:'50px'}}/>

          <div className="name" style={{fontSize:'0.8rem'}}>
            <span>{userData?.firstname} {userData?.lastname}</span>
            <span>Online</span>
          </div>
        </div>
    </div>
    <hr style={{width:'85%',border:'0.5px solid #ececec'}}/>
        </div>
        
        {/* chatBox Messages */}

        <div className="chat-body">
            {
                messages.map((message) =>(
                    <>
                    <div ref={scroll}
                    className= {message.senderId === currentUser ? "message own" :'message'}>
                        <span>{message.text}</span>
                        <span>{format(message.createdAt)}</span>
                    </div>
                    </>
                ))
            }
        </div>
        {/* chat sender */}
        <div className="chat-sender">
            <div>+</div>
            <InputEmoji
            value = {newMessage}
            onChange={handleChange}
            />
            <div className="send-button button" onClick={handleSend}>send</div>
        </div>
        </> 
        ):(
            <span className='chatbox-empty-message'>Tap on a Chat to start Conversatoin...</span>
        )}
    </div>
  )
}

export default ChatBox