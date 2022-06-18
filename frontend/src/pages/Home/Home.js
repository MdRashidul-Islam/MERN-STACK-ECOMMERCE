import React, { Fragment, useEffect } from "react";
import "./Home.scss";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../../component/common/Loader/Loader";
import MetaData from "../../component/common/MetaData";
import ProductCard from "../../component/Product/ProductCard/ProductCard";
import Footer from "../../component/Footer/Footer";
import Banner from "../../component/Home/Banner/Banner";
import Product from "../../component/Product/Product";

import {
  clearErrors,
  getHomeProduct,
} from "../../redux/actions/productAction.js";
import Newsletter from "../../component/Home/Newsletter/Newsletter";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getHomeProduct());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />
          <Banner />
          <div className="home">
            <div className="home_container">
              <h2 className="homeHeading">HOT GADGETS</h2>
              <div className="home_row">
                {products &&
                  products
                    .slice(0, 2)
                    .map((product) => (
                      <Product key={product._id} product={product} />
                    ))}
              </div>
              <div className="home_row">
                {products &&
                  products
                    .slice(3, 6)
                    .map((product) => (
                      <Product key={product._id} product={product} />
                    ))}
              </div>
              <div className="home_row">
                {products &&
                  products
                    .slice(12, 13)
                    .map((product) => (
                      <Product key={product._id} product={product} />
                    ))}
              </div>
              <div className="seeMore">
                <Link to="/products">See More</Link>
              </div>

              <h2 className="homeHeading">Featured Products</h2>
              <div className="homeProducts">
                <div className="pd">
                  {products &&
                    products
                      .slice(6, 18)
                      .map((product) => (
                        <ProductCard key={product._id} product={product} />
                      ))}
                </div>
                <div className="seeMore">
                  <Link to="/products">See More</Link>
                </div>
              </div>
            </div>
          </div>

          {/* <Newsletter /> */}
          <Footer />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
