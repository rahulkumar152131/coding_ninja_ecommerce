import React, { useEffect, useState } from 'react'
import "./style.scss";
import axios from 'axios';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { AiOutlineMinusCircle } from 'react-icons/ai'
import { useVaue } from '../../context/productContext';
import { useNavigate } from 'react-router-dom';
import LoadingSkelton from '../../loading/LoadingSkelton';
const Cart = () => {

    const { placeOrder, carts, removeFromCart, totalPrice, incCartQty, decCartQty, loading } = useVaue();
    // console.log(carts);
    const navigate = useNavigate();
    return (
        < >
            {loading ? (
                <LoadingSkelton />
            ) : (

                carts.length !== 0 ?
                    (<div className="cart-container">
                        <div className="checkout">
                            <div className="totleprice">
                                TotalPrice:- &#x20B9;{" "}  {Math.floor(totalPrice * 80)}
                            </div>
                            <div className="purchage">
                                <button onClick={() => {
                                    placeOrder(carts);
                                    navigate("/myorder")
                                }}>Purchase</button>
                            </div>
                        </div>
                        <div className='product-container'>
                            {carts.map((product) => (
                                <div className="product" key={product.id}>
                                    <div className="image">
                                        <img src={product.image} alt="" />
                                    </div>
                                    <div className="title">
                                        {product.title}
                                    </div>
                                    <div className="price">
                                        &#x20B9; {" "}
                                        {Math.floor(product.price * 80)}
                                    </div>
                                    <div className="action">
                                        <div className="minus" onClick={() => decCartQty(product.id)}>
                                            <AiOutlineMinusCircle />
                                        </div>
                                        <div className="count">
                                            {product.qty}
                                        </div>
                                        <div className="plus" onClick={() => incCartQty(product.id)}>
                                            <BsPlusCircleDotted />
                                        </div>
                                    </div>
                                    <div className="removefromcart">
                                        <button onClick={() => removeFromCart(product.id)}>Remove from Cart</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>) : (
                        <div className="cartnotfount">
                            <div>
                                Cart is Empty !
                            </div>
                        </div>
                    )

            )}
        </>

    )
}

export default Cart