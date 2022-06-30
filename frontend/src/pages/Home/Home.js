import { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../component/common/Loader/Loader";
import MetaData from "../../component/common/MetaData";
import Footer from "../../component/Footer/Footer";
import Banner from "../../component/Home/Banner/Banner";
import Product from "../../component/Product/Product";
import ProductCard from "../../component/Product/ProductCard/ProductCard";
import "./Home.scss";

import { Link } from "react-router-dom";
import {
  clearErrors,
  getHomeProduct,
} from "../../redux/actions/productAction.js";

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
      <MetaData title="ECOMMERCE" />
      <Banner />
      <div className="home">
        <div className="home_container">
          <h2 className="homeHeading">HOT GADGETS</h2>
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
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
            </Fragment>
          )}
        </div>
      </div>

      {/* <Newsletter /> */}
      <Footer />
    </Fragment>
  );
};

export default Home;
