import React from 'react'
import './Subtotal.css'
import {useSelector} from "react-redux";
import { getBasketTotal } from "../reducers/orderReducer.js";
import CurrencyFormat from 'react-currency-format'
const Subtotal = () => {
  const orderState = useSelector(state=>state.orderState)
  const basket=orderState.basket;
  return (
    <div className="subtotal">
        <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
            
              Subtotal ({basket.length} items): <strong>{value}</strong>
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
        prefix={"$"}
      />

       <button onClick="">Proceed to Checkout</button>
    
    </div>
  )
}

export default Subtotal