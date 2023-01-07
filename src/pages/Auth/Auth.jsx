import React from 'react'
import './Auth.css'
import Logo from '../../img/logo.png'
import { useState } from 'react'

import {useDispatch, useSelector} from 'react-redux'
import { logIn, signUp } from '../../actions/AuthAction.js'




const Auth = () => {

  const [isSignUp, setIsSignUp] = useState(true)
  const dispatch = useDispatch();
  const loading = useSelector((state) =>state.authReducer.loading)
  const [data,setData] = useState({
        firstname:"",
        lastname:"",
        password:"",
        confirmpass:"",
        username:""
  })


  const [confirmPass,setConfirmPass] = useState(true)

  const handleChange = (e) =>{
    setData({...data,[e.target.name]:e.target.value})
  }
  const handleSubmit =(e) =>{
    e.preventDefault();
    if(isSignUp){
      // signUp and logIn are Actions 
      (data.password === data.confirmpass)? dispatch(signUp(data)) :setConfirmPass(false)
    }else{
      dispatch(logIn(data))
    }
  }

  const resetForm = () =>{
    setConfirmPass(true)
    setData({firstname:"",lastname:"",password:"",confirmpass:"",username:""})
  }
  return (
    <div className='Auth'>
      {/* Leftside */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>ZKC Media</h1>
          <h6>Explore the ideas throughout the world!</h6>
        </div>
      </div>
      {/* Rightside */}
      <div className="a-right">
        <form className='infoForm authForm' onSubmit={handleSubmit}>

          <h3>{isSignUp ? "Sign up" : "Log In"}</h3>
          {isSignUp &&
            <div>
              <input
                type="text"
                name="firstname"
                placeholder='First Name'
                className='infoInput'
                onChange={handleChange}
                value = {data.firstname}
                />
              <input
                type="text"
                name="lastname"
                placeholder='last Name'
                className='infoInput'
                onChange={handleChange}
                value = {data.lastname}
                />
            </div>
          }


          <div>
            <input
              type="text"
              name="username"
              placeholder='Username'
              className='infoInput'
              onChange={handleChange}
              value = {data.username}
              />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder='Password'
              className='infoInput'
              value = {data.password}
              onChange={handleChange}
              />
            {isSignUp && <input
              type="password"
              name="confirmpass"
              placeholder='Confirm Password'
              className='infoInput'
              onChange={handleChange}
              value = {data.confirmpass}
              />}
          </div>

              <span style={{display: confirmPass? "none":"block",color : 'red',fontSize:'12px',alignSelf:"flex-end",marginRight:"5px"}}>
                * Confirm Password is not same
              </span>
          <div>
            <span style={{ fontSize: '15px', cursor: 'pointer' }} onClick={() =>{ setIsSignUp((prev) => !prev); resetForm()}}>{isSignUp ? "Already have an account. Login!" : "Don't have an account. SignUp!"}</span>
          </div>
          <button className="button infoButton" type="submit" disabled = {loading}>{loading ? "Loading...": isSignUp ? "Signup" : "Login"}</button>
        </form>
      </div>
    </div>
  )
}



export default Auth