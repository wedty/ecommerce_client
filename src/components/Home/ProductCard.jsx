import React from "react"
import { NavLink } from "react-router-dom"
import {Rating} from "@material-ui/lab";

// import React from 'react'

export const ProductCard = ({product}) => {
    // console.log(product);
    const options={
        value:product.ratings,
        readOnly :true,
        precision:0.5

    }
  return (
    <>
        <NavLink className="productCard" to={`/product/${product._id}`}>

            {/* <img src={product.images[0].url} alt="" /> */}
            <img src="./images/phone.jpg" alt="" />
            <p>{product.name}</p>
            <div>
                <Rating {...options}/>{" "}
                <span className="productCardSpan">
                    {" "}
                    ({product.numOfReviews} Reviews)

                </span>

            </div>

            <span>{`₹${product.price}`}</span>
        </NavLink>

    </>
  )
}
