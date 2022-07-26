import React from "react";
import "./styles/CheckoutProduct.css"; //1404
import { useDispatch } from "react-redux";
import { removeFromBasket } from "../actions/orderAction";

const CheckoutProduct = ({ id, image, title, price, rating, quantity }) => {
    const dispatch = useDispatch();

    //   removeFromBasket
    const removeFromBasketHandle = () => {
        dispatch(removeFromBasket(id));
    };

    return (
        <div className="checkoutProduct">
            <img className="checkoutProduct__image" src={image} />
            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{title}</p>
                <p className="checkoutProduct__price">
                    <small>Rs. </small>
                    <strong>{price}</strong>
                    <br />
                    <small>Quantity </small>
                    <strong>{quantity}</strong>
                </p>
                <div className="checkoutProduct__rating">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <p key={i}>🌟</p>
                        ))}
                </div>
                {
                    <button onClick={removeFromBasketHandle}>
                        Remove from Basket
                    </button>
                }
            </div>
        </div>
    );
};
export default CheckoutProduct;
