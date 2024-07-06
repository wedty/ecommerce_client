import React from 'react'
import CheckCircleIcon from "@material-ui/icons/CheckCircle"

import "./ordersuccess.css";

import {NavLink} from "react-router-dom";

import {Typography} from "@material-ui/core";


export const OrderSuccess = () => {
  return (
    <>
        <div className="orderSuccess">
            <CheckCircleIcon/>
            <Typography>
                Your Order Has been Placed Successfully
            </Typography>

            <NavLink to="/orders">View Orders</NavLink>
            
        </div>
    </>
  )
}
