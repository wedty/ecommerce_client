
    


    import React from "react";
import { ReactNavbar } from "overlay-navbar";
// import logo from "../../images/logo.png";

import {MdAccountCircle} from "react-icons/md";
import {MdSearch} from "react-icons/md";
import {MdAddShoppingCart} from "react-icons/md";

const options = {
  burgerColor:"grey",
  burgerColorHover: "#eb4034",
  logo:"/images/logo.png",
  logoWidth: "15vmax",
  navColor1: "black",
  logoHoverSize: "10px",
  logoHoverColor: "grey",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About", 
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "white",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "grey",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIcon:true,
  profileIconColor:"#fff",
  ProfileIconElement:MdAccountCircle,
  searchIcon:true,
  searchIconColor: "#fff",
  SearchIconElement:MdSearch,
  cartIcon:true,
  cartIconColor: "#fff",
  CartIconElement:MdAddShoppingCart,
  profileIconColorHover: "grey",
  searchIconColorHover: "grey",
  cartIconColorHover: "grey",
  cartIconMargin: "1vmax",
 
};
export const Header = () => {
  return (
    <>
        <ReactNavbar {...options}/>
    </>
  )
}
