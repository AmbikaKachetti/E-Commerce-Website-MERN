import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/Admin_Assets/upload_area.svg'

const AddProduct = () => {
    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: ""
    })
    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }
    const changeHandler = (e) =>{
        setProductDetails({...productDetails, [e.target.name]:e.target.value})
    }
    const Add_Product = async ()=>{
        console.log(productDetails);
    }
    return (
    <div className='add_product'>
        <div className="addproduct_item_field">
            <p>Product Title</p>
            <input value = {productDetails.name} onChange={changeHandler} type="text" name='nmae' placeholder='Type here'/>
        </div>
        <div className='addproduct_price'>
            <div className='addproduct_item_field'>
                <p>Price</p>
                <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here' />
            </div>
            <div className='addproduct_item_field'>
                <p>Offer Price</p>
                <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here' />
            </div>
        </div>
        <div className="addproduct_item_field">
            <p>Product Category</p>
            <select value={productDetails.category} onChange={changeHandler} name="category" className='add_product_selector'>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kid">Kid</option>
            </select>
        </div>
        <div className='addproduct_item_field'>
            <label htmlFor="field_input">
                <img src={image?URL.createObjectURL(image):upload_area} className='addproduct_thumbnail_img' alt="" />
            </label>
            <input onChange={imageHandler} type="file" name='image' id='field_input' hidden/>
        </div>
        <button onClick={()=>(Add_Product())} className='addproduct_btn'>ADD</button>
    </div>
    )
}

export default AddProduct
