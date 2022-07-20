import React from 'react'
import { useDispatch } from 'react-redux';
import './Product.css'
const Product = (data) => {
const  {id,title,image,price,rating}=data
const dispatch=useDispatch();

// const orderState = useSelector(state => state.orderState);
//   const [{ basket }] = useStateValue();

  const addToBasket = () => {
    // dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
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
             <p>{title}</p>
             <p className="product__price">
                <small>Rs.</small>
                <strong>{price}</strong>
             </p>
        <div className="product__rating">
            {Array(rating).fill().map((_, i) => (<p>🌟</p>))}
        </div>
        </div>
        

    <img src="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"/>
    <button onClick={addToBasket}>Add to basket</button>
    </div>
  )
}
export default Product