import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import { Loader } from '../basic/Loader/Loader';
import MetaData from '../basic/Metadata';
import "./profile.css";

export const Profile = () => {
    const navigate = useNavigate();

    const {user,loading, isAuthenticated} = useSelector((state)=> state.user);

    useEffect(()=>{
        if(isAuthenticated=== false){
            navigate("/login");
        }
    },[navigate,isAuthenticated]);

  return (
    <>
       { loading?(
        Loader
       ):
       (
        <>
            <MetaData title={`${user.name}'s Profile`}/>
            <div className="profileContainer">
                <div>
                    <h1>My Profile</h1>
                    <img src={user.avatar.url} alt={user.name} />

                    <NavLink to="/me/update">Edit Profile</NavLink>

                </div>
                <div>
                <div>
                    <h4>Full Name</h4>
                    <p>{user.name}</p>

                </div>

                <div>
                    <h4>Joined On</h4>
                    <p>{String(user.createdAt).substr(0,10)}</p>
                </div>

                <div>
                    <NavLink to="/orders">My Orders</NavLink>
                    <NavLink to="/password/update">Change Password</NavLink>
                </div>
                </div>
            </div>
        </>
       )
       }
    </>
  )
}
