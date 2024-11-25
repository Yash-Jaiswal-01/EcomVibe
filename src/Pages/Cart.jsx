import React, { useContext } from 'react'
import CartState from '../context/CartState'
import CartContext from '../context/CartContext'

import { BsCart4 } from "react-icons/bs";
import { Link } from 'react-router-dom';


const Cart = () => {
  let ctx = useContext(CartContext)
  console.log(ctx)
  let arr = ctx.cartArr

  let sum =0
  arr.forEach((ele)=>{
    sum = sum + ele.price ;
  })
 
  return (
    <div>
      

{arr.length>0 && 
  <div className="relative overflow-x-auto">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
      <tr>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Title
        </th>
        <th scope="col" className="px-6 py-3">
          Quantity
        </th>
        <th scope="col" className="px-6 py-3">
         Remove
        </th>
        <th scope="col" className="px-6 py-3">
         Price
        </th>
      </tr>
    </thead>
    <tbody>
     {
      arr.map((element,i)=>{
        return  <tr className="bg-white dark:bg-gray-800 text-center">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
         <img className='mx-auto' width={100} height={100} src={element.thumbnail} alt="" />
        </th>
        <td className="px-6 py-4">
         {element.title}
        </td>

       
        <td className="px-6 py-4 ">
         <button onClick={()=>ctx.updateItem(element,i)} className=' bg-blue-900 text-white rounded-sm py-2 px-2' >+</button> {element.quantity} 
          <button onClick={()=>ctx.removeItem(element,i)} className='  bg-blue-900 text-white rounded-sm py-2 px-2'>-</button>
        </td>
        
        <td className="px-6 py-4">

         <button onClick={()=>ctx.deleteItem(element,i)} className='bg-red-600 hover:bg-red-500 p-2 rounded-md text-white'>Delete</button>
        </td>
       
        <td className="px-6 py-4">
        ₹{element.price.toFixed(2)}
        </td>
      </tr>
    
     
     
      })
      
     }
    <Link to ='https://paytm.com'
      className='rounded-xl bg-yellow-600 text-white p-3 fixed  mt-10 right-0 gap-2'>TOTAL PAYABLE : ₹ {sum.toFixed(2)} </Link>
      
     
    </tbody>
   
    
  </table>
</div>
}
{arr.length ===0 && <h1 className=' text-2xl flex  justify-center gap-2 my-10'>Please add some item in the cart  <BsCart4 /> </h1> }


    </div>
  )
}

export default Cart
