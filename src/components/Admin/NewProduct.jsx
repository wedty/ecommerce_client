import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { clearErrors, createProduct } from '../../Actions/productActions';
import { NEW_PRODUCT_RESET } from '../../Constants/productsConstant';
import {Sidebar} from "./Sidebar"
import { Button } from '@material-ui/core';
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import MetaData from '../basic/Metadata';
import "./newproduct.css"

export const NewProduct = () => {

    const navigate = useNavigate();
    const dispatch =useDispatch();
    const alert = useAlert();
    
    const {loading,error,success} = useSelector((state)=>state.newProduct);

    const [name, setName] = useState("");
    const [price,setPrice]= useState(0);
    const [desc,setDesc] = useState("");
    const [category,setCategory] = useState("");
    const [Stock,setStock] = useState(0);

    const [images,setImages]= useState([]);
    const [imagesPreview,setImagesPreview] = useState([]);

    const categories=[ "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",];

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());

        }

        if(success){
            alert.success("Product Created Successfully");
            navigate("/admin/dashboard");
            dispatch({type:NEW_PRODUCT_RESET});

        }


    },[dispatch,alert,error,navigate,success])

    const createProductSubmtiHandler = (e)=>{
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name",name);
        myForm.set("price",price);
        myForm.set("desc",desc);
        myForm.set("category",category);
        myForm.set("Stock",Stock);

        images.forEach((image)=>{
            myForm.append("images",image);
        });
        dispatch(createProduct(myForm));

    }

    const createProductImagesChange = (e)=>{
        const files = Array.from(e.target.files);
        setImages([]);

        setImagesPreview([]);

        files.forEach((file)=>{
            const reader = new FileReader();

            reader.onload = ()=>{
                if(reader.readyState===2){
                    setImagesPreview((prev)=>[...prev,reader.result])
                    setImages((prev)=>[...prev,reader.result]);

                }
            }
            reader.readAsDataURL(file);
        });

    }
  return (
    <>
    <MetaData title="Create Product" />
    <div className="dashboard">
        <Sidebar/>
        <div className="newProductContainer">
            <form  className="createProductForm"
            encType="multipart/form-data" onSubmit={createProductSubmtiHandler}>

                <h1>Create a Product</h1>
                <div>
                    <SpellcheckIcon/>
                    <input type="text" placeholder="Product Name"
                    required value ={name} onChange={(e)=>setName(e.target.value)} />
                </div>
                <div>
                    <AttachMoneyIcon/>
                    <input type="number" placeholder="Price"
                    required value ={price} onChange={(e)=>setPrice(e.target.value)} />
                </div>
                <div>
                    <DescriptionIcon/>
                    <textarea
                placeholder="Product Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
                </div>
                <div>
                    <AccountTreeIcon />
                    <select onChange={(e)=>setCategory(e.target.value)}>
                        <option value="">Choose Category</option>
                        {categories.map((cat)=>(
                            <option key={cat}  value={cat}>{cat}</option>
                        ))}
                    </select>

                </div>

                <div>
                    <StorageIcon/>
                    <input
                        type="number"
                        placeholder="Stock"
                        required
                        onChange={(e) => setStock(e.target.value)}
                    />

                </div>

                <div id="createProductFormFile">
                    <input type="file" name="avatar" accept="image/*"
                    onChange={createProductImagesChange} multiple />

                </div>
                <div id="createProductFormImage">
                    {imagesPreview.map((image,idx)=>(
                        <img key={idx} src ={image} alt="product"/>
                    ))}
                </div>

                <Button id="createProductBtn" type="submit" disabled={loading?true:false}>
                    Create
                </Button>
            </form>

        </div>
    </div>

    </>
  )
}
