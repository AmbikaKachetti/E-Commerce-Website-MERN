/*
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
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product', image);

        await fetch('http://localhost:4000/upload',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        }).then((resp) => resp.json()).then((data)=>{responseData=data})
        if(responseData.success){
            product.image = responseData.image_url;
            console.log(product);
            await fetch('http://localhost:4000/addproduct',{
                method: 'POST',
                header: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            }).then((resp)=>resp.json()).then((data)=>{
                data.success?alert("Product Added"):alert("Failed")
            })
        }
    }
    return (
    <div className='add_product'>
        <div className="addproduct_item_field">
            <p>Product Title</p>
            <input value = {productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here'/>
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
*/

// new code after rectifying the errors in the previous commented code above

import React, { useState, useEffect } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/Admin_Assets/upload_area.svg';

const AddProduct = () => {
    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: '',
        image: '',
        category: 'women',
        new_price: '',
        old_price: '',
    });

    useEffect(() => {
        return () => {
            if (image) {
                URL.revokeObjectURL(image);
            }
        };
    }, [image]);

    const imageHandler = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024) {
            setImage(file);
        } else {
            alert('Please upload a valid image file (max 5MB)');
        }
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const Add_Product = async () => {
        try {
            console.log(productDetails);
            let responseData;
            let product = productDetails;

            let formData = new FormData();
            formData.append('product', image);

            const uploadResponse = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                headers: { Accept: 'application/json' },
                body: formData,
            });

            responseData = await uploadResponse.json();

            if (responseData.success) {
                product.image = responseData.image_url;
                console.log(product);

                const addProductResponse = await fetch('http://localhost:4000/addproduct', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product),
                });

                const addProductData = await addProductResponse.json();
                addProductData.success ? alert('Product Added') : alert('Failed');
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="add_product">
            <div className="addproduct_item_field">
                <p>Product Title</p>
                <input
                    value={productDetails.name}
                    onChange={changeHandler}
                    type="text"
                    name="name"
                    placeholder="Type here"
                />
            </div>
            <div className="addproduct_price">
                <div className="addproduct_item_field">
                    <p>Price</p>
                    <input
                        value={productDetails.old_price}
                        onChange={changeHandler}
                        type="text"
                        name="old_price"
                        placeholder="Type here"
                    />
                </div>
                <div className="addproduct_item_field">
                    <p>Offer Price</p>
                    <input
                        value={productDetails.new_price}
                        onChange={changeHandler}
                        type="text"
                        name="new_price"
                        placeholder="Type here"
                    />
                </div>
            </div>
            <div className="addproduct_item_field">
                <p>Product Category</p>
                <select
                    value={productDetails.category}
                    onChange={changeHandler}
                    name="category"
                    className="add_product_selector"
                >
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div className="addproduct_item_field">
                <label htmlFor="field_input">
                    <img
                        src={image ? URL.createObjectURL(image) : upload_area}
                        className="addproduct_thumbnail_img"
                        alt=""
                    />
                </label>
                <input
                    onChange={imageHandler}
                    type="file"
                    name="image"
                    id="field_input"
                    hidden
                />
            </div>
            <button onClick={Add_Product} className="addproduct_btn">
                ADD
            </button>
        </div>
    );
};

export default AddProduct;

