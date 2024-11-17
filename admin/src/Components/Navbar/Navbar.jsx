import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/Admin_Assets/nav_logo.svg'
import navprofile from '../../assets/Admin_Assets/navprofile.svg'

const Navbar = () => {
    return (
        <div className='navbar'>
        <img src={navlogo} alt="" className="nav_logo" />
        <img src={navprofile} alt="" className='nav_profile'/>
        </div>
    )
}

export default Navbar
