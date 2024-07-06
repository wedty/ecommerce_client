import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({isAdmin,children}) => {
    const {loading ,isAuthenticated,user} = useSelector((state)=>state.user); // determine if authorized, from context or however you're doing it
// if(user==)
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    if(isAdmin === true && user.role !== "admin"  ){
        return  <Navigate replace to="/login"/>
    }
   if(!loading && isAuthenticated){
    return children
   }
   return <Navigate replace to="/login"/>
}

