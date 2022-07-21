import React from 'react'
import './styles/Subtotal.css'
import {useSelector} from "react-redux";
import { getBasketTotal } from "../reducers/orderReducer.js";
import CurrencyFormat from 'react-currency-format'
import { Helmet } from "react-helmet";
import {handlePayment} from './Payment.js'
const Subtotal = () => {
	const orderState = useSelector(state=>state.orderState)
  const basket=orderState.basket;
  return (
    <div className="subtotal">
        <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
            
              Subtotal ({basket.length} items): <strong>{ value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value= {getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"Rs"}
      />

       <button onClick={(e)=>handlePayment(e,getBasketTotal(basket),basket)}>Proceed to Checkout</button>
			 <Helmet>
				<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
			</Helmet>
    </div>
  )
}

export default Subtotal