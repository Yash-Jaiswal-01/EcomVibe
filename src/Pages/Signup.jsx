// src/components/SignupForm.js
import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
const Signup = () => {
  


  let nameRef = useRef()
  let emailRef = useRef()
  let passwordRef = useRef()

  let navigate = useNavigate();
  let arr = JSON.parse(localStorage.getItem('EcomHub')) || []
  console.log(arr)
  

  const handleSubmit = (e) => {
    e.preventDefault();
    let obj ={
      name:nameRef.current.value,
      email:emailRef.current.value,
      password:passwordRef.current.value
    
    }
    console.log(obj)

    let existingUser = arr.find((ele)=>ele.email === obj.email);
    if(existingUser){
      toast.error('Email already exists',{position:'top-center', theme:'dark'})
    }
    else {
      arr.push(obj)
      localStorage.setItem('EcomHub', JSON.stringify(arr))
      toast.success('user registered successfully',{position:'top-center', theme:'dark'})
      navigate('/login')
    }
     

   

 
  };
 

  


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form 
       
        className="bg-white shadow-md rounded px-8 py-6 mb-4 w-80"
      >
        <h1 className="text-xl font-bold mb-4 text-center">Sign Up</h1>
        { <p className="text-red-500 text-sm mb-4"></p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            ref={nameRef}
            type="text"
           
           
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Your username"
          />
        </div>
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
            id="password"
            type="password"
            ref={passwordRef }
          
           
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="********"
          />
        </div>
       
        <button 
          onClick={handleSubmit}
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Sign Up
        </button>
        <p className='mt-4 text-sm text-center'>Already have an account?
          <Link to="/login" className='text-blue-600'>Login</Link></p>
      </form>
    </div>
  );
};

export default Signup;