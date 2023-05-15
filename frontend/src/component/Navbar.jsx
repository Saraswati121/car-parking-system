import React from 'react'
import "./style.css"
import { useNavigate} from "react-router-dom";

export const Navbar = () => {
    const nav = useNavigate()
  return (
    <div id='navbar'>
        <div className='love'>
           <img src="https://images.unsplash.com/photo-1604063155785-ee4488b8ad15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBhcmtpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="" width="100px" height="50px"/> 
           <p>Parking</p>
        </div>
        <div className='love'>
            <a href="/about">About</a>
            <button className="btn" onClick={()=>nav('/') }>Logout</button>
        </div>
    </div>
  )
}
