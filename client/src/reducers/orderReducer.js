import {
	ADD_TO_BASKET,
	EMPTY_BASKET,
	REMOVE_FROM_BASKET,
	Items_GET_REQUEST,
	Items_GET_SUCCESS,
	Items_GET_FAIL,
} from "../constants/orderConstant";


export const fetchItemsReducer = (state = { loading: true, items: [], error: null }, action) => {
	switch (action.type) {

		case Items_GET_REQUEST:
			return { ...state, loading: true, items: null, error: null };

		case Items_GET_SUCCESS:
			return { ...state, loading: false, items: action.payload, error: null };

		case Items_GET_FAIL:
			return { ...state, loading: false, items: null, error: "Internal Server Error" };
		default:
			return state;
	}
};

export const orderReducer = (state = {basket: [] }, action) => {
	switch (action.type) {
		case ADD_TO_BASKET:
			return {
				...state,
				basket: [...state.basket, action.item],
			};
		
		case EMPTY_BASKET:
			return {
				...state,
				basket: []
			}
	
		case REMOVE_FROM_BASKET:
			const index = state.basket.findIndex(
				(basketItem) => basketItem.id === action.id
			);
			let newBasket = [...state.basket];
	
			if (index >= 0) {
				newBasket.splice(index, 1);
	
			} else {
				console.warn(
					`Cant remove product (id: ${action.id}) as its not in basket!`
				)
			}
	
			return {
				...state,
				basket: newBasket
			}
		default:
			return state;
	}
};

  // Selector
	export const getBasketTotal = (basket) => 
	basket.reduce((amount, item) => item.price + amount, 0);