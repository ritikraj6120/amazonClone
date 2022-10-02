import { Typography } from "@mui/material";
import React from "react";
// import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { notifyError } from "../alert";
import "./styles/Product.css";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import { addToBasket } from "../actions/orderAction";
const Product = ({ data }) => {
    const { _id, title, image, price, rating, stocks } = data;
    // const dispatch = useDispatch();
    // const orderState = useSelector(state => state.orderState);
    //   const [{ basket }] = useStateValue();
    // const userLogin = useSelector((state) => state.userLogin);
    // const isloggedIn = userLogin.userInfo.isloggedIn;
    // const addToBasketHandle = () => {
    //     // dispatch the item into the data layer
    //     if (isloggedIn) dispatch(addToBasket(data));
    //     else notifyError("Login to add Item to Cart");
    // };

    const DisplayProductAvailability = (props) => {
        const stocks = props.stocks;
        if (stocks === 0) {
            return (
                <div className="product__limited">
                    <h6>Out Of Stock!</h6>
                </div>
            )
        } else if (stocks < 10)
            return (
                <div className="product__limited">
                    <h6>Hurry Up!</h6>
                    <p>Limited itemns available</p>
                </div>
            );
    };

    return (
        <div className="product">
            <div className="product__info">
                <Link to={`/product/${_id}`} style={{ textDecoration: "none" }}>
                    <Typography>{title}</Typography>
                </Link>
            </div>
            <Link
                className="product__image"
                to={`/product/${_id}`}
                style={{ textDecoration: "none" }}
            >
                <img src={image} alt={title}/>
            </Link>

            <div className="product__rating">
                {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <span key={i} className="fa fa-star checked"></span>
                    ))}
                {Array(5 - rating)
                    .fill()
                    .map((_, i) => (
                        <span key={i} className="fa fa-star"></span>
                    ))}
            </div>
            <div className="product__price">
                <CurrencyRupeeIcon fontSize="large" />
                <Typography variant="h4" sx={{ display: "inline-block" }}>
                    {price}
                </Typography>
            </div>
			<DisplayProductAvailability stocks={stocks} />
            {/* {stocks < 10 && (
                <div className="product__limited">
                    <h6>Hurry Up!</h6>
                    <p>Limited itemns available</p>
                </div>
            )} */}
            {/* <button onClick={addToBasketHandle}>Add to Cart</button> */}
        </div>
    );
};
export default Product;
