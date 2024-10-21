import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = ({ id, image, name, new_price, old_price }) => {
  return (
    <div className='item'>
      <Link to={`/product/${id}`}>
        <img className='item_image' onClick={window.scrollTo(0, 0)} src={image} alt={name} />
      </Link>
      <p className='item_name'>{name}</p>
      <div className='item_prices'>
        <div className='item_price_new'>₹{new_price}</div>
        <div className='item_old_price'><del> ₹{old_price}</del></div>
      </div>
    </div>
  );
}

export default Item;
