import React, { useState } from 'react'
import './Chat.css'
import LogoSearch from '../../components/LogoSearch/LogoSearch'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { userChats } from '../../api/ChatRequest.js'
import Conversation from '../../components/Conversation/Conversation'
import { Link } from 'react-router-dom'
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Comment from '../../img/comment.png'
import { UilSetting } from '@iconscout/react-unicons'
import ChatBox from '../../components/ChatBox/ChatBox'
import {io} from 'socket.io-client'
import { useRef } from 'react'
const Chat = () => {
    const { user } = useSelector((state) => state.authReducer.authData)
    const [chats, setChats] = useState([])
    const [onlineUsers, setOnlineUsers] = useState([])
    const [currentChat,setCurrentChat] = useState(null)
    const [sendMessage,setSendMessage] = useState(null)
    const [receiveMessage,setReceiveMessage] = useState(null)
    const socket = useRef()

    // sending message to socket sercer
    useEffect(() =>{
        if(sendMessage !== null){
            socket.current.emit('send-message',sendMessage)
        }
    },[sendMessage])

    
    useEffect(() =>{
        socket.current = io('http://localhost:5000')
        socket.current.emit("new-user-add",user._id)
        socket.current.on("get-users",(users) =>{
            setOnlineUsers(users)
        })
    },[user])
    // receive message from socket sercer
    useEffect(() =>{
        socket.current.on('receive-message',(data) =>{
            console.log('message received in parent |Chat.jsx',data);
            setReceiveMessage(data)
        })
    },[])
    // console.log(user._id);
    // console.log(user);
    useEffect(() => {
        const getChats = async () => {
            try {
                const { data } = await userChats(user._id)
                setChats(data)

            } catch (e) {
                console.log('error');
                console.log(e);
            }
        }
        getChats();
    }, [user])

    const checkOnlineStatus= (chat) =>{
        const chatMember = chat.members.find((member) =>member !== user._id)
        const online = onlineUsers.find((user) => user.userId === chatMember)

        return online?true:false;
    }
    return (
        <div className="Chat">
            {/* Left Side */}
            <div className="Left-side-chat">
                <LogoSearch />
                <div className="Chat-container">
                    <h2>Chats</h2>
                    <div className="Chat-list">
                        {
                            chats.map((chat) => (
                                <div onClick={() => setCurrentChat(chat)}>
                                    <Conversation data={chat} currentUserId={user._id} key={chat._id} online={checkOnlineStatus(chat)} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            {/* Right Side */}
            <div className="Right-side-chat">
                <div style={{ width: '20rem', alignSelf: 'flex-end' }}>
                    <div className="navIcons">
                        <Link to='../home'>
                            <img src={Home} alt="" />
                        </Link>
                        <UilSetting />
                        <img src={Noti} alt="" />
                        <Link to='../chat'>
                            <img src={Comment} alt="" />
                        </Link>
                    </div>

                </div>
                {/* chat body */}

                <ChatBox 
                    chat ={currentChat} 
                    currentUser = {user._id}
                    setSendMessage = {setSendMessage} receiveMessage = {receiveMessage}
                />
            </div>
        </div>
    )
}

export default Chat