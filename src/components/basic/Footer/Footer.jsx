import React from 'react'
import {BsFacebook, BsInstagram, BsTwitter} from "react-icons/bs"
import "./footer.css"
export const Footer = () => {
  return (
<>
    <footer id="footer">
        <div className="leftSide">
            <h4>Download our App</h4>
            <p>Download App for Android and Ios Mobile phone</p>
            <img src="/images/playStore.png" alt="playstore" />
            <img src="/images/AppStore.png" alt="appstore" />

        </div>
            <div className="midSide">
                <h1>SHOP_IT_UP</h1>
                <p>High Quality is our first priority</p>
                <p>Copyrights 2023 &copy; </p>

            </div>

            <div className="rightSide">
                <h4>Follow Us</h4>
                <a href="https://instagram.com" target="_blank"><BsInstagram/> <span>Instagram</span></a>
                <a href="https://facebook.com" target="_blank"><BsFacebook/><span>Facebook</span></a>
                <a href="https://twitter.com" target="_blank"><BsTwitter/><span>Twitter</span></a>
            </div>

    </footer>
</>
  )
}
