import React from 'react'
import './Item.css'

const Item = (props) => {
  return (
    <div className='item'>
        <img className='item_image' src={props.image} alt="" />
        <p className='item_name'>{props.name}</p>
        <div className='item_prices'>
            <div className='item_price_new'>
              ₹{props.new_price}
            </div>
            <div className='item_old_price'>
              <del> ₹{props.old_price}</del>
            </div>
        </div>
    </div>
  )
}

export default Item
