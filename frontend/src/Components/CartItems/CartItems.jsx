import React from 'react'
import './CartItems.css'
import { useContext } from 'react';
import {ShopContext} from '../../Context/ShopContext'
import remove_icon from '../../Assets/Frontend_Assets/cart_cross_icon.png'

const CartItems = () => {
    const {getTotalCartAmount, all_product, cartItems, removeFromCart} = useContext(ShopContext);
    return (
        <div className='cartitems'>
            <div className="cartitems_format_main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            <div>
                {all_product.map((e)=>{
                    if(cartItems[e.id]>0){
                        return <div>
                            <div className='cartitems_format cartitems_format_main' key={e.id}>
                                <img src={e.image} alt="" className='carticon_product_icon'/>
                                <p>{e.name}</p>
                                <p>₹{e.new_price}</p>
                                <button className='cartitems_quantity'>{cartItems[e.id]}</button>
                                <p>₹{e.new_price*cartItems[e.id]}</p>
                                <img className = "cart_items_remove_icon" src={remove_icon} alt="" onClick={()=>{removeFromCart(e.id)}}/>
                            </div>
                        </div>
                    }
                    return null;
                })}
                <div className='carttems_down'>
                    <div className="cart_items_total">
                        <h1>cart Totals</h1>
                        <div>
                            <div className="cartitems_total_item">
                                <p>Subtotal</p>
                                <p>₹{getTotalCartAmount()}</p>
                            </div>
                            <hr />
                            <div className="cartitems_total_item">
                                <p>Shipping Fee</p>
                                <p>Free</p>
                            </div>
                            <hr />
                            <div className='cartitems_total_item'>
                                <h3>Total</h3>
                                <h3>₹{getTotalCartAmount()}</h3>
                            </div>
                            <button>PROCEED TO CHECKOUT</button>
                        </div>
                    </div>
                    <div className="cart_item_promocode">
                        <p>If you have a promo code, Enter it here</p>
                        <div className="cart_item_promobox">
                            <input type="text" placeholder='Promocode' />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
    )
}

export default CartItems
