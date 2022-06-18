import React, { Fragment, useEffect, useState } from "react";
import "./Products.scss";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../redux/actions/productAction";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../common/Loader/Loader";
import MetaData from "../common/MetaData";
import ProductCard from "./ProductCard/ProductCard";

const categories = [
  "All",
  "Books",
  "Beauty-picks",
  "Camera",
  "Computers-Accessories",
  "Dresses",
  "Electronics",
  "Footwear",
  "Girls-Fashion",
  "Gaming-accessories",
  "Health-Personal-Care",
  "Home-Kitchen",
  "Mens-Fashion",
  "SmartPhones",
  "Tools-Home-Improvement",
];

const Products = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const alert = useAlert();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  if (category === "All") {
    setCategory(null);
    navigate("/products");
  }

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  let count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS" />

          <div className="products">
            <div className="left">
              <div className="filterBox">
                <Typography component="legend">Price</Typography>
                <Slider
                  className="slider"
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={25000}
                />

                <Typography>Categories</Typography>
                <ul className="categoryBox">
                  {categories.map((category) => (
                    <li
                      className="category-link"
                      key={category}
                      onClick={() => setCategory(category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>

                <fieldset>
                  <Typography className="rating" component="legend">
                    Ratings Above
                  </Typography>
                  <Slider
                    value={ratings}
                    onChange={(e, newRating) => {
                      setRatings(newRating);
                    }}
                    aria-labelledby="continuous-slider"
                    valueLabelDisplay="auto"
                    min={0}
                    max={5}
                  />
                </fieldset>
              </div>
            </div>

            <div className="right">
              <h2 className="productsHeading">Products</h2>
              <div className="productsContainer">
                {products &&
                  products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
              </div>
            </div>
          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
