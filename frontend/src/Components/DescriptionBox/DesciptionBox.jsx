import React from 'react'
import './DescriptionBox.css'

const DesciptionBox = () => {
    return (
    <div className='descriptionbox'>
        <div className="descriptionbox_navigrator">
            <div className="descriptionbox_nav_box">Description</div>
            <div className="descriptionbox_nav_box fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox_description">
            <p>An e-commerce website is an online platform that facilitates buying and selling
                of products or services over the internet serves as a virtual marketplace where
                business and individual shocase their products, interact with customers, and 
                coduct transactions without the nee dfor a physical presence. E-commerce websites
                have gained immense popularity due to thir convenience accessibility, and the 
                global, reach the offer.
                <p>
                    E-commerce website typically display products or services as detailed 
                    descriptions, images, prices, and any available variable (e.g., sizes, 
                    colors). Each product usually has it's own dedication with relevant 
                    information.
                </p>
            </p>
        </div>
    </div>
    )
}

export default DesciptionBox
