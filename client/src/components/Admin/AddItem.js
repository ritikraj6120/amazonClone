import React from 'react'
import { useState } from 'react';
import { addNewProduct } from "../../actions/adminAction";
import "../styles/Admin_AddItem.css";
import { useDispatch} from "react-redux";
import { notifyError } from '../../alert';
// import 
const AddItem = () => {
	const dispatch = useDispatch();
	const [product, setProduct] = useState({ title: '', image: '',price:'',description:'',category:'',stocks:'' });

	const handleChange=(e)=>{
			setProduct({...product, [e.target.name]: e.target.value});
	}
	const validationError=(product)=>{
		let {title, image,price,description,category,stocks }=product
		let validated_title=title.trim()
		let validated_image=image.trim()
		let validated_descripton=description.trim()
		let validated_category=category.trim()
		if(validated_title.length===0){
			notifyError("Enter product title")
			return true
		}
		if(validated_image.length===0){
			notifyError("Enter product image")
			return true
		}
		if(validated_descripton.length===0){
			notifyError("Enter product description")
			return true
		}
		if(validated_category.length===0){
			notifyError("Enter Product Category")
			return true
		}
		let validated_price=parseFloat(price)
		let validated_stocks=parseInt(stocks)

		if(Number.isNaN(validated_price) || validated_price<=0){
			notifyError("Enter Price greatet than 0")
			return true
		}
		if(Number.isNaN(validated_stocks)  || validated_stocks<0){
			notifyError("Enter stocks of product greater than or equal to zero")
			return true
		}
		return null
	}
	const handleSubmit=(e)=>{
		e.preventDefault();
		let validation_error=validationError(product);
		if(validation_error!==null){
			return;
		}
		dispatch(addNewProduct(product));
	}
  return (
		<>
    <div>AddItem</div>
		<form className='additem__form'>
		<label  htmlFor="title">title</label><br/>
		<input type="text" id="title" name="title" placeholder='Enter product title*' value={product.title} onChange={handleChange} required/><br/>
		<label htmlFor="image">image</label><br/>
	<input type="text" id="image" name="image" placeholder='Enter product image url*' value={product.image} onChange={handleChange} required/><br/>
		<label htmlFor="price">price</label><br/>
		<input type="number" id="price" placeholder='Enter product price*' name="price" value={product.price} onChange={handleChange} required/><br/>
		<label htmlFor="description">Description</label><br/>
		<input type="text" id="description" name="description" placeholder='Enter product description*' value={product.description} onChange={handleChange} required/><br/>
		<label htmlFor="category">Category</label><br/>
		<input type="text" id="category" name="category" placeholder='Enter product category*' value={product.category} onChange={handleChange} required/><br/>
		<label htmlFor="category">Product Stocks</label><br/>
		<input type="number" id="stocks" name="stocks" placeholder='Enter product stocks*' value={product.stocks} onChange={handleChange} required/><br/>
		</form>
		<button onClick={handleSubmit}>Add Entered product</button>	
		</>
  )
}

export default AddItem