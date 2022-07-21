import React from "react";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import SummaryProduct from "./SummaryProduct";
const Summary = () => {
  let history = useHistory();
  const [orderState, setOrderState] = useState({
    loading: true,
    error: null,
    orderDetails: [],
  });
  let { orderId } = useParams();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:5000/fetchorders/${orderId}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response)
      if (response.status === 200) {
        const data = await response.json();
        setOrderState({
          loading: false,
          error: null,
          orderDetails: data,
        });
      } else if (response.status === 400) {
        history.push("/");
      } else {
        history.push("/");
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {
      (orderState.loading || orderState.error) ? 
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
       : 
       <>
       <h1>Your Orders</h1>
        
        { 
        orderState.orderDetails.map((item) => (
           <SummaryProduct key={item._id}
              id={item._id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
        )) 
        }
          </>
      }
    </>
  );
};

export default Summary;
