import {
	ADD_TO_BASKET,
	EMPTY_BASKET,
	REMOVE_FROM_BASKET,
	ITEMS_GET_REQUEST,
	ITEMS_GET_SUCCESS,
	ITEMS_GET_FAIL,
	PRODUCT_BY_ID_GET_REQUEST,
	PRODUCT_BY_ID_GET_SUCCESS,
	PRODUCT_BY_ID_GET_FAIL,
	SUMMARY_OF_ORDER_REQUEST,
	SUMMARY_OF_ORDER_SUCCESS,
	SUMMARY_OF_ORDER_FAIL,
} from "../constants/orderConstant";


export const fetchItemsReducer = (state = { loading: true, items: [], error: null }, action) => {
	switch (action.type) {

		case ITEMS_GET_REQUEST:
			return { ...state, loading: true, items: null, error: null };

		case ITEMS_GET_SUCCESS:
			return { ...state, loading: false, items: action.payload, error: null };

		case ITEMS_GET_FAIL:
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


export const summaryReducer = (state = {loading:true,error:null,summaryDetails: [] }, action) => {
	switch (action.type) {
		case SUMMARY_OF_ORDER_REQUEST:
			return { ...state, loading: true, summaryDetails: [], error: null };

		case SUMMARY_OF_ORDER_SUCCESS:
			return { ...state, loading: false, summaryDetails: action.payload, error: null };

		case SUMMARY_OF_ORDER_FAIL:
			return { ...state, loading: false, items: null, error: action.payload };
		default:
			return state;
	}
};


export const fetchItemsByIdReducer = (state = { loading: true, items: {}, error: null }, action) => {
	switch (action.type) {

		case PRODUCT_BY_ID_GET_REQUEST:
			return { ...state, loading: true, items: null, error: null };

		case PRODUCT_BY_ID_GET_SUCCESS:
			return { ...state, loading: false, items: action.payload, error: null };

		case PRODUCT_BY_ID_GET_FAIL:
			return { ...state, loading: false, items: null, error: "Internal Server Error" };
		default:
			return state;
	}
};
  // Selector
	export const getBasketTotal = (basket) => 
	basket.reduce((amount, item) => item.price + amount, 0);