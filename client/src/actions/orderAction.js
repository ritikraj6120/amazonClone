import {
	Items_GET_REQUEST,
	Items_GET_SUCCESS,
	Items_GET_FAIL
} from "../constants/orderConstant";
import { notifyError, notifySuccess, notifyUnAuthorized, notifyWarning } from '../alert';

const host ="http://localhost:5000"

export const fetchItems = () => async (dispatch) => {
	try {
		dispatch({
			type: Items_GET_REQUEST,
		});
		const response = await fetch(`/fetchitems`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const json = await response.json()
		if (response.status === 200) {
			
			dispatch({
				type: Items_GET_SUCCESS,
				payload: json,
			});
		}
		else if (response.status === 500) {
			dispatch({
				type: Items_GET_FAIL
			});
		}
	} catch (error) {
		dispatch({
			type: Items_GET_FAIL
		});
	}
};


