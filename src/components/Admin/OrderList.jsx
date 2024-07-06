import React, { useEffect } from 'react'
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Sidebar } from './Sidebar';
import { DataGrid } from '@material-ui/data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors, deleteOrder, getAllOrders } from '../../Actions/orderActions';
import { DELETE_ORDER_RESET } from '../../Constants/orderConstants';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import MetaData from '../basic/Metadata';

export const OrderList = () => {
const dispatch= useDispatch();

const alert = useAlert();
const {error,orders} = useSelector((state)=>state.allOrders)

const {error:deleteError,isDeleted} =useSelector((state)=>state.order);
const navigate = useNavigate();
const deleteOrderHandler =(id)=>{
    dispatch(deleteOrder(id));
}

useEffect(()=>{
    if(error){
        alert.error(error);
        dispatch(clearErrors());
    }

    if(deleteError){
        alert.error(deleteError);
        dispatch(clearErrors()); 
    }

    if(isDeleted){
        alert.success("Order Deleted Successfully");

        navigate("/admin/orders");
        dispatch({type:DELETE_ORDER_RESET});
    }

    dispatch(getAllOrders());
},[dispatch,alert,error,deleteError,navigate,isDeleted])

    const columns =[
        {field:"id",headerName:"Order ID",minWidth:300 ,flex:1},
        {field:"status",headerName:"Status",minWidth:150 ,
        flex:0.5  ,
        cellClassName:(params)=>{
            return params.getValue(params.id,"status")==="Delivered"?"greenColor":"redColor";
        }
},
        {field:"itemsQty",
        headerName:"Items Qty",
        type:"number",
        minWidth:150 ,
        flex:0.4, 
},
        {field:"amount",
        headerName:"Amount",
        type:"number",
        minWidth:270 ,
        flex:0.5, 
},

{
    field: "actions",
    flex: 0.3,
    headerName: "Actions",
    minWidth: 150,
    type: "number",
    sortable: false,
    renderCell: (params) => {
      return (
        <>
          <NavLink to={`/admin/order/${params.getValue(params.id, "id")}`}>
            <EditIcon />
          </NavLink>

          <Button
            onClick={() =>
              deleteOrderHandler(params.getValue(params.id, "id"))
            }
          >
            <DeleteIcon />
          </Button>
        </>
      );
    },
  },    
    ];

    const rows=[];

    orders &&
        orders.forEach((item)=>{
          // {
            console.log(item);
          // }
            rows.push({
                id:item._id,
                
                itemsQty:item.orderItems.length,
                amount:item.totalPrice,
                status:item.orderStatus,
            });
        });


  return (
    <>
        <MetaData title="All Orders -Admin"/>
        <div className="dashboard">
            <Sidebar/>
            <div className="productListContainer">
                <h1 id="productListHeading">All Orders</h1>
                <DataGrid
                    rows ={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className='productListTable'
                    autoHeight
                />
            </div>
        </div>
    </>
  )
}
