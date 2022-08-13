import {
	ITEMS_GET_REQUEST,
	ITEMS_GET_SUCCESS,
	ITEMS_GET_FAIL,
	ITEMS_ADD_REQUEST,
	ITEMS_ADD_SUCCESS,
	ITEMS_ADD_FAIL,
	ITEMS_UPDATE_REQUEST,
	ITEMS_UPDATE_SUCCESS,
	ITEMS_UPDATE_FAIL,
	ITEMS_DELETE_REQUEST,
	ITEMS_DELETE_SUCCESS,
	ITEMS_DELETE_FAIL,
	PRODUCT_BY_ID_GET_REQUEST,
	PRODUCT_BY_ID_GET_SUCCESS,
	PRODUCT_BY_ID_GET_FAIL,
	SUMMARY_OF_ORDER_REQUEST,
	SUMMARY_OF_ORDER_SUCCESS,
	SUMMARY_OF_ORDER_FAIL,
} from "../constants/orderConstant";
import { getCookie } from "../Cookies/Cookie";
const host ="http://localhost:5000"

export const fetchItems = () => async (dispatch) => {
	try {
		dispatch({
			type: ITEMS_GET_REQUEST,
		});
		const response = await fetch(`${host}/fetchitems/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const json = await response.json()
		if (response.status === 200) {
			dispatch({
				type: ITEMS_GET_SUCCESS,
				payload: json,
			});
		}
		else if (response.status === 500) {
			dispatch({
				type: ITEMS_GET_FAIL
			});
		}
	} catch (error) {
		dispatch({
			type: ITEMS_GET_FAIL
		});
	}
};


export const addItems = (data) => async (dispatch) => {
	try {
		dispatch({
			type: ITEMS_ADD_REQUEST,
		});
		const response = await fetch(`${host}/additems/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'admin-token': getCookie('admin-token')
			},
			body: JSON.stringify(data) 
		});
		const json = await response.json()
		if (response.status === 200) {
			dispatch({
				type: ITEMS_ADD_SUCCESS,
				payload: json,
			});
		}
		else if (response.status === 500) {
			dispatch({
				type: ITEMS_ADD_FAIL
			});
		}
	} catch (error) {
		dispatch({
			type: ITEMS_ADD_FAIL
		});
	}
};

export const updateItems=(data)=>async(dispatch)=>{
	try {
		dispatch({
			type: ITEMS_UPDATE_REQUEST,
		});
		const response = await fetch(`${host}/updateitems/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'admin-token': getCookie('admin-token')
			},
			body: JSON.stringify(data) 
		});
		const json = await response.json()
		if (response.status === 200) {
			dispatch({
				type: ITEMS_UPDATE_SUCCESS,
				payload: json,
			});
		}
		else if (response.status === 500) {
			dispatch({
				type: ITEMS_UPDATE_FAIL
			});
		}
	} catch (error) {
		dispatch({
			type: ITEMS_UPDATE_FAIL
		});
	}
}

export const deleteItems=(id)=>async(dispatch)=>{
	try {
		dispatch({
			type: ITEMS_DELETE_REQUEST,
		});
		const response = await fetch(`${host}/updateitems/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'admin-token': getCookie('admin-token')
			} 
		});
		await response.json()
		if (response.status === 200) {
			dispatch({
				type: ITEMS_DELETE_SUCCESS,
				payload: id,
			});
		}
		else if (response.status === 500) {
			dispatch({
				type: ITEMS_DELETE_FAIL
			});
		}
	} catch (error) {
		dispatch({
			type: ITEMS_DELETE_FAIL
		});
	}
}









export const fetchItemsById = (productId) => async (dispatch) => {
	try {
		dispatch({
			type: PRODUCT_BY_ID_GET_REQUEST,
		});
		const response = await fetch(`${host}/fetchproductbyid/${productId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const json = await response.json()
		if (response.status === 200) {
			dispatch({
				type: PRODUCT_BY_ID_GET_SUCCESS,
				payload: json,
			});
		}
		else if (response.status === 500) {
			dispatch({
				type: PRODUCT_BY_ID_GET_FAIL
			});
		}
	} catch (error) {
		dispatch({
			type: PRODUCT_BY_ID_GET_FAIL
		});
	}
};

export const orderSummary =(orderId,history) => async (dispatch) => {
	try {
		dispatch({
			type: SUMMARY_OF_ORDER_REQUEST,
		});
		const response = await fetch(
			`http://localhost:5000/fetchorders/${orderId}`,
			{
			  method: "GET",
			  mode: "cors",
			  headers: {
				"Content-Type": "application/json",
				"auth-token":getCookie('token')
			  },
			}
		  );
				
		if (response.status === 200) {
			const data = await response.json()
			console.log("data is herer", data)	
			dispatch({
				type: SUMMARY_OF_ORDER_SUCCESS,
				payload: data,
			});
		} else if (response.status === 400) {
			dispatch({type:SUMMARY_OF_ORDER_FAIL,payload:"Not Authorized"});
			history.push("/");
		  } else {
			dispatch({type:SUMMARY_OF_ORDER_FAIL,payload:"Internal Server Error"})
			history.push("/");
		  }


	} catch (error) {
		dispatch({type:SUMMARY_OF_ORDER_FAIL,payload:"Internal Server Error"})
		history.push("/");
	}
};

