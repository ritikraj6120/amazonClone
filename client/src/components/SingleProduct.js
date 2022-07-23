import React from 'react'
import { fetchItemsById } from '../actions/orderAction';
import { useDispatch, useSelector } from "react-redux";
import { useParams, } from 'react-router-dom';
import { useEffect } from 'react';
import './styles/SingleProduct.css'
const SingleProduct = () => {

  const dispatch = useDispatch();
    const itemState = useSelector((state) => state.fetchItemsById);
    let {productId} = useParams()
    useEffect(() => {
        dispatch(fetchItemsById(productId));
    }, []);
    console.log(productId)
    console.log(itemState)
    const { loading, items, error } = itemState
    console.log(items)
  return (

    <div>
       {loading === true ? (
                <div>wait loading</div>
            ) :
        	<div class="container">
		<div class="card">
			<div class="container-fliud">
				<div class="wrapper row">
					<div class="preview col-md-6">
						
						<div class="preview-pic tab-content">
						  <div class="tab-pane active" id="pic-1"><img src={items.image} /></div>
						  {/* <div class="tab-pane" id="pic-2"><img src={items.image} /></div>
						  <div class="tab-pane" id="pic-3"><img src="http://placekitten.com/400/252" /></div>
						  <div class="tab-pane" id="pic-4"><img src="http://placekitten.com/400/252" /></div>
						  <div class="tab-pane" id="pic-5"><img src="http://placekitten.com/400/252" /></div> */
              console.log(items)
              }
						</div>
						{/* <ul class="preview-thumbnail nav nav-tabs">
						  <li class="active"><a data-target="#pic-1" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
						  <li><a data-target="#pic-2" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
						  <li><a data-target="#pic-3" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
						  <li><a data-target="#pic-4" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
						  <li><a data-target="#pic-5" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
						</ul>
						 */}
					</div>
					<div class="details col-md-6">
						<h3 class="product-title">{items.title}</h3>
						<div class="rating">
							<div class="stars">
								{/* <span class="fa fa-star checked"></span>
								<span class="fa fa-star checked"></span>
								<span class="fa fa-star checked"></span>
								<span class="fa fa-star"></span>
								<span class="fa fa-star"></span> */}
                <div >
              {Array(items.rating).fill().map((_, i) => ( <span key={i} className="fa fa-star checked"></span>))}
              { Array(5-items.rating).fill().map((_, i) => ( <span key={i} className="fa fa-star"></span>)) }
        </div>
							</div>
							<span class="review-no">41 reviews</span>
						</div>
						<p class="product-description">Suspendisse quos? Tempus cras iure temporibus? Eu laudantium cubilia sem sem! Repudiandae et! Massa senectus enim minim sociosqu delectus posuere.</p>
						<h4 class="price">current price: <span>$180</span></h4>
						<p class="vote"><strong>91%</strong> of buyers enjoyed this product! <strong>(87 votes)</strong></p>
						<h5 class="sizes">sizes:
							<span class="size" data-toggle="tooltip" title="small">s</span>
							<span class="size" data-toggle="tooltip" title="medium">m</span>
							<span class="size" data-toggle="tooltip" title="large">l</span>
							<span class="size" data-toggle="tooltip" title="xtra large">xl</span>
						</h5>
						<h5 class="colors">colors:
							<span class="color orange not-available" data-toggle="tooltip" title="Not In store"></span>
							<span class="color green"></span>
							<span class="color blue"></span>
						</h5>
						<div class="action">
							<button class="add-to-cart btn btn-default" type="button">add to cart</button>
							<button class="like btn btn-default" type="button"><span class="fa fa-heart"></span></button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
}
    </div>
  )
}

export default SingleProduct