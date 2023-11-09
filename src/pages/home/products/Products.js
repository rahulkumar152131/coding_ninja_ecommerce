import React, { useEffect, useState } from 'react'
import "./style.scss"
import axios from 'axios';
import { useVaue } from '../../../context/productContext';
import { toast } from 'react-toastify';


const Products = () => {
    const { products, addToCart } = useVaue();
    // console.log(products);
    return (
        <div className='product-container'>
            {products.map((product) => (
                <div className="product" key={product.id}>
                    <div className="image">
                        <img src={product.image} alt="" />
                    </div>
                    <div className="title">
                        {product.title}
                    </div>
                    <div className="price">
                        &#x20B9; {" "}
                        {Math.floor(product.price )}
                    </div>
                    <div className="addtocart" onClick={() => {
                        addToCart(product)
                        
                    }}>
                        <button>Add to Cart</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Products