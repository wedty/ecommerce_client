import { ADMIN_PRODUCT_FAIL, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ALL_PRODUCTS_FAIL, ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_SUCCESS, ALL_REVIEW_FAIL, ALL_REVIEW_REQUEST, ALL_REVIEW_SUCCESS, CLEAR_ERRORS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_REVIEW_FAIL, DELETE_REVIEW_SUCCESS, NEW_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_REVIEW_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, PRODUCTS_DETAILS_FAIL, PRODUCTS_DETAILS_REQUEST, PRODUCTS_DETAILS_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from "../Constants/productsConstant"
import axios from "axios"

export const getAllProducts = (keyword="",currentPage=1,price=[0,200000], category, ratings=0)=> async(dispatch)=>{

    try{

        dispatch({type:ALL_PRODUCTS_REQUEST});
        
        let link =`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
        // let link =`/api/v1/products`;
        if(category){
             link =`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
             
        }
        

        const {data} =await axios.get(link);
        dispatch({
            type:ALL_PRODUCTS_SUCCESS,
            payload:data
        })
    }
    catch(err){
        dispatch({
            type:ALL_PRODUCTS_FAIL,
            payload:err.response.data.message
        })
    }
}

// get all admin products 

export const getAdminProduct = ()=> async (dispatch)=>{
    try{
        dispatch({
            type:ADMIN_PRODUCT_REQUEST,            
        });

        const {data} = await axios.get("/api/v1/admin/products");

        dispatch({
            type:ADMIN_PRODUCT_SUCCESS,
            payload:data.products
        });

    }
    catch(err){
        dispatch({
            type:ADMIN_PRODUCT_FAIL,
            payload:err.response.data.message
        })
    }
}

// create products 
export const createProduct = (productData)=>async (dispatch)=>{

    try{
        dispatch({type:NEW_PRODUCT_REQUEST});

        const config = {
            headers:{"Content-Type":"application/json"}
        }
        const {data} = await axios.post(
            `/api/v1/admin/product/new`,
            productData,
            config
        );

        dispatch({
            type:NEW_PRODUCT_SUCCESS,
            payload:data
        })
    }
    catch(err){
        dispatch({
            type:NEW_PRODUCT_FAIL,
            payload:err.response.data.message,
        })
    }
}

// update product 

export const updateProduct = (id,productData)=>async(dispatch)=>{
    try{
        dispatch({
            type:UPDATE_PRODUCT_REQUEST,
        });

        const config = {
            headers:{"Content-Type":"application/json"},
        };

        const {data} = await axios.put(`/api/v1/admin/product/${id}`,productData,config);

        dispatch({
            type:UPDATE_PRODUCT_SUCCESS,
            payload:data.success
        });
    }
    catch(err){
        dispatch({
            type:UPDATE_PRODUCT_FAIL,
            payload:err.response.data.message,
        });
    }
};

//delete product

export const deleteProduct = (id,productData)=>async(dispatch)=>{
    try{
        dispatch({
            type:DELETE_PRODUCT_REQUEST,
        });



        const {data} = await axios.delete(`/api/v1/admin/product/${id}`);

        dispatch({
            type:DELETE_PRODUCT_SUCCESS,
            payload:data.success
        });
    }
    catch(err){
        dispatch({
            type:DELETE_PRODUCT_FAIL,
            payload:err.response.data.message,
        });
    }
};

// product details 
export const getProductDetails = (id)=> async(dispatch)=>{
    try{
        dispatch({
            type:PRODUCTS_DETAILS_REQUEST
        });

        const {data} =await axios.get(`/api/v1/product/${id}`);

        dispatch({
            type:PRODUCTS_DETAILS_SUCCESS,
            payload:data.product
        });
        

    }
    catch(err){
        dispatch({
            type:PRODUCTS_DETAILS_FAIL,
            payload:err.response.data.message
        });
    }
}

// add a new review 

export const newReview= (reviewData)=> async(dispatch)=>{
    try{
  
        dispatch({type:NEW_REVIEW_REQUEST});

        const config ={
            headers:{"Content-Type":"application/json"}
        };

        const {data} = await axios.put(`/api/v1/review`, reviewData,config);

        dispatch({
            type:NEW_REVIEW_SUCCESS,
            payload:data.success,
        });

        }
    catch(err){
      dispatch({
        type:NEW_REVIEW_FAIL,
        payload:err.response.data.message,
      })
    }
  }

//   admin -fetch all reviews of a product 

export const getAllReviews = (id)=>async(dispatch)=>{
    try{
        dispatch({
            type:ALL_REVIEW_REQUEST,
        });
        const {data} = await axios.get(`/api/v1/reviews?id=${id}`);

        dispatch({
            type:ALL_REVIEW_SUCCESS,
            payload:data.reviews,
        })
    }
    catch(err){
        dispatch({
            type: ALL_REVIEW_FAIL,
            payload: err.response.data.message,
          });
    }
};

// delete a review by id  and id of product 

export const deleteReviews = (reviewId, productId)=>async (dispatch)=>{
    try{
        dispatch({
            type:DELETE_PRODUCT_REQUEST,
        });

        const {data} = await axios.delete(
            `/api/v1/reviews?id=${reviewId}&productId=${productId}`
        );

        dispatch({
            type:DELETE_REVIEW_SUCCESS,
            payload:data.success,
        });

    }
    catch(err){
        dispatch({
            type:DELETE_REVIEW_FAIL,
            payload:err.response.data.message,
        });
    }
};

// clear errors 
export const clearErrors =()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}