import {
    ADD_TO_BASKET,
    EMPTY_BASKET,
    REMOVE_FROM_BASKET,
    BASKET_DB_GET_REQUEST,
    BASKET_DB_GET_SUCCESS,
    BASKET_DB_GET_FAIL,
    ORDERS_HISTORY_GET_REQUEST,
    ORDERS_HISTORY_GET_SUCCESS,
    ORDERS_HISTORY_GET_FAIL,
    // ITEMS_ADD_REQUEST,
    // ITEMS_ADD_SUCCESS,
    // ITEMS_ADD_FAIL,
    // ITEMS_UPDATE_REQUEST,
    // ITEMS_UPDATE_SUCCESS,
    // ITEMS_UPDATE_FAIL,
    // ITEMS_DELETE_REQUEST,
    // ITEMS_DELETE_SUCCESS,
    // ITEMS_DELETE_FAIL,
    SUMMARY_OF_ORDER_REQUEST,
    SUMMARY_OF_ORDER_SUCCESS,
    SUMMARY_OF_ORDER_FAIL,
    SINGLE_ORDER_HISTORY_REQUEST,
    SINGLE_ORDER_HISTORY_SUCCESS,
    SINGLE_ORDER_HISTORY_FAIL,
} from "../constants/orderConstant";
import { getCookie } from "../Cookies/Cookie";
import { notifyError } from "../alert.js";
const host = "http://localhost:5000";

export const getOrdersHistory = (page_number) => async (dispatch) => {
    try {
        dispatch({
            type: ORDERS_HISTORY_GET_REQUEST,
        });
        const response = await fetch(
            `${host}/fetchorders_history?page=${page_number}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": getCookie("token"),
                },
            }
        );
        const data = await response.json();
        if (response.status === 200) {
            dispatch({
                type: ORDERS_HISTORY_GET_SUCCESS,
                payload: data,
            });
        } else if (response.status === 500) {
            dispatch({
                type: ORDERS_HISTORY_GET_FAIL,
            });
        }
    } catch (error) {
        dispatch({
            type: ORDERS_HISTORY_GET_FAIL,
        });
    }
};
export const addToBasket = (item) => async (dispatch) => {
    try {
        dispatch({
            type: ADD_TO_BASKET,
            item: {
                id: item._id,
                title: item.title,
                image: item.image,
                price: item.price,
                rating: item.rating,
                description: item.description,
                category: item.category,
            },
        });
        const itemId = item._id;
        await fetch(`${host}/additemtobasket`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": getCookie("token"),
            },
            body: JSON.stringify({ itemId }),
        });
    } catch (err) {
        notifyError("Please add again");
    }
};

export const removeFromBasket = (id) => async (dispatch) => {
    try {
        dispatch({
            type: REMOVE_FROM_BASKET,
            id: id,
        });
        const itemId = id;
        const response = await fetch(`${host}/removeitemfrombasket`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": getCookie("token"),
            },
            body: JSON.stringify({ itemId }),
        });
    } catch (err) {
        console.log(err);
        notifyError("Please remove again");
    }
};

export const emptyItemsFromBasket = () => async (dispatch) => {
    try {
        dispatch({
            type: EMPTY_BASKET,
        });
        const response = await fetch(`${host}/emptyitemsfrombasket`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": getCookie("token"),
            },
        });
        console.log(response);
    } catch (err) {
        console.log(err);
    }
};

export const fetchFromBasketDB = () => async (dispatch) => {
    try {
        dispatch({ type: BASKET_DB_GET_REQUEST });
        const response = await fetch(`${host}/getitemfrombasket`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": getCookie("token"),
            },
        });
        const data = await response.json();
        // console.log(data.basket)
        // for(let key in data.basketDict){
        // 	console.log(typeof data.basketDict[key])
        // }
        dispatch({ type: BASKET_DB_GET_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: BASKET_DB_GET_FAIL });
        console.log(err);
    }
};

// export const addItems = (data) => async (dispatch) => {
// 	try {
// 		const response = await fetch(`${host}/additems/`, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				'admin-token': getCookie('admin-token')
// 			},
// 			body: JSON.stringify(data)
// 		});
// 		const json = await response.json()
// 		if (response.status === 200) {
// 		}
// 		else if (response.status === 500) {
// 		}
// 	} catch (error) {
// 	}
// };

// export const updateItems=(data)=>async(dispatch)=>{
// 	try {
// 		const response = await fetch(`${host}/updateitems/`, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				'admin-token': getCookie('admin-token')
// 			},
// 			body: JSON.stringify(data)
// 		});
// 		const json = await response.json()
// 		if (response.status === 200) {
// 		}
// 		else if (response.status === 500) {
// 		}
// 	} catch (error) {
// 	}
// }

// export const deleteItems=(id)=>async(dispatch)=>{
// 	try {
// 		const response = await fetch(`${host}/updateitems/${id}`, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				'admin-token': getCookie('admin-token')
// 			}
// 		});
// 		await response.json()
// 		if (response.status === 200) {
// 		}
// 		else if (response.status === 500) {
// 		}
// 	} catch (error) {

// 	}
// }


export const orderSummary = (orderId, history) => async (dispatch) => {
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
                    "auth-token": getCookie("token"),
                },
            }
        );

        if (response.status === 200) {
            const data = await response.json();
            console.log("data is herer", data);
            dispatch({
                type: SUMMARY_OF_ORDER_SUCCESS,
                payload: data,
            });
        } else if (response.status === 400) {
            dispatch({
                type: SUMMARY_OF_ORDER_FAIL,
                payload: "Not Authorized",
            });
            history.push("/");
        } else {
            dispatch({
                type: SUMMARY_OF_ORDER_FAIL,
                payload: "Internal Server Error",
            });
            history.push("/");
        }
    } catch (error) {
        dispatch({
            type: SUMMARY_OF_ORDER_FAIL,
            payload: "Internal Server Error",
        });
        history.push("/");
    }
};

export const fetchSingleOrderHistory =
    (orderId, history) => async (dispatch) => {
        try {
            console.log(orderId);
            dispatch({
                type: SINGLE_ORDER_HISTORY_REQUEST,
            });
            const response = await fetch(
                `${host}/fetchSingleOrderHistory/?orderId=${orderId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": getCookie("token"),
                    },
                }
            );

            if (response.status === 200) {
                const data = await response.json();
                console.log(data);
                dispatch({
                    type: SINGLE_ORDER_HISTORY_SUCCESS,
                    payload: data,
                });
            } else if (response.status === 400) {
                dispatch({
                    type: SINGLE_ORDER_HISTORY_FAIL,
                    payload: "Not Authorized",
                });
                history.push("/");
            } else {
                dispatch({
                    type: SINGLE_ORDER_HISTORY_FAIL,
                    payload: "Internal Server Error",
                });
                history.push("/");
            }
        } catch (error) {
            dispatch({
                type: SINGLE_ORDER_HISTORY_FAIL,
                payload: "Internal Server Error",
            });
            history.push("/");
        }
    };
