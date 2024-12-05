import React, { useContext, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../../Assets/Frontend_Assets/big_logo.png';
import cart_icon from '../../Assets/Frontend_Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../../Assets/Frontend_Assets/nav_dropdown.png';

const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const { getTotalCartItems } = useContext(ShopContext);
    const menuRef = useRef();

    const dropdownToggle = (e) => {
        menuRef.current.classList.toggle('nav_menu_visible');
        e.target.classList.toggle('open');
    };

    return (
        <div className='navbar'>
            <div className='nav_logo'>
                <img src={logo} alt="WearBy Logo" />
                <p>WearBy</p>
            </div>
            <img 
                onClick={dropdownToggle} 
                className="nav_drop_down" 
                src={nav_dropdown} 
                alt="Menu Dropdown" 
            />
            <ul ref={menuRef} className='nav_menu'>
                <li onClick={() => setMenu("shop")}>
                    <Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>
                    {menu === "shop" && <hr />}
                </li>
                <li onClick={() => setMenu("mens")}>
                    <Link style={{ textDecoration: 'none' }} to='/mens'>Men</Link>
                    {menu === "mens" && <hr />}
                </li>
                <li onClick={() => setMenu("women")}>
                    <Link style={{ textDecoration: 'none' }} to='/women'>Women</Link>
                    {menu === "women" && <hr />}
                </li>
                <li onClick={() => setMenu("kids")}>
                    <Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link>
                    {menu === "kids" && <hr />}
                </li>
            </ul>
            <div className='nav_login_cart'>
                {localStorage.getItem('auth-token')
                ?
                <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
                :
                <Link to='/login'><button>Login</button></Link>
                }
                <Link to='/cart'>
                    <img src={cart_icon} alt="Cart Icon" />
                    <div className='nav_cart_count'>{getTotalCartItems()}</div>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
