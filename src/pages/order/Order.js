import axios, { all } from 'axios';
import React, { useEffect, useState } from 'react'
import "./style.scss"
import { useVaue } from '../../context/productContext';
import LoadingSkelton from '../../loading/LoadingSkelton';

const Order = () => {
    const { allOrders, loading } = useVaue();

    // console.log(allOrders);
    return (
        <>
            {loading ? (
                <LoadingSkelton />
            ) : (
                <div className='order-container'>
                    <div className="order-title">
                        Your Orders
                    </div>

                    {allOrders.map((order) => (
                        <div className="allorder" key={order.id}>
                            <div className="order-on">
                                Order on:- {order.date}
                            </div>
                            <table key={order.id}>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total Price</th>
                                    </tr>
                                </thead>
                                {
                                    order.order.map((item) => (
                                        <tbody className="order" key={item.id}>
                                            <tr>
                                                <td className="title">
                                                    {item.title.slice(0, 26)}...
                                                </td>
                                                <td className="price">

                                                    &#x20B9; {" "}
                                                    {Math.floor(item.price)}
                                                </td>
                                                <td className="quantity">
                                                    {item.qty}
                                                </td>
                                                <td className="total">
                                                    &#x20B9; {" "}
                                                    {Math.floor(item.qty * item.price)}
                                                </td>
                                            </tr>
                                        </tbody>

                                    ))
                                }
                                <tfoot className="total-sum">
                                    <tr className='total-price'>

                                        <td colSpan='4'>
                                            &#x20B9; {" "}
                                            {Math.floor(order.order.reduce((acc, cur) => {
                                                return cur.price * cur.qty + acc;
                                            }, 0))}

                                        </td>
                                    </tr>
                                </tfoot>
                            </table>

                        </div>
                    ))}

                </div>
            )

            }
        </>
    )
}

export default Order