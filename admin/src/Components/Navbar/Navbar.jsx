// import React from 'react';
import './Navbar.css'
import navlogo from '../../assets/Admin_Assets/big_logo.png'
import navprofile from '../../assets/Admin_Assets/nav-profile.svg'

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='navbaricon'>
                <img src={navlogo} alt="" className="nav_logo" />
                <h1>WearBy</h1>
            </div>
            <div>
                <img src={navprofile} alt="" className='nav_profile'/>
            </div>
        </div>
    )
}
export default Navbar
