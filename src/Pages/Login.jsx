// src/components/LoginForm.js
import React, { useContext, useRef, useState } from 'react';
import UserContext from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'

const Login = () => {
  

  let ctx = useContext(UserContext);

  let emailRef = useRef()
  let passwordRef = useRef()
  let navigate = useNavigate()

  let arr = JSON.parse(localStorage.getItem('EcomHub'))
  console.log(arr)
  
  
  


  const handleSubmitLog = (e) => {
    e.preventDefault();
    // Handle login logic here
    // console.log('Email:', email);
    // console.log('Password:', password);
  

  let obj ={
    email: emailRef.current.value,
    password: passwordRef.current.value
  }
  console.log(obj)

  let existingUser = arr.find((ele)=>ele.email === obj.email);
  console.log(existingUser)

  if(existingUser){
    if(existingUser.password === obj.password){
    toast.success('login successfully')
    ctx.loginUser({ Login:true , email:existingUser.email})
    navigate('/')
  }
  else{
   toast.error('invalid email or password')
  }
}
else{
 toast.error('invalid email or password')
}
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form 
        
        className="bg-white shadow-md rounded px-8 py-6 mb-4 w-80"
      >
        <h1 className="text-xl font-bold mb-4 text-center">Login</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input

            id="email"
            type="email"
            
            ref={emailRef}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="you@example.com"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
          ref={passwordRef}
            id="password"
            type="password"
            
           
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="********"
          />
        </div>
        <button
        onClick={handleSubmitLog}
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Login
        </button>
        <p className='mt-4 text-sm text-center'>Don't have an account?
        <Link to="/signup" className='text-blue-600'>Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
