import React from 'react'
import CartContext from './CartContext'
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CartState = (props) => {
  const [cartArr, setcartArr] = useState([]);
  const [searchValue , setSearchValue] = useState([]);
    function addCartitem (obj){
      console.log(obj)
      obj.quantity = 1
    let findObj = cartArr.find((ele)=>ele.id===obj.id)
    if(findObj){
      toast.error('Item is already exist in cart')
    }
    else{
    toast.success('Item is added successfully')
  setcartArr([...cartArr ,obj])
}
    }
    // let navigate = useNavigate()
 function buyItem (obj){
      console.log(obj)
      obj.quantity = 1
    let findObj = cartArr.find((ele)=>ele.id===obj.id)
    if(findObj){
      toast.error('Item is already exist in cart')
    }
    else{
    toast.success('Item is added successfully')
  setcartArr([...cartArr ,obj])
  // navigate('/cart')
  
  
  

}
    }
    function updateItem (obj,ind) {
      console.log(ind)
      let updatedObj = {
        ...obj,
        quantity:obj.quantity+1,
        price: obj.price + obj.price / obj.quantity  
      }

      let updatedCart = [...cartArr]
      updatedCart[ind] = updatedObj
      setcartArr (updatedCart)

    }
    function updateItem (obj,ind) {
      console.log(ind)
      let updatedObj = {
        ...obj,
        quantity:obj.quantity+1,
        price: obj.price + obj.price / obj.quantity  
      }

      let updatedCart = [...cartArr]
      updatedCart[ind] = updatedObj
      setcartArr (updatedCart)

    }
    function removeItem (obj,ind) {
      console.log(ind)
      let updatedObj = {
        ...obj,
        quantity:obj.quantity-1,
        price: obj.price - obj.price / obj.quantity  
      }
      if (obj.quantity>1){
      let updatedCart = [...cartArr]
      updatedCart[ind] = updatedObj
      setcartArr (updatedCart)
      }
     }
     function deleteItem (obj){
      let updatedCart = cartArr.filter((ele)=>ele.id!==obj.id)
     setcartArr(updatedCart)
    }
   


 
  return (
    <CartContext.Provider value={{addCartitem ,cartArr , setcartArr , updateItem ,removeItem , deleteItem , searchValue , setSearchValue ,buyItem}}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartState
