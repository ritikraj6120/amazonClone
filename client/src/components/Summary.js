import React from "react";
import { useEffect,  } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { CircularProgress, Box, Typography } from "@mui/material";
import SummaryProduct from "./SummaryProduct";
import { orderSummary } from "../actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
const Summary = () => {
  let history=useHistory();
  let location=useLocation()
  const dispatch=useDispatch();
  const summaryState=useSelector(state=>state.summaryState);
 const {loading,error,summaryDetails}=summaryState
  let { orderId } = useParams();

  useEffect(() => {
    dispatch(orderSummary(orderId,history))
  }, [location])
  

  return (
    <>
      {
      (loading || error) ? 
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
       : 
       <>
       <Typography variant="h5" component="div" sx={{display:"flex",justifyContent:"center",fontWeight:'bold',margin:"5vh auto"}}>
          Your Order Summary
        </Typography>
        
        { 
        summaryDetails.map((item) => (
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
