
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import "./search.css";
import MetaData from "../basic/Metadata"
// const Search = 
export const Search = ({ history }) => {
    const [keyword, setKeyword] = useState("");
    
    const navigate = useNavigate();

    const searchSubmitHandler = (e) => {
      e.preventDefault();
      if (keyword.trim()) {
        // history.push(`/products/${keyword}`);
        navigate(`/products/${keyword}`);
      } else {
        navigate("/products");
      }
    };
    console.log(keyword);
  
    return (
      <>
        <MetaData title="Search A Product -- ECOMMERCE" />
        <form className="searchBox" onSubmit={searchSubmitHandler}>
          <input
            type="text"
            placeholder="Search a Product ..."
            onChange={(e) => setKeyword(e.target.value)}
          />
          <input type="submit" value="Search" />
        </form>
      </>
    );
}
