import React, { useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, deleteProduct, getAdminProduct } from '../../Actions/productActions';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import  DeleteIcon from '@material-ui/icons/Delete';
import  EditIcon from '@material-ui/icons/Edit';
import MetaData from '../basic/Metadata';
import { DELETE_PRODUCT_RESET } from '../../Constants/productsConstant';
import { Sidebar } from './Sidebar';
import { DataGrid } from '@material-ui/data-grid';
import "./productlist.css";

export const ProductList = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate= useNavigate();
// const {id}= useParams();
    const {error,products} = useSelector((state)=>state.products);

    const {error:deleteError, isDeleted} = useSelector(
        (state)=>state.product
    );

    const deleteProductHandler = (id)=>{
        dispatch(deleteProduct(id));
    };

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
            alert.success("Product deleted Successfully");
            navigate("/admin/dashboard");
            dispatch({
                type:DELETE_PRODUCT_RESET
            });
        }

        dispatch(getAdminProduct());
    },[dispatch,alert,error,deleteError,navigate,isDeleted]);

    const columns=[
        {
            field:"id" ,
            headerName:"Product ID" ,
            minWidth:200 , flex:0.5
        },
        {
            field:"name" ,
            headerName:"Name" ,
            minWidth:350 , flex:1
        },
        {
            field:"stock" ,
            headerName:"Stock" ,
            type:"number" ,
            minWidth:150 , flex:0.3
        },
        {
            field:"price" ,
            headerName:"Price" ,
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },
        {
            field:"actions" ,
            flex:0.3,
            headerName:"Actions",
            minWidth:150,
            type:"number",
            sortable:false,
            renderCell:(params)=>{
                return (
                    <>
                        <NavLink to={`/admin/product/${params.getValue(params.id,"id")}`}>
                            <EditIcon/>
                        </NavLink>

                        <Button
                        onClick={()=>
                        deleteProductHandler(params.getValue(params.id,"id"))}>
                            <DeleteIcon/>
                        </Button>
                    </>
                )
            }
        }
    ];


    const rows=[];

    products && products.forEach((item)=>{
        rows.push({
            id:item._id,
            stock:item.Stock,
            price:item.price,
            name:item.name,
        });
    });
  return (
    <>
        <MetaData title={`All Products -Admin`} />
        <div className="dashboard">
        <Sidebar/>
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </>
  )
}
