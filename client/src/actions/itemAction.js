import {
    ITEMS_GET_REQUEST,
    ITEMS_GET_SUCCESS,
    ITEMS_GET_FAIL,
    PRODUCT_BY_ID_GET_REQUEST,
    PRODUCT_BY_ID_GET_SUCCESS,
    PRODUCT_BY_ID_GET_FAIL
} from "../constants/itemConstant"
const host = "http://localhost:5000";

export const fetchItems = () => async (dispatch) => {
    try {
        dispatch({
            type: ITEMS_GET_REQUEST,
        });
        const response = await fetch(`${host}/fetchitems/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();
        if (response.status === 200) {
            dispatch({
                type: ITEMS_GET_SUCCESS,
                payload: json,
            });
        } else if (response.status === 500) {
            dispatch({
                type: ITEMS_GET_FAIL,
				payload:"Server Side Error"
            });
        }
    } catch (error) {
        dispatch({
            type: ITEMS_GET_FAIL,
			payload:"Server Side Error"
        });
    }
};

export const fetchItemById = (productId) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_BY_ID_GET_REQUEST,
        });
        const response = await fetch(`${host}/fetchproductbyid/${productId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();
        if (response.status === 200) {
            dispatch({
                type: PRODUCT_BY_ID_GET_SUCCESS,
                payload: json,
            });
        } else if (response.status === 500) {
            dispatch({
                type: PRODUCT_BY_ID_GET_FAIL,
				payload:"Server side Error"
            });
        }
    } catch (error) {
        dispatch({
			payload:"Server side Error",
            type: PRODUCT_BY_ID_GET_FAIL,
        });
    }
};