// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../context/CartContext';
import { useContext } from 'react';
import UserContext from '../context/UserContext';



const Navbar = () => {

  let ctx = useContext (CartContext)
  let ctxUser = useContext(UserContext)
  console.log(ctxUser)
  let login = ctxUser.user.login

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleSearchChange =(e)=>{
    console.log(e.target.value)
    ctx.setSearchValue(e.target.value.toLowerCase())
  }

  return (
    <nav className="bg-gray-600 p-2">
      <div className="container mx-auto flex justify-between items-center">
     

        <div className="text-white text-lg font-bold flex">  <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
</svg>Ecom Vibe </div>
        {/* Search Bar */}
       {login === true && <div className="relative flex ">
          <input onChange={handleSearchChange}
            type="text"
            placeholder="Search..."
            className="bg-slate-50 text-black rounded-full  w-24 sm:w-28 md:w-36 lg:w-48 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          
          />
         

        </div>}

         {/* Desktop Navigation */}
         <div className="hidden md:flex space-x-4">
          {login === true && <Link to="/" className="text-gray-300 hover:text-white">Home</Link>}
          {login === true &&  <Link to="/cart" className="text-gray-300 hover:text-white">Cart <sup>{ctx.cartArr.length}</sup> </Link>}
          {login === true && <Link to="/services" className="text-gray-300 hover:text-white">Services</Link>}
         {login === true && <Link to="/about" className="text-gray-300 hover:text-white">About</Link>}
          
          <div className="relative flex gap-10">
            <button
              onClick={toggleDropdown}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              Account
            </button>
         <Link to='https://deepai.org'>
         <p className='flex text-violet-400 gap-1'> <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.872 9.687 20 6.56 17.44 4 4 17.44 6.56 20 16.873 9.687Zm0 0-2.56-2.56M6 7v2m0 0v2m0-2H4m2 0h2m7 7v2m0 0v2m0-2h-2m2 0h2M8 4h.01v.01H8V4Zm2 2h.01v.01H10V6Zm2-2h.01v.01H12V4Zm8 8h.01v.01H20V12Zm-2 2h.01v.01H18V14Zm2 2h.01v.01H20V16Z"/>
</svg> AI</p>
         </Link>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-8 w-48 bg-white rounded-md shadow-lg z-20">
                {login===false &&<Link to="/signup" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Sign Up</Link>}
                {login===false &&<Link to="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Login</Link>}
                {login===true&&<Link to="" onClick={()=>ctxUser.logout()} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</Link>}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleDropdown} className="text-white focus:outline-none">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      <div className={`md:hidden ${isDropdownOpen ? "block" : "hidden"} mt-2`}>
        <Link to="/" className="block px-4 py-2 text-gray-300 hover:bg-gray-700">Home</Link>
        <Link to="/cart" className="block px-4 py-2 text-gray-300 hover:bg-gray-700">Cart</Link>
        <Link to="/about" className="block px-4 py-2 text-gray-300 hover:bg-gray-700">About</Link>
       {login===false && <Link to="/signup" className="block px-4 py-2 text-gray-300 hover:bg-gray-700">Sign Up</Link>}
       {login===false && <Link to="/login" className="block px-4 py-2 text-gray-300 hover:bg-gray-700">Login</Link>}
        
        {login===true&&<Link to="" onClick={()=>ctxUser.logout()} className="block px-4 py-2 text-gray-300 hover:bg-gray-700">Logout</Link>}
      
      </div>
    </nav>
  );
};

export default Navbar;