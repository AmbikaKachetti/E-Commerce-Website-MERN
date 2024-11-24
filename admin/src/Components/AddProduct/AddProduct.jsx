
// import { useState } from 'react'
// import './AddProduct.css'
// import upload_area from '../../assets/Admin_Assets/upload_area.svg'

// const AddProduct = () => {
//     const [image, setImage] = useState(false);
//     const [productDetails, setProductDetails] = useState({
//         name: "",
//         image: "",
//         category: "women",
//         new_price: "",
//         old_price: ""
//     })
//     const imageHandler = (e) => {
//         setImage(e.target.files[0]);
//     }
//     const changeHandler = (e) =>{
//         setProductDetails({...productDetails, [e.target.name]:e.target.value})
//     }
//     // const Add_Product = async ()=>{
//     //     console.log(productDetails);
//     //     let responseData;
//     //     let product = productDetails;

//     //     let formData = new FormData();
//     //     formData.append('product', image);

//     //     await fetch('http://localhost:4000/upload',{
//     //         method: 'POST',
//     //         headers: {
//     //             Accept: 'application/json',
//     //         },
//     //         body: formData,
//     //     }).then((resp) => resp.json()).then((data)=>{responseData=data})
//     //     if(responseData.success){
//     //         product.image = responseData.image_url;
//     //         console.log(product);
//     //         await fetch('http://localhost:4000/addproduct',{
//     //             method: 'POST',
//     //             headers: {
//     //                 Accept: 'application/json',
//     //                 'Content-Type': 'application/json',
//     //             },
//     //             body: JSON.stringify(product),
//     //         }).then((resp)=>resp.json()).then((data)=>{
//     //             data.success?alert("Product Added"):alert("Failed")
//     //         })
//     //     }
//     // }
//     const Add_Product = async () => {
//         console.log(productDetails);
//         let responseData;
//         let product = { ...productDetails }; // Clone the product details
    
//         if (!image) {
//             alert('Please upload an image.');
//             return;
//         }
    
//         try {
//             // Step 1: Upload the image
//             let formData = new FormData();
//             formData.append('product', image);
    
//             const imageResponse = await fetch('http://localhost:4000/upload', {
//                 method: 'POST',
//                 headers: {
//                     Accept: 'application/json',
//                 },
//                 body: formData,
//             });
    
//             if (!imageResponse.ok) {
//                 throw new Error('Failed to upload image');
//             }
    
//             const imageData = await imageResponse.json();
//             console.log('Image Upload Response:', imageData);
    
//             if (!imageData.success) {
//                 throw new Error('Image upload failed');
//             }
    
//             product.image = imageData.image_url; // Update product details with image URL
    
//             console.log('Updated Product:', product);
    
//             // Step 2: Add the product
//             const productResponse = await fetch('http://localhost:4000/addproduct', {
//                 method: 'POST',
//                 headers: {
//                     Accept: 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(product),
//             });
    
//             if (!productResponse.ok) {
//                 throw new Error('Failed to add product');
//             }
    
//             const productData = await productResponse.json();
//             console.log('Add Product Response:', productData);
    
//             if (productData.success) {
//                 alert('Product added successfully!');
//             } else {
//                 alert('Failed to add product.');
//             }
//         } catch (error) {
//             console.error('Error adding product:', error.message);
//             alert('An error occurred while adding the product. Please try again later.');
//         }
//     };
    
//     return (
//     <div className='add_product'>
//         <div className="addproduct_item_field">
//             <p>Product Title</p>
//             <input value = {productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here'/>
//         </div>
//         <div className='addproduct_price'>
//             <div className='addproduct_item_field'>
//                 <p>Price</p>
//                 <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here' />
//             </div>
//             <div className='addproduct_item_field'>
//                 <p>Offer Price</p>
//                 <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here' />
//             </div>
//         </div>
//         <div className="addproduct_item_field">
//             <p>Product Category</p>
//             <select value={productDetails.category} onChange={changeHandler} name="category" className='add_product_selector'>
//                 <option value="women">Women</option>
//                 <option value="men">Men</option>
//                 <option value="kid">Kid</option>
//             </select>
//         </div>
//         <div className='addproduct_item_field'>
//             <label htmlFor="field_input">
//                 <img src={image?URL.createObjectURL(image):upload_area} className='addproduct_thumbnail_img' alt="" />
//             </label>
//             <input onChange={imageHandler} type="file" name='image' id='field_input' hidden/>
//         </div>
//         <button onClick={()=>(Add_Product())} className='addproduct_btn'>ADD</button>
//     </div>
//     )
// }

// export default AddProduct

import { useState, useEffect } from 'react';
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

