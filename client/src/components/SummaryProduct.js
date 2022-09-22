import React from "react";

const SummaryProduct = ({ id, image, title, price, rating, hideButton,quantity }) => {
    return (
        <div className="checkoutProduct">
            <img className="checkoutProduct__image" src={image} />
            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{title}</p>
                <p className="checkoutProduct__price">
                    <small>Rs</small>
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
            </div>
        </div>
    );
};

export default SummaryProduct;
