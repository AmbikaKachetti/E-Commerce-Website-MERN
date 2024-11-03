import React from 'react'
import './Offers.css'
import exclusive_image from '../../Assets/Frontend_Assets/exclusive_image.png'
import Breadcrum from '../Breadcrums/Breadcrum'

const Offers = () => {
  return (
    <div className='offers'>
        <div className="offers_left">
            <h1>Exclusive</h1>
            <h1>Offers For You</h1>
            <p>ONLY ON BEST SELLERS PRODUCTS</p>
            <button>Check Now</button>
        </div>
        <div className="offer_right">
          <img src={exclusive_image} className ='offer_right_image' alt="exclusive-offer-image" />
        </div>
    </div>
  )
}

export default Offers
