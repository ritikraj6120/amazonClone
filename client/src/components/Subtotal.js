import React from "react";
import "./styles/Subtotal.css";
import { useSelector, useDispatch } from "react-redux";
// import { getBasketTotal } from "../reducers/orderReducer.js";
import CurrencyFormat from "react-currency-format";
import { Helmet } from "react-helmet";
import { handlePayment } from "./Payment.js";
import { useHistory } from "react-router-dom";
const Subtotal = () => {
    const dispatch = useDispatch();
    let history = useHistory();
    const orderState = useSelector((state) => state.orderState);
    const basket = orderState.basket;
    const basketDict = orderState.basketDict;
    const getBasketTotal = () => {
        let cost = 0;
        for (let i = 0; i < basket.length; i++) {
            cost += basketDict[basket[i].id] * basket[i].price;
        }
        return Math.ceil(cost);
    };
    const getBasketItems = () => {
        let count = 0;
        for (let i = 0; i < basket.length; i++) {
            count += basketDict[basket[i].id];
        }
        return count;
    };
    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({getBasketItems()} items):{" "}
                            <strong>{value}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" /> This order contains a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rs"}
            />

            <button
                onClick={(e) =>
                    handlePayment(
                        e,
                        getBasketTotal(),
                        basketDict,
                        history,
                        dispatch
                    )
                }
            >
                Proceed to Checkout
            </button>
            <Helmet>
                <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
            </Helmet>
        </div>
    );
};

export default Subtotal;
