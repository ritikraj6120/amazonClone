import React from "react";
import { fetchItemById } from "../actions/itemAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { notifyError } from "../alert";
import { addToBasket } from "../actions/orderAction";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import "./styles/SingleProduct.css";
const SingleProduct = () => {
    const dispatch = useDispatch();
    const itemState = useSelector((state) => state.fetchItemById);
    const orderState = useSelector((state) => state.orderState);
    let { productId } = useParams();

    const CurrentItemInCart = (itemId) => {
        if (itemId in orderState.basketDict) {
            return orderState.basketDict[itemId];
        } else return 0;
    };

    useEffect(() => {
        dispatch(fetchItemById(productId));
    }, [productId]);

    const userLogin = useSelector((state) => state.userLogin);
    const isloggedIn = userLogin.userInfo.isloggedIn;
    const { loading, item, error } = itemState;
    const addToBasketHandle = () => {
        if (isloggedIn) {
            dispatch(addToBasket(item));
        } else notifyError("Login to add Item to Cart");
    };
    return (
        <div>
            {loading === true ? (
                <div>wait loading</div>
            ) : error !== null ? (
                <div>Please refresh Page</div>
            ) : (
                <div className="container">
                    <div className="card">
                        <div className="container-fliud">
                            <div className="wrapper row">
                                <div className="preview col-md-6">
                                    <div className="preview-pic tab-content">
                                        <div
                                            className="tab-pane active"
                                            id="pic-1"
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                            />
                                        </div>
                                        {/* <div className="tab-pane" id="pic-2"><img src={item.image} /></div>
						  <div className="tab-pane" id="pic-3"><img src="http://placekitten.com/400/252" /></div>
						  <div className="tab-pane" id="pic-4"><img src="http://placekitten.com/400/252" /></div>
						  <div className="tab-pane" id="pic-5"><img src="http://placekitten.com/400/252" /></div> */}
                                    </div>
                                    {/* <ul className="preview-thumbnail nav nav-tabs">
						  <li className="active"><a data-target="#pic-1" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
						  <li><a data-target="#pic-2" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
						  <li><a data-target="#pic-3" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
						  <li><a data-target="#pic-4" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
						  <li><a data-target="#pic-5" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
						</ul>
						 */}
                                </div>
                                <div className="details col-md-6">
                                    <h3 className="product-title">
                                        {item.title}
                                    </h3>
                                    <div className="rating">
                                        <div className="stars">
                                            {/* <span className="fa fa-star checked"></span>
								<span className="fa fa-star checked"></span>
								<span className="fa fa-star checked"></span>
								<span className="fa fa-star"></span>
								<span className="fa fa-star"></span> */}
                                            <div>
                                                {Array(item.rating)
                                                    .fill()
                                                    .map((_, i) => (
                                                        <span
                                                            key={i}
                                                            className="fa fa-star checked"
                                                        ></span>
                                                    ))}
                                                {Array(5 - item.rating)
                                                    .fill()
                                                    .map((_, i) => (
                                                        <span
                                                            key={i}
                                                            className="fa fa-star"
                                                        ></span>
                                                    ))}
                                            </div>
                                        </div>
                                        {/* <span className="review-no">41 reviews</span> */}
                                    </div>
                                    <p className="product-description">
                                        {item.description}
                                    </p>
                                    <h4 className="price">
                                        current price:{" "}
                                        <span>
                                            <CurrencyRupeeIcon fontSize="medium" />{" "}
                                            {item.price}
                                        </span>
                                    </h4>
                                    {/* <p className="vote"><strong>91%</strong> of buyers enjoyed this product! <strong>(87 votes)</strong></p> */}
                                    {/* <h5 className="sizes">sizes:
							<span className="size" data-toggle="tooltip" title="small">s</span>
							<span className="size" data-toggle="tooltip" title="medium">m</span>
							<span className="size" data-toggle="tooltip" title="large">l</span>
							<span className="size" data-toggle="tooltip" title="xtra large">xl</span>
						</h5>
						<h5 className="colors">colors:
							<span className="color orange not-available" data-toggle="tooltip" title="Not In store"></span>
							<span className="color green"></span>
							<span className="color blue"></span>
						</h5> */}
                                    <div className="action">
                                        <button
                                            className="add-to-cart btn btn-default"
                                            type="button"
                                            onClick={addToBasketHandle}
                                            disabled={
                                                CurrentItemInCart(item._id) <
                                                item.stocks
                                                    ? false
                                                    : true
                                            }
                                        >
                                            add to cart
                                        </button>
                                        {/* <button className="like btn btn-default" type="button"><span className="fa fa-heart"></span></button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleProduct;
