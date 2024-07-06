import React, { useEffect, useState } from 'react'
import { Loader } from '../basic/Loader/Loader'
import { ProductCard } from '../Home/ProductCard'
import { Slider, Typography } from '@material-ui/core'

import Pagination from 'react-js-pagination'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { useParams } from 'react-router-dom'
import "./products.css"
// import { CLEAR_ERRORS } from '../../Constants/productsConstant'
// import { getAllProducts } from '../../../../back_end/controllers/productController'
import { clearErrors, getAllProducts } from '../../Actions/productActions'
const categories=[
    "gadgets",
    "Apparel",
    "Mobile Phones",
    "Cameras",
    "Footwear"
];

export const Products = () => {

    const dispatch= useDispatch();

    const alert = useAlert();

    const [currentPage,setCurrPage]= useState(1);

    const [price,setPrice] = useState([0,20000]);

    const [category,setCategory]=useState("");

    const [ratings,setRatings]= useState(0);

    const {
        products,loading,
        error,
        productsCount,
        resPerPage,
        filterProductsCount,
    }=useSelector((state)=> state.products);

    const {keyword} =useParams();

    const setCurrPageNo =(e)=>{
        setCurrPage(e);

    }

    const priceHandler =(e,p)=>{
        setPrice(p);
    };

    let count = filterProductsCount;

    useEffect(()=>{
        if(error){
            alert.error(error);

            dispatch(clearErrors());

        }

        dispatch(getAllProducts(keyword,currentPage,price,category,ratings));
    },[dispatch,keyword,currentPage,price,category,ratings,alert,error]
    );
console.log(count, resPerPage);
    
  return (
    <>
        {
            loading ?(
                <Loader/>
            ):
            (
                <>
                    <h2 className="productsHeading">Products</h2>

                    <div className="products">
                        {
                            products && 
                            products.map((product)=>{
                               return(
                                <ProductCard key={product._id} product = {product} />
                           
                               )  })
                        }
                    </div>

                    <div className="filterBox">
                        <Typography>
                            Price
                        </Typography>

                        <Slider
                            value={price}
                            onChange= {priceHandler}
                            valueLabelDisplay ="auto"
                            aria-labelledby="range-slider"
                            min={0}
                            max={200000}
                        />

                        <Typography>
                            Categories
                        </Typography>

                        <ul className="categoryBox">
                            {categories.map((category) => (
                                <li
                                className="category-link"
                                key={category}
                                onClick={() => setCategory(category)}
                                >
                                {category}
                                </li>
                            ))}
                        </ul>

                        <fieldset>
                            <Typography component="legend">
                                Ratings Above
                            </Typography>
                            <Slider
                                value={ratings}
                                onChange={(e,curr)=>{
                                    setRatings(curr);
                                }}
                                aria-labelledby="continuous-slider"
                                valueLabelDisplay="auto"
                                min={0}
                                max={5}
                            />
                        </fieldset>
                    </div>


                    {resPerPage <count &&(
                        <div className='paginationBox'>
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="1st"
                                lastPageText="Last"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"

                            />
                        </div>
                    )}
                </>

            )
        }
    </>
  )
}

