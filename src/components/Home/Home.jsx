import React, { useEffect } from 'react'
import { BsFillMouse3Fill } from 'react-icons/bs'
import "./home.css"
import {useSelector,useDispatch} from "react-redux"

import {useAlert} from "react-alert"
// import { CLEAR_ERRORS } from '../../Constants/productsConstant'
import {clearErrors, getAllProducts} from "../../Actions/productActions";
import {Loader} from "../basic/Loader/Loader"
import { ProductCard } from './ProductCard'
export const Home = () => {

    const alert = useAlert()
    const dispatch = useDispatch();

    const {loading,products,error} = useSelector ((state)=> state.products);
// {console.log(loading,products,error);}
    useEffect (()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getAllProducts());

    },[dispatch,error,alert]);
  return (
    <>

  {loading? (
    <Loader/>

  ) 
  :
  (
    <>
    <div className="banner" >
            <p>Welcome to Shop It Up</p>
            <h1>Find Amazing Products Below</h1>
            <a href="#container">
                <button>
                    Scroll <BsFillMouse3Fill/>
                </button>
            </a>

            </div>

            <h2 className="heading">Featured Products</h2>
            <div className="container" id="container">
         {       
                   products && 
                   products.map((product)=> <ProductCard key={product._id} product={product}/>
                   )
                }
            </div>
    </>
  )
  }
    </>
  )
}
