import { useContext, useState } from 'react'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Navbar from './Components/Navbar'
import Login from './Pages/Login'
import Signup from './Pages/Signup'

import Cart from './Pages/Cart'
import Services from './Pages/Services'
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import CartContext from './context/CartContext'
import UserContext from './context/UserContext'





function App() {
 let ctx = useContext(CartContext)
 let ctxUser = useContext(UserContext)

 let loginValue = ctxUser.user.login
 console.log(loginValue)


  const [cartArr , setcartArr] = useState([])
  console.log(cartArr)

  function xyz(ans){
    
   
  //  setcartArr(ans) // setcartArr(ans) can replace only cartArr items but we want it should be replacable with  the old arr and add items so
   let copycartArr = [...cartArr,ans]
   setcartArr(copycartArr)
   
  }

  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={loginValue===true?  <Home/>: <Navigate to="/login"/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/login' element={loginValue===false ? <Login/>: <Navigate to='/'/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/services' element={<Services/>}/>
      <Route path='/cart' element={loginValue===true ? <Cart/>: <Navigate to='/login'/>}/>
      
      
     
     


   


       
        
     
    </Routes>

    <ToastContainer />
    </BrowserRouter>
    </>
  )
}

export default App
