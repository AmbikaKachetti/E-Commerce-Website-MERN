import React from 'react'
import hand_icon from '../../Assets/Frontend_Assets/hand_icon.png'
import arrow_icon from '../../Assets/Frontend_Assets/arrow.png'
import hero_image from '../../Assets/Frontend_Assets/hero_image.png'
import './Hero.css'

const Hero = () => {
    return (
    <div className='hero'>
        <div className="hero_left">
            <h2>New Arrivals Only</h2>
            <div className='hero_hand_icon'>
                <p>new</p>
                <img src={hand_icon} alt="" />
            </div>
            <p>Collections</p>
            <p>for everyone</p>
            <div className='hero_latest_btn'>
                <div>Latest Collection</div>
                <img src={arrow_icon} alt="" />
            </div>
        </div>
        
        <div className="hero_right">
            <img src={hero_image} alt="" />
        </div>
    </div>
    )
}

export default Hero
