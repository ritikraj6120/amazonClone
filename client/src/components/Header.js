import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { handleLogout } from "../actions/userAction.js";
import Header2 from "./Header2";
import "./styles/Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { fetchFromBasketDB } from "../actions/orderAction";
const Header = () => {
    const dispatch = useDispatch();
    let history = useHistory();
    const userLoginState = useSelector((state) => state.userLogin);
    const { isloggedIn, userName } = userLoginState.userInfo;
    const orderState = useSelector((state) => state.orderState);
    const basketDict = orderState.basketDict;

    useEffect(() => {
        dispatch(fetchFromBasketDB());
    }, []);

    const countTotalQuantity = () => {
        let c = 0;
        for (const item in basketDict) {
            c += basketDict[item];
        }
        return c;
    };
    const handleAuthenticaton = () => {
        if (isloggedIn) {
            dispatch(handleLogout(history));
        } else {
            history.push("/login");
        }
    };

    const handleOrders = () => {
        history.push("/orders");
    };
    return (
        <>
            <div className="header">
                <Link to="/">
                    <img
                        className="header_logo"
                        src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                    />
                </Link>

                <div className="header_search">
                    <input className="header_searchInput" type="text" />
                    <SearchIcon className="header_searchIcon" />
                </div>
                <div className="header_nav">
                    <div
                        className="header_option"
                        onClick={handleAuthenticaton}
                    >
                        <span className="header_optionLineOne">
                            Hello {!isloggedIn ? "Guest" : userName}
                        </span>
                        <span className="header_optionLineTwo">
                            {!isloggedIn ? "Sign In" : "Sign Out"}
                        </span>
                    </div>

                    <div className="header_option" onClick={handleOrders}>
                        {/* <Link to="/orders" style={{ color: "white" }}> */}
                            <span className="header_optionLineOne">
                                {" "}
                                Returns
                            </span>
                            <span className="header_optionLineTwo">
                                & Orders
                            </span>
                        {/* </Link> */}
                    </div>
                    <div className="header_option">
                        <Link to="/account">
                            {/* <IconButton sx={{color:"white"}} onClick={}> */}
                            <AccountCircleIcon
                                sx={{ fontSize: "2vw", color: "white" }}
                            />
                            {/* </IconButton> */}
                        </Link>
                    </div>
                    <Link to="/checkout">
                        <div className="header_optionBasket">
                            <ShoppingBasketIcon />
                            <span className="header_optionLineOne header_basketCount">
                                {orderState.loading === true
                                    ? 0
                                    : countTotalQuantity()}
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
            <Header2 />
        </>
    );
};

export default Header;
