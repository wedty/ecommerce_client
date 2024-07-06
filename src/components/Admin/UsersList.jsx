import React, { useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, deleteUser, getAllUsers } from '../../Actions/userAction';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { DELETE_USER_RESET } from '../../Constants/userConstants';
import { Button } from '@material-ui/core';
import MetaData from '../basic/Metadata';
import { Sidebar } from './Sidebar';
import { DataGrid } from '@material-ui/data-grid';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

export const UsersList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {id} =useParams();

    const {error,users} = useSelector((state)=>state.allUsers);

    const {
        error:deleteError,
        isDeleted,
        message
    }=useSelector((state)=>state.profile);

    const deleteUserHandler = (id)=>{
        dispatch(deleteUser(id));

    };
    const navigate = useNavigate();
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
            
        }
        if(deleteError){
            alert.error(deleteError);
            dispatch(clearErrors());

        }
        if(isDeleted){
            alert.success(message);
            navigate("/admin/users");
            dispatch({type:DELETE_USER_RESET});
        }
        dispatch(getAllUsers());
},[dispatch,alert,error,deleteError,navigate,isDeleted,message])

const columns=[
    {field:"id",headerName:"User ID",minWidth:180, flex:0.8},

    {
        field: "email",
        headerName: "Email",
        minWidth: 200,
        flex: 1,
      },
    {
        field: "name",
        headerName: "Name",
        minWidth: 150,
        flex: 0.5,
      },
  
      {
        field: "role",
        headerName: "Role",
        type: "number",
        minWidth: 150,
        flex: 0.3,
        cellClassName: (params) => {
          return params.getValue(params.id, "role") === "admin"
            ? "greenColor"
            : "redColor";
        },
      },
      
      {
        field:"actions",
        flex:0.3,
        headerName:"Actions",
        minWidth:150,
        type:"number",
        sortable:false,
        renderCell:(params)=>{
            return (
                <>
                    <NavLink to={`/admin/user/${params.getValue(params.id,"id")}`}>
                        <EditIcon/>
                    </NavLink>
                    <Button onClick={()=>deleteUserHandler(params.getValue(params.id,"id"))}>
                        <DeleteIcon/>
                    </Button>
                </>
            )
        }
      }
];

const rows =[];

users &&
    users.forEach((item)=>{
        rows.push({
            id:item._id,
            role:item.role,
            email:item.email,
            name:item.name,
        })
    });




  return (
   <>
        <MetaData title={`ALL USERS - Admin`} />
        <div className="dashboard">
            <Sidebar/>
            <div className="productListContainer">
                <h1 id="productListHeading">All Users</h1>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className='productListTable'
                    autoHeight
                />
            </div>
        </div>

   </>
  )
}
