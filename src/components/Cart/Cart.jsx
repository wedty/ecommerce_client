import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { addItemsToCart } from '../../Actions/cartActions';
import { addItemsToCart,removeItemsFromCart } from '../../Actions/cartActions';
import { useNavigate,NavLink } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart"

import "./cart.css";
import { CartItemCard } from './CartItemCard';

export const Cart = () => {
    const {cartItems} =useSelector((state)=>state.cart);
const dispatch= useDispatch();
const navigate = useNavigate();
const increaseQuantity = (id,quantity,stock)=>{
    const qty = quantity+1;

    if(stock <=quantity){
        return;
}
    dispatch(addItemsToCart(id,qty));
    console.log(id,quantity);
}

const decreaseQuantity =(id,quantity)=>{
    const qty =quantity-1;
    if(quantity<=1){
        return;
    }

    dispatch(addItemsToCart(id,qty));
    console.log(id,quantity);
}

const deleteCartItems = (id)=>{
    dispatch(removeItemsFromCart(id));
}

const checkOutHandler = ()=>{
    navigate("/login?redirect=shipping");
}

  return (
    <>
    {
        cartItems.length ===0 ?(
            <div className="emptyCart">
                <RemoveShoppingCartIcon/>

                <Typography>
                    No Prodcut in Your Cart!
                </Typography>
                <NavLink to="/products">View Products</NavLink>
            </div>
        )
        :
        (
            <>
                <div className="cartPage">
                    <div className="cartHeader">
                        <p>Product</p>
                        <p>Quantity</p>
                        <p>Subtotal</p>
                    </div>

                    {
                        cartItems &&
                        cartItems.map((item)=>(
                            <div className="cartContainer" key={item.product}>
                                <CartItemCard item={item} deleteCartItems ={deleteCartItems}/>
                                <div className="cartInput">
                                    <button 
                                    onClick={()=>
                                    decreaseQuantity(item.product,item.quantity)
                                    }>
                                        -
                                    </button>
                                    <input type="number" value={item.quantity} readOnly />

                                    <button 
                                    onClick={()=>
                                    increaseQuantity(item.product,item.quantity,item.stock)
                                    }>
                                        +
                                    </button>
                                </div>

                                <p className="cartSubtotal">
                                    {`₹${
                    item.price * item.quantity
                  }`}
                                </p>
                            </div>
                        ))
                    }

                    <div className="cartGrossProfit">
                        <div></div>
                        <div className="cartGrossProfitBox">
                            <p>Gross Total</p>
                            <p>{
                                `₹${cartItems.reduce(
                                    (sum,i)=> sum+i.quantity*i.price,0
                                )}`
                            }</p>
                        </div>
                        <div></div>
                        <div className="checkOutBtn">
                            <button onClick={checkOutHandler}>
                                Check Out
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    </>
  )
}
