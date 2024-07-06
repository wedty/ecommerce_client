
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { getAdminProduct } from '../../Actions/productActions';
import { getAllOrders } from '../../Actions/orderActions';
import { getAllUsers } from '../../Actions/userAction';
import MetaData from '../basic/Metadata';
import { Sidebar } from './Sidebar';
import { Typography } from '@material-ui/core';
import { Doughnut, Line } from "react-chartjs-2";
import 'chart.js/auto';
// import { Chart } from 'react-chartjs-2';
import "./dashboard.css";
export const Dashboard = () => {
    const dispatch = useDispatch();
    const {products} = useSelector((state)=>state.products);
    const {orders}  = useSelector((state)=>state.allOrders)
    const {users}  = useSelector((state)=>state.allUsers)

let outOfStock=0;

products &&
    products.forEach((item)=>{
        if(item.Stock===0){
            outOfStock +=1;
        }
    });
    useEffect(()=>{
        dispatch(getAdminProduct());
        dispatch(getAllOrders());
        dispatch(getAllUsers());

    },[dispatch]);

    let totalAmount = 0;
    // or
orders && orders.forEach((item)=>{
    totalAmount +=item.totalPrice;
})

const lineState = {
    lables:["Initial Amount", "Amount Earned"],
    datasets:[
        {
            label:"Total Amount",
            backgroundColor:["tomato"],
            hoverBackgroundColor:["rgb(197,72,49)"],
            data:[0,totalAmount],
        },
    ],
};
const doughnutState = {
    lables:["Out of Stock", "InStock"],
    datasets:[
        {
            
            backgroundColor: ["#00A6B4", "#6800B4"],
            hoverBackgroundColor: ["#4B5000", "#35014F"],
            data:[outOfStock, products.length-outOfStock],
            
        },
    ],
};

  return (
    <>
        <div className="dashboard">
            <MetaData title="Dashboard - Admin Panel"/>

            <Sidebar/>
            <div className="dashboardContainer">
                <Typography component="h1">Dashboard</Typography>

                <div className="dashboardSummary">
                    <div>
                        <p>
                            Total Amount <br/>₹{totalAmount}

                        </p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <NavLink to="/admin/products">
                            <p>Product</p>
                            <p>{products && products.length}</p>
                            
                        </NavLink>
                        <NavLink to="/admin/orders">
                        <p>Orders</p>
                        <p>{orders && orders.length}</p>
                        
                        </NavLink>
                        <NavLink to="/admin/users">
                        <p>Users</p>
                        <p>{users && users.length}</p>
                        
                        </NavLink>


                    </div>
                </div>

                <div className="lineChart">
                    <Line data={lineState}/>

                </div>
                <div className="doughnutChart">
                    <Doughnut data = {doughnutState}/>

                </div>
            </div>
        </div>

    </>
  )
}
