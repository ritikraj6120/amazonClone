import { Typography ,Box} from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './styles/Product.css'
import {addToBasket} from '../actions/orderAction'
const Product = ({data}) => {
const  {_id,title,image,price,rating}=data
const dispatch=useDispatch();
// const orderState = useSelector(state => state.orderState);
//   const [{ basket }] = useStateValue();

  const addToBasketHandle = () => {
    // dispatch the item into the data layer
	dispatch(addToBasket(data));
  };


  return (
    <div className="product">
        <div className="product__info">
          <Link to={`/product/${_id}`}  style={{textDecoration:"none"}}> 
          <Typography  >{title}</Typography>
          </Link>
             
             <p className="product__price">
                <small>Rs.</small>
                <strong>{price}</strong>
             </p>
				</div>
				<img src={image}/>
        <div className="product__rating">
        {Array(rating).fill().map((_, i) => ( <span key={i} className="fa fa-star checked"></span>))}
              { Array(5-rating).fill().map((_, i) => ( <span key={i} className="fa fa-star"></span>)) }
        </div>
				
    		<button onClick={addToBasketHandle}>Add to basket</button>
    </div>
  )
}
export default Product