import React from 'react';
import logo from "./logo-ai-without-slogan.png";
import "./Header.css";



 function Header() {
  return (
    <div className='Header'>
        <div className='Header_Container'>
            <p>Your voice, our technology, a powerful combination.</p>
            <img id='logo_header' src={logo} alt="" />
        </div>
    </div>
  )
}

export default Header;
