import React, { useEffect, useState } from 'react'
import "./app.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Footer } from './components/basic/Footer/Footer';
import { Header } from './components/basic/Header/Header';
import store from "./store";
import { Home } from './components/Home/Home';
import { ProductDetails } from './components/Product/ProductDetails';
import { Products } from './components/Product/Products';
import { Search } from './components/Product/Search';
import { LoginRegister } from './components/User/LoginRegister';
import { UserOptions } from './components/basic/Header/UserOptions';
import { useSelector } from 'react-redux';
import { UpdateProfile } from './components/User/UpdateProfile';
import { Profile } from './components/User/Profile';
import { UpdatePassword } from './components/User/UpdatePassword';
import { ForgotPassword } from './components/User/ForgotPassword';
import { ResetPassword } from './components/User/ResetPassword';
import {ProtectedRoute} from "./components/Route/ProtectedRoute"
import { loadUser } from './Actions/userAction';
import {Shipping} from './components/Cart/Shipping'
import {Payment} from './components/Cart/Payment'

import {Cart} from "./components/Cart/Cart";
import { ConfirmOrder } from './components/Cart/ConfirmOrder';
import axios from "axios";
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import { OrderSuccess } from './components/Cart/OrderSuccess';
import { MyOrder } from './components/Order/MyOrder';
import { OrderDetails } from './components/Order/OrderDetails';
import { Dashboard } from './components/Admin/Dashboard';
// import axios from 'axios';
import {ProductList} from "./components/Admin/ProductList"
import {NewProduct} from "./components/Admin/NewProduct"
import {UpdateProduct} from "./components/Admin/UpdateProduct"
import { OrderList } from './components/Admin/OrderList';
import { ProcessOrder } from './components/Admin/ProcessOrder';
import { UsersList } from './components/Admin/UsersList';
import { UpdateUser } from './components/Admin/UpdateUser';
import { ProductReviews } from './components/Admin/ProductReviews';
import {NotFound} from './components/basic/NotFound/NotFound'
import {Contact} from './components/basic/Contact/Contact'
import {About} from './components/basic/About/About'

const App = () => {

  // axios.defaults.withCredentials = true;

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
// if(isAuthenticated){
  getStripeApiKey();
  if(isAuthenticated){

    console.log(stripeApiKey);
  }
  store.dispatch(loadUser());
// }

    // }
  }, [stripeApiKey]);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
        <Header/>
        {
          isAuthenticated &&( <UserOptions user={user} />)
        }

       
        <Routes>
          <Route exact path="/" element={<Home/>}/>

          <Route exact path="/product/:id" element={
<ProtectedRoute>

          <ProductDetails/>
</ProtectedRoute>

          }/>
          <Route exact path="/products/" element={<Products/>}/>

          <Route path="/products/:keyword" element={<Products/>}/>
          <Route exact path="/search" element={<Search/>}/>
          <Route exact path="/contact" element={<Contact/>}/>
          <Route exact path="/about" element={<About/>}/>
          <Route path = "/login" element={<LoginRegister/>}/>



          <Route exact path="/account" element ={<ProtectedRoute>
            <Profile/>
          </ProtectedRoute>}/>
          <Route exact path="/me/update" element ={<ProtectedRoute>
            <UpdateProfile/>
          </ProtectedRoute>
          }/>
          <Route exact path="/password/update" element ={<ProtectedRoute>
            <UpdatePassword/>
          </ProtectedRoute>
          }/>




<Route exact path="/password/forgot" element={<ForgotPassword/>} />

<Route exact path="/password/reset/:token" element={<ResetPassword/>} /> 

{/* <Route exact path="/cart" element={<Cart/>}/> */}
<Route exact path="/cart" element={
  <ProtectedRoute>
   <Cart/>
  </ProtectedRoute>
}/>
<Route exact path="/shipping" element={
  <ProtectedRoute>
    <Shipping/>
  </ProtectedRoute>
}/>
<Route
  exact path = "/order/confirm" element ={<ProtectedRoute>
    <ConfirmOrder/>
  </ProtectedRoute>}
/>
<Route
  exact path = "/success" element ={<ProtectedRoute>
    <OrderSuccess/>
  </ProtectedRoute>}
/>

<Route
  exact path = "/orders" element ={<ProtectedRoute>
    <MyOrder/>
  </ProtectedRoute>}
/>

        <Route>
          {(stripeApiKey ) && (
            <Route
              exact path="/process/payment"
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectedRoute>

                  <Payment />
                </ProtectedRoute>
                </Elements>
              }
            ></Route>
          )}
        </Route>

          <Route
            exact path = "/order/:id" element ={<ProtectedRoute>
              <OrderDetails/>
            </ProtectedRoute>}
          />

          {/* admin routes  */}
          <Route  exact path="/admin/dashboard"  element={
            <ProtectedRoute isAdmin={true}>
               <Dashboard/>
            </ProtectedRoute>
          }/>
          <Route exact path="/admin/products" element={
            <ProtectedRoute isAdmin={true}>
              <ProductList/>
            </ProtectedRoute>
          }/>
          <Route exact path="/admin/product" element={
            <ProtectedRoute isAdmin={true}>
              <NewProduct/>
            </ProtectedRoute>
          }/>
          <Route exact path="/admin/product/:id" element={
            <ProtectedRoute isAdmin={true}>
              <UpdateProduct/>
            </ProtectedRoute>
          }/>
          <Route exact path="/admin/orders" element={
            <ProtectedRoute isAdmin={true}>
              <OrderList/>
            </ProtectedRoute>
          }/>
          <Route exact path="/admin/order/:id" element={
            <ProtectedRoute isAdmin={true}>
              <ProcessOrder/>
            </ProtectedRoute>
          }/>
          <Route exact path="/admin/users" element={
            <ProtectedRoute isAdmin={true}>
              <UsersList/>
            </ProtectedRoute>
          }/>

          <Route exact path="/admin/user/:id" element={
            <ProtectedRoute isAdmin={true}>
              <UpdateUser/>
            </ProtectedRoute>
          }/>

          <Route exact path="/admin/reviews" element={
            <ProtectedRoute isAdmin={true}>
              <ProductReviews/>
            </ProtectedRoute>
          }/>


          <Route
            component={
              window.location.pathname==="process/payment"?null:NotFound
            }
          />

          <Route  element={NotFound}/>
        </Routes>
        <Footer/>
    </Router>
  )
}
export default App;