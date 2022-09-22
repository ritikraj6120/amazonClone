import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
import OrderItem from "./OrderItem";
import { CircularProgress, Typography, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getOrdersHistory } from "../actions/orderAction";
const Orders = () => {
    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };
    const ordersHistoryState = useSelector((state) => state.ordersHistory);
    // if (!ordersHistoryState.loading)
    //     console.log(ordersHistoryState.pastOrders);
    const loading = ordersHistoryState.loading;
    const totalPages = ordersHistoryState.pastOrders.totalPages;
    const orders = ordersHistoryState.pastOrders.orders;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrdersHistory(page));
    }, [page]);

    return (
        <>
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    {" "}
                    <Box sx={{ width: "30%", display:"flex",margin:"auto" }}>
                        <Typography variant="h4" >
                            Your Orders
                        </Typography>
                    </Box>
                    {orders.map((order, index) => {
                        return (
                            <div className="col-sm" key={index}>
                                <OrderItem order={order} />
                            </div>
                        );
                    })}
                    <Pagination
                        count={totalPages}
                        variant="text"
                        shape="rounded"
                        showFirstButton
                        showLastButton
                        page={page}
                        color="primary"
                        onChange={handleChange}
                        sx={{
                            position: "relative",
                            left: "35vw",
                            bottom: "10px",
                            width: "100%",
                            marginTop: "5vh",
                        }}
                    />
                </>
            )}
        </>
    );
};

export default Orders;
