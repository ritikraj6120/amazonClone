import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./styles/Checkout.css";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";
// import {fetchFromBasketDB} from "../actions/orderAction";
const Checkout = () => {
    const dispatch = useDispatch();
    const userLoginState = useSelector((state) => state.userLogin);
    const user = userLoginState.userInfo;
    const orderState = useSelector((state) => state.orderState);
    const basket = orderState.basket;
    const basketDict = orderState.basketDict;

    // useEffect(() => {
    //     dispatch(fetchFromBasketDB());
    // }, []);

    return (
        <div className="checkout">
            <div className="checkout__left">
                <img
                    className="checkout__ad"
                    src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
                    alt=""
                />
                <div>
                    <h2 className="checkout__title"> Your Shopping Basket </h2>
                    {orderState.loading === true ? (
                        <Box sx={{ display: "flex" }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        basket.map((item) => (
                            <CheckoutProduct
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                                quantity={basketDict[item.id]}
                            />
                        ))
                    )}
                </div>
            </div>
            <div className="checkout__right">
                <Subtotal />
            </div>
        </div>
    );
};

export default Checkout;
