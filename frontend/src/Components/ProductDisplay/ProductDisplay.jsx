import React from 'react';
import './ProductDisplay.css';
import star_icon from '../../Assets/Frontend_Assets/star_icon.png';
import star_dull_icon from '../../Assets/Frontend_Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import { useContext } from 'react';

const ProductDisplay = (props) => {
  const {product} = props;
  const {addToCart} = useContext(ShopContext);

  return (
    <div className='productdisplay'>
      <div className="productdisplay_left">
        <div className="productdisplay_image_list">
          {/* Use different images if available */}
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
        </div>
        <div className="productdisplay_image">
          <img className='productdisplay_main_image' src={product.image} alt={product.name} />
        </div>
      </div>      

      <div className="productdisplay_right">
        <h1>{product.name}</h1>
        <div className="productdisplay_right_star">
          <img src={star_icon} alt="Star" />
          <img src={star_icon} alt="Star" />
          <img src={star_icon} alt="Star" />
          <img src={star_icon} alt="Star" />
          <img src={star_dull_icon} alt="Star Dull" />
          <p>(122)</p>
        </div>
        <div className="productdisplay_right_prices">
          <div className="productdisplay_right_price_old">₹{product.old_price}</div>
          <div className="productdisplay_right_price_new">₹{product.new_price}</div>
        </div>
        <div className="productdisplay_right_description">
          A lightweight, usually knitted pullover shirt, close-fitting with a round neckline and short sleeves, worn as an undershirt or outer garment.
        </div>
        <div className="productdisplay_right_size">
          <h1>Select Size</h1>
          <div className="productdisplay_right_size_options">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
        <p className='productdisplay_right_category'><span>Category: </span>Women, T-Shirt, Crop Top</p>
        <p className='productdisplay_right_category'><span>Tags: </span>Modern, Latest</p>
      </div>      
    </div>
  );
}

export default ProductDisplay;
