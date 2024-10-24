import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../../Assets/Frontend_Assets/logo.png'
import cart_icon from '../../Assets/Frontend_Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import {dropdown_cion} from '../../Assets/Frontend_Assets/dropdown_icon.jpg'

const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const {getTotalCartItems} = useContext(ShopContext);
    const menuRef = useRef();
    return (
        <div className='navbar'>
            <div className='nav_logo'>
                <img src={logo} alt="" />
                <p>WearBy</p>
            </div>
            <img src={dropdown_cion} alt="" />
            <ul ref={menuRef} className='nav_menu'>
                <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration: 'none'}} to='/'>Shop</Link>{menu==="shop"?<hr />:<></>}</li>
                <li onClick={()=>{setMenu("mens")}}><Link style={{textDecoration: 'none'}} to='/mens'>Men</Link>{menu==="mens"?<hr />:<></>}</li>
                <li onClick={()=>{setMenu("women")}}><Link style={{textDecoration: 'none'}}  to='/women'>Women</Link>{menu==="women"?<hr />:<></>}</li>
                <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration: 'none'}} to='/kids'>Kids</Link>{menu==="kids"?<hr />:<></>}</li>
            </ul>
            <div className='nav_login_cart'>
                <Link to='/login'><button>Login</button></Link>
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className='nav_cart_count'>{getTotalCartItems()}</div>
            </div>
        </div>
    )
}

export default Navbar
