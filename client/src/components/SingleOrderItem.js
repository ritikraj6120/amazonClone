import React from "react";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { CircularProgress, Box, Typography } from "@mui/material";
import { fetchSingleOrderHistory } from "../actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import SingleOrderItemSubUnit from "./SingleOrderItemSubUnit";
const SingleOrderItem = () => {
    let history = useHistory();
    // let location = useLocation();
    const dispatch = useDispatch();
    const SingleOrderHistory = useSelector((state) => state.SingleOrderHistory);
    const { loading, error, order } = SingleOrderHistory;
    const { amount, date, items, itemDict } = order;
    let { orderId } = useParams();

    useEffect(() => {
        dispatch(fetchSingleOrderHistory(orderId, history));
    }, []);

    return (
        <>
            {loading || error ? (
                <Box sx={{ display: "flex" }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            fontWeight: "bold",
                            margin: "5vh auto",
                        }}
                    >
                        Your Order History
                    </Typography>

                    {items.map((item) => (
                        <SingleOrderItemSubUnit
                            key={item._id}
                            id={item._id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                            quantity={itemDict[item._id]}
                        />
                    ))}
                </>
            )}
        </>
    );
};

export default SingleOrderItem;
