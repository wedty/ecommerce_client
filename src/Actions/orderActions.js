import {axiosInstance} from "../components/basic/axiosInstance";
import { ALL_ORDERS_FAIL, ALL_ORDERS_REQUEST, ALL_ORDERS_SUCCESS, CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELETE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, UPDATE_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS } from "../Constants/orderConstants"



export const createOrder =(order)=> async (dispatch)=>{

    try{
        dispatch({
            type:CREATE_ORDER_REQUEST
        });

        const config = {
            headers:{
                "Content-Type":"application/json",
            }
        }

        const {data} = await axiosInstance.post("/api/v1/order/new", order, config);

        dispatch({
            type:CREATE_ORDER_SUCCESS,payload:data,
        });

    }
    catch(err){
        dispatch({
            type:CREATE_ORDER_FAIL,
            payload:err.response.data.message
        });
    }
};

export const myOrders =()=> async(dispatch)=>{
    try{
        dispatch({
            type:MY_ORDERS_REQUEST
        });

        const {data} = await axiosInstance.get("/api/v1/orders/me");

        dispatch({type:MY_ORDERS_SUCCESS,
        payload:data.orders});
    }
    catch(err){
        dispatch({
            type:MY_ORDERS_FAIL,
            payload:err.response.data.message,
        });
    }

}

// admin get all orders 

export const getAllOrders= ()=>async(dispatch)=>{
    try{
        dispatch({
            type: ALL_ORDERS_REQUEST
        });

        const {data} = await axiosInstance.get(`/api/v1/admin/orders`);

        dispatch({
            type:ALL_ORDERS_SUCCESS,
            payload:data.orders
        });


    }
    catch(err){
        dispatch({
            type:ALL_ORDERS_FAIL,
            payload:err.response.data.message,
        });
    }
}
// update order 

export const updateOrder =(id,order)=>async(dispatch)=>{
    try{
        dispatch({type:UPDATE_ORDER_REQUEST});
        const config = {
            headers:{
                "Content-Type":"application/json",
            }
        };
        const {data} = await axiosInstance.put(`/api/v1/admin/order/${id}`,order,config);

        dispatch({
            type:UPDATE_ORDER_SUCCESS,
            payload:data.success,
        });
    }
    catch(err){
        dispatch({
            type:UPDATE_ORDER_FAIL,
            payload:err.response.data.message,
        })
    }
};

// delete order admin 

export const deleteOrder =(id)=>async(dispatch)=>{
    try{
        dispatch({
            type:DELETE_ORDER_REQUEST,
        });

        const { data } = await axiosInstance.delete(`/api/v1/admin/order/${id}`);

        dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
    }
    catch(err){
        dispatch({
            type:DELETE_ORDER_FAIL,
            payload:err.response.data.message,
        })
    }
}

// get order details 

export const getOrderDetails = (id)=> async(dispatch)=>{
    try{
        dispatch({
            type:ORDER_DETAILS_REQUEST,
        });

        const {data} = await axiosInstance.get(`/api/v1/order/${id}`);

        dispatch({
            type:ORDER_DETAILS_SUCCESS,
            payload:data.order,
        });
    }
    catch(err){
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload:err.response.data.message
        });
    }
}

export const clearErrors =()=>async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    });

};