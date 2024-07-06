import React from 'react'
import { NavLink } from 'react-router-dom'
import './cartitemcard.css'
export const CartItemCard = ({item,deleteCartItems}) => {
  return (
    <>
        <div className="cartItemCard">
            <img src={item.image} alt="item" />
            <div>
                <NavLink to={`/product/${item.product}`}>
                    {item.name}
                </NavLink>
                <span>{`Price: ₹${item.price}`}</span>

                <p onClick={()=>deleteCartItems(item.product)}>Remove</p>
            </div>
        </div>
    </>
  )
}
