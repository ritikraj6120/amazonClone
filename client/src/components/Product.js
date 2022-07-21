import { Typography } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux';
import './styles/Product.css'
const Product = ({data}) => {
const  {_id,title,image,price,rating}=data
const dispatch=useDispatch();
// const orderState = useSelector(state => state.orderState);
//   const [{ basket }] = useStateValue();

  const addToBasket = () => {
    // dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: _id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };


  return (
    <div className="product">
        <div className="product__info">
             <Typography>{title}</Typography>
             <p className="product__price">
                <small>Rs.</small>
                <strong>{price}</strong>
             </p>
				</div>
				<img src={image}/>
        <div className="product__rating">
            {Array(rating).fill().map((_, i) => ( <p key={i}>🌟</p>))}
        </div>
				
    		<button onClick={addToBasket}>Add to basket</button>
    </div>
  )
}
export default Product