import React from 'react'
import './Footer.css'
import footer_logo from '../../Assets/Frontend_Assets/logo_big.png'
import instagram_icon from '../../Assets/Frontend_Assets/instagram_icon.png'
import pintrest_icon from '../../Assets/Frontend_Assets/pintester_icon.png'
import whatsapp_icon from '../../Assets/Frontend_Assets/whatsapp_icon.png'

const Footer = () => {
    return (
    <div className='footer'>
        <div className="footer_logo">
            <img src={footer_logo} alt="" />
            <p>WearBy</p>
        </div>
        <ul className='footer_links'>
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer_socail_icons">
            <div className="footer_icons_container">
                <img src={instagram_icon} alt="" />
            </div>
            <div className="footer_icons_container">
                <img src={pintrest_icon} alt="" />
            </div>
            <div className="footer_icons_container">
                <img src={whatsapp_icon} alt="" />
            </div>
        </div>
        <div className="footer_copyright">
            <hr />
            <p>Copyright @ 2024 - All Rights Reserved</p>
        </div>
    </div>
    )
}

export default Footer
