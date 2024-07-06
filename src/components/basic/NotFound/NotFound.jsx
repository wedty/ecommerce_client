import { Typography } from '@material-ui/core'
import React from 'react'
import { NavLink } from 'react-router-dom'
import ErrorIcon from "@material-ui/icons/Error";
import "./notfound.css";


export const NotFound = () => {
  return (
    <>
        <div className="pageNotFound">
            <ErrorIcon/>
            <Typography>Page Not Found </Typography>
            <NavLink to="/">Home</NavLink>
        </div>
    </>
  )
}
