import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import {CheckoutSteps} from "./CheckoutSteps"
import MetaData from "../basic/Metadata.jsx"
import { Typography } from '@material-ui/core';
import "./confirmorder.css";

export const ConfirmOrder = () => {

    const navigate = useNavigate();
    const {shippingInfo, cartItems} = useSelector((state)=>state.cart);

    const {user} = useSelector((state)=>state.user);

    const subtotal = cartItems.reduce(
        (total,item)=>total+item.quantity *item.price,0
    );

    const shippingCharges = subtotal >1000 ?0:200;

    const tax = subtotal*0.18;

    const totalPrice = subtotal +tax+shippingCharges;

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`

    const proceedToPayment =()=>{
        const data = {
            subtotal ,
            shippingCharges,
            tax,totalPrice,
        };

        sessionStorage.setItem("orderInfo",JSON.stringify(data));

        navigate("/process/payment");

    }

  return (
    <>
        <MetaData title="Confirm Order"/>
        <CheckoutSteps activeStep ={1}/>

        <div className="confirmOrderPage">
            <div>
                <div className="confirmShippingArea">
                    <Typography>Shipping Info</Typography>
                    <div className="confirmShippingAreaBox">
                        <div>
                            <p>Name:</p>
                            <span>{user.name}</span>

                        </div>
                        <div>
                            <p>Phone:</p>
                            <span>{shippingInfo.phoneNo}</span>

                        </div>
                        <div>
                            <p>Address:</p>
                            <span>{address}</span>

                        </div>


                    </div>
                </div>

                <div className="confirmCartItems">
                    <Typography>Your Cart Items:</Typography>
                    <div className="confirmCartItemsContainer">
                        {
                            cartItems &&
                                cartItems.map((item)=>(
                                    <div key={item.product}>
                                        <img src={item.image} alt="Product" />
                                        <NavLink to={`/product/${item.product}`}>
                                            {item.name}
                                        </NavLink>

                                        <span>
                                            {item.quantity}X ₹{item.price} ={" "}
                                            <b>₹{item.price*item.quantity}</b>

                                        </span>
                                    </div>
                                ))
                        }
                    </div>
                </div>


            </div>

            <div>
                <div className="orderSummary">
                    <Typography>Order Summary</Typography>
                    <div>
                        <div>
                            <p>Subtotal:</p>
                            <span>₹{subtotal}</span>
                            
                        </div>
                        <div>
                            <p>Shipping Charges:</p>
                            <span>₹{shippingCharges}</span>

                        </div>
                        <div>
                            <p>GST:</p>
                            <span>₹{tax}</span>

                        </div>
                    </div>
                    <div className="orderSummaryTotal">
                        <p>
                            <b>Total:</b>

                        </p>
                        <b>₹{totalPrice}</b>
                    </div>

                    <button onClick={proceedToPayment}>Proceed to Payment</button>

                </div>
            </div>
        </div>
    </>
  )
}
