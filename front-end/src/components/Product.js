import React, { useState, useEffect } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Truncate from "react-truncate";
import * as dispatches from "../store/actions/wishListAction";
import { useSelector, useDispatch } from "react-redux";
import { Image } from "react-bootstrap";

import { Link } from "react-router-dom";
import "./product.css";
import Ratings from "./Ratings";

const Products = ({
  image,
  price,
  title,
  rating,
  numReviews,
  id,
  discount,
}) => {
  const [save, setSave] = useState(true);
  const dispatch = useDispatch();
  const addWishList = () => {
    dispatch(dispatches.addWishList({ favorate: id }));
  };

  const wishListState = useSelector((state) => state.getWishLists);
  const addwishListState = useSelector((state) => state.addToWishList);
  const userState = useSelector((state) => state.userLogin);
  const { wishList, loading } = wishListState;
  const { succ, loading: loader } = addwishListState;
  const { token, user, isAdmin } = userState;
  const isAuth = token != null;
  useEffect(() => {
    if (isAuth) {
      dispatch(dispatches.getWishList());
    }
  }, [dispatches, dispatch, succ, isAuth]);
  return (
    <div className="product-container mt-2">
      {discount !== 0 && (
        <div className="discount-div">
          <span>{discount} %</span>
          <span>OFF</span>
        </div>
      )}
      {isAuth && (
        <div
          className="whishlist-div"
          onClick={() => {
            addWishList();
          }}
        >
          {id &&
          wishList &&
          wishList.find((x) => id.toString() === x._id._id.toString()) ? (
            <FavoriteIcon />
          ) : (
            <FavoriteBorderIcon />
          )}
        </div>
      )}

      <Link to={`/product/${id}`}>
        <div className="image-div">
          <Image src={image} fluid />
        </div>
      </Link>
      <div className="product-body">
        <Link to={`/product/${id}`}>
          <Truncate lines={2} ellipsis="...">
            {title}
          </Truncate>
        </Link>

        <div className="product_price">
          R <strong> {(price - price * (discount / 100)).toFixed(2)}</strong>
        </div>
        {discount !== 0 && (
          <div className="discount_price ">
            R {(price * (discount / 100)).toFixed(2)}
          </div>
        )}
        <div className="ratings">
          <Ratings value={rating} text={`${numReviews} reviews`} />{" "}
        </div>
      </div>
    </div>
  );
};

export default Products;
