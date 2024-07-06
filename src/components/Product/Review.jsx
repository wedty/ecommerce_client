import React from 'react'
import {Rating} from "@material-ui/lab";


export const Review = ({review}) => {

    const options={
        value:review.rating,
        readOnly:true,
        precision:0.5,
    };
  return (
    <div className="reviewCard">
        <img src="/images/profile_pic" alt="profile_icon" />

        <p>{review.name}</p>
        <Rating {...options}/>
        <span className="reviewCardComment">{review.comment}</span>
        
    </div>
  )
}
