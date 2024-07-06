import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Loader } from '../basic/Loader/Loader';
import Carousel from "react-material-ui-carousel";
import "./productsdetails.css"
import { clearErrors, getProductDetails, newReview } from '../../Actions/productActions';
import { useAlert } from 'react-alert';
// import Rating from '@mui/material/Rating';
import {Rating} from "@material-ui/lab"
import { Review } from './Review';

import {addItemsToCart} from "../../Actions/cartActions";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { NEW_REVIEW_RESET } from '../../Constants/productsConstant';
export const ProductDetails = () => {
    // console.log()
const dispatch = useDispatch();

    const {id} = useParams();
    const alert =useAlert();
    const {product,loading,error}  = useSelector(
        (state)=>state.productDetails
    );

    const {success, error:reviewError} = useSelector(
        (state)=>state.newReview
    );

    // console.log(id);
    const [quantity,setQuantity]= useState(1);
    const [open, setOpen ]= useState(false);
    const [rating , setRating] =useState(0);
    const [comment , setComment] =useState("");
        
    const increaseQuantity = ()=>{
        if(product.Stock <=quantity)return;
        const qty = quantity+1;
        setQuantity(qty);
        console.log(qty);
    }

    
    const decreaseQuantity = ()=>{
        if(1>=quantity){
            return;
        }
        const qty = quantity-1;
        setQuantity(qty);
        console.log(qty);
    }

    const addToCartHandler=()=>{
        dispatch(addItemsToCart(id,quantity));
        alert.success("Item Added to Cart");
    }

    const submitReviewToggle = ()=>{
        open ?setOpen(false) :setOpen(true);
    }

    const reviewSubmitHandler =()=>{
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);

        dispatch(newReview(myForm));
        setOpen(false);
    }
    useEffect(()=>{
        if(error){

            alert.error(error);
            dispatch(clearErrors());
        }

        if(reviewError){
            alert.error(reviewError);
            dispatch(clearErrors());
        }

        if(success){
            alert.success("Review Submitted Successfully!");
            dispatch({type:NEW_REVIEW_RESET});
        }
        dispatch(getProductDetails(id));
    },[dispatch,id,error,alert,reviewError,success]);
    

    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
      };

    return (
    
    <>

       {/* {console.log(product)} */}
        {
            loading ? (
              <Loader/>
            ):
            (
            <>
                <div className="ProductDetails">

                    <Carousel className='carousel'>
                        {product.images &&
                        product.images.map((item, i) => (
                            <div className="prodImg">
                            <img
                            className="CarouselImage"
                            
                            key={i}
                            src={item.url}
                            // src={""}

                            alt={`${i} Slide`}
                            />
                            </div>
                            
                        ))}
                    </Carousel>
                    

                    <div>
                    <div className="detailsBlock-1">
                        <h2>{product.name}</h2>
                        <p>Product # {product._id}</p>
                    </div>
                    <div className="detailsBlock-2">
                        <Rating {...options} />
                        <span className="detailsBlock-2-span">
                        {" "}
                        ({product.numOfReviews} Reviews)
                        </span>
                    </div>
                    <div className="detailsBlock-3">
                        <h1>{`₹${product.price}`}</h1>
                        <div className="detailsBlock-3-1">
                        <div className="detailsBlock-3-1-1">
                            <button onClick={decreaseQuantity}>-</button>
                            <input readOnly type="number" value={quantity} />
                            <button onClick={increaseQuantity}>+</button>
                        </div>
                        <button
                            disabled={product.Stock < 1 ? true : false}
                            onClick={addToCartHandler}
                        >
                            Add to Cart
                        </button>
                        </div>

                        <p>
                        Status:
                        <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                            {product.Stock < 1 ? "OutOfStock" : "InStock"}
                        </b>
                        </p>
                    </div>

                    <div className="detailsBlock-4">
                        Description : <p>{product.desc}</p>
                    </div>

                    <button onClick={submitReviewToggle} className="submitReview">
                        Submit Review
                    </button>
                    </div>
                </div>

                <h3 className="reviewsHeading">Reviews</h3>
                <Dialog
                aria-labelledby="simple-dialog-title"
                open = {open}
                onClose = {submitReviewToggle} >

                    <DialogTitle>Submit Review</DialogTitle>
                    <DialogContent className="submitDialog">
                        <Rating
                            onChange ={(e)=> setRating(e.target.value)}
                            value = {rating}
                            size="large"
                        />
                        <textarea 
                        className='submitDialogTextArea'
                         cols="30" rows="5"
                            onChange ={(e)=>setComment(e.target.value)}
                        value={comment}

                        ></textarea>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={submitReviewToggle} color="secondary">
                            Cancel                            
                        </Button>
                        <Button onClick={reviewSubmitHandler} color="primary">
                            Submit                            
                        </Button>
                    </DialogActions>
                </Dialog>
                
                {product.reviews && product.reviews[0]?(
                    <div className="reviews">
                        {product.reviews && product.reviews.map((review)=>(
                            <Review key={review._id} review={review} />

                        ))}
                    </div>
                ):
                (
                    <p className="noReviews">No Reviews Yet</p>
                )
                }
            </>
            )
        }
    </>
  )
}
