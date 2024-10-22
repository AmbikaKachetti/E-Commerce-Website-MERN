import React from 'react'
import './CartItems.css'
import { useContext } from 'react';
import {ShopContext} from '../../Context/ShopContext'
import remove_icon from '../../Assets/Frontend_Assets/cart_cross_icon.png'

const CartItems = () => {
    const {all_product, cartItems, removeFromCart} = useContext(ShopContext);
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
                <div className='cartitems_format'>
                    <img src="" alt="" className='carticon_product_icon'/>
                    <p></p>
                    <p></p>
                    <button className='cartitems_quantity'></button>
                    <p></p>
                    <img src="" alt="" onClick={()=>{removeFromCart()}}/>
                </div>
                <hr /> 
                {all_product.map((e)=>{
                    if(cartItems[e.id]>0){
                        return <div>
                            <div className='cartitems_format cartitems_format_main' key={e.id}>
                                <img src={e.image} alt="" className='carticon_product_icon'/>
                                <p>{e.name}</p>
                                <p>₹{e.new_price}</p>
                                <button className='cartitems_quantity'>{cartItems[e.id]}</button>
                                <p>{e.new_price*cartItems[e.id]}</p>
                                <img src={remove_icon} alt="" onClick={()=>{removeFromCart(e.id)}}/>
                            </div>
                        </div>
                    }
                })}
            </div>
        </div>
    )
}

export default CartItems
