import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";

import { useSelector } from "react-redux";

import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import store from "./store";
import { loadUser } from "./redux/actions/userAction";
import Home from "./pages/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import UserOptions from "./component/common/UserOptions";
import LoginSignUp from "./component/user/LoginSignUp";
import Products from "./component/Product/Products";

import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import Profile from "./component/user/Profile";
import Dashboard from "./component/Dashboard/Dashboard";
import ProductList from "./component/Dashboard/ProductList";
import Dhome from "./component/Dashboard/Dhome";
import ScrollToTop from "./component/common/ScrollToTop";
import NewProduct from "./component/Dashboard/NewProduct";
import OrderList from "./component/Dashboard/OrderList";
import UsersList from "./component/Dashboard/UsersList";
import ProductReviews from "./component/Dashboard/ProductReviews";
import UpdateProduct from "./component/Dashboard/UpdateProduct";
import ProcessOrder from "./component/Dashboard/ProcessOrder";
import UpdateUser from "./component/Dashboard/UpdateUser";
import UpdateProfile from "./component/user/UpdateProfile";
import ResetPassword from "./component/user/ResetPassword";
import UpdatePassword from "./component/user/UpdatePassword";
import ForgotPassword from "./component/user/ForgotPassword";
import OrderDetails from "./component/Order/OrderDetails";
import PrivateRoute from "./routes/PrivateRoute";
import Header from "./component/common/Header/Header";
import AdminRoute from "./routes/AdminRoute";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeApiKey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Poppins", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <>
      <ScrollToTop />

      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />

        <Route
          path="products"
          element={
            <>
              <Header />
              <Products />
            </>
          }
        />
        <Route
          path="products/:keyword"
          element={
            <>
              <Header />
              <Products />
            </>
          }
        />
        <Route
          path="product/:id"
          element={
            <>
              <Header />
              <PrivateRoute>
                <ProductDetails />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="account"
          element={
            <PrivateRoute>
              <Header />
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="account/update"
          element={
            <PrivateRoute>
              <UpdateProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="password/update"
          element={
            <PrivateRoute>
              <UpdatePassword />
            </PrivateRoute>
          }
        />
        <Route path="password/forgot" element={<ForgotPassword />} />
        <Route
          path="password/reset/:token"
          element={
            <PrivateRoute>
              <ResetPassword />
            </PrivateRoute>
          }
        />
        <Route
          path="cart"
          element={
            <>
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="shipping"
          element={
            <>
              <PrivateRoute>
                <Shipping />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="order/confirm"
          element={
            <>
              <PrivateRoute>
                <ConfirmOrder />
              </PrivateRoute>
            </>
          }
        />
        <Route path="success" element={<OrderSuccess />} />
        <Route
          path="orders"
          element={
            <>
              <PrivateRoute>
                <MyOrders />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="order/:id"
          element={
            <>
              <PrivateRoute>
                <OrderDetails />
              </PrivateRoute>
            </>
          }
        />
        {stripeApiKey && (
          <Route
            path="process/payment"
            element={
              <>
                <PrivateRoute>
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                </PrivateRoute>
              </>
            }
          />
        )}
        <Route path="login" element={<LoginSignUp />} />

        {/* Admin dashboard */}

        {user && user.role === "admin" && (
          <Route
            path="admin"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          >
            <Route
              path="products"
              element={
                <AdminRoute>
                  <ProductList />
                </AdminRoute>
              }
            />
            <Route
              path="product/:id"
              element={
                <AdminRoute>
                  <UpdateProduct />
                </AdminRoute>
              }
            />
            <Route
              path="product"
              element={
                <AdminRoute>
                  <NewProduct />
                </AdminRoute>
              }
            />
            <Route
              path="orders"
              element={
                <AdminRoute>
                  <OrderList />
                </AdminRoute>
              }
            />
            <Route
              path="order/:id"
              element={
                <AdminRoute>
                  <ProcessOrder />
                </AdminRoute>
              }
            />
            <Route
              path="users"
              element={
                <AdminRoute>
                  <UsersList />
                </AdminRoute>
              }
            />
            <Route
              path="user/:id"
              element={
                <AdminRoute>
                  <UpdateUser />
                </AdminRoute>
              }
            />
            <Route
              path="reviews"
              element={
                <AdminRoute>
                  <ProductReviews />
                </AdminRoute>
              }
            />
            <Route
              index
              element={
                <AdminRoute>
                  <Dhome />
                </AdminRoute>
              }
            />
          </Route>
        )}
      </Routes>
    </>
  );
}

export default App;
