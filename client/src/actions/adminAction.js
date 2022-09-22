import {
	ADMIN_LOGIN_REQUEST,
	ADMIN_LOGIN_SUCCESS,
	ADMIN_LOGIN_FAIL,
	ADMIN_LOGOUT,
} from "../constants/adminConstant";
import {removeCookie,setCookie,getCookie} from '../Cookies/Cookie'
import { notifyError, notifySuccess} from '../alert';
const host ="http://localhost:5000"

export const adminLogin = (admin, history) => async (dispatch) => {
	try {
		dispatch({
			type: ADMIN_LOGIN_REQUEST,
		});
		const response = await fetch(`${host}/adminlogin`, {
			method: 'POST',
			credentials: 'include',
			withCredentials : true,
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(admin)
		});
		const json = await response.json()
		if (response.status === 200) {
			/* 
				Save the auth token and redirect
				localStorage.setItem('token', json.authtoken);
		 */
			setCookie('admin-token',json.token)		
			dispatch({
				type: ADMIN_LOGIN_SUCCESS
			});			
			notifySuccess("Successfully logged in")
			console.log(response)
			history.push("/admin");
		}
		else if (response.status === 400) {
			let x = json.error;
			notifyError(x);
			dispatch({
				type: ADMIN_LOGIN_FAIL,
				payload: x
			});
		}
		else {
			dispatch({
				type: ADMIN_LOGIN_FAIL,
				payload: "Logging Failed. Please try again"
			});
			notifyError("Logging Failed. Please try again");
		}
	} catch (error) {
		dispatch({
			type: ADMIN_LOGIN_FAIL,
			payload: "Logging Failed. Please try again"
		});
		notifyError("Logging Failed. Please try again");
	}
};

export const handleLogout = (history) => (dispatch) => {
	removeCookie('admin-token');
	dispatch({ type: ADMIN_LOGOUT });
	history.push('/adminlogin')
};

export const addNewProduct= (product)=>async ()=>{
	console.log("jj")
	try {
		const response = await fetch(`${host}/adminaddnewproduct`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'admin-token':getCookie('admin-token')
			},
			body: JSON.stringify(product)
		});
		console.log(response.status)
		// const json=await response.json()
		if (response.status === 200) {	
			notifySuccess("Product Added Successfully")
		}
		else if (response.status === 400) {
			// let x = json.error;
			notifyError("Unauthorised Admin")
		}
		else {
			notifyError("Product Adding Failed. Please try again looo");
		}
	} catch (error) {
		console.log(error)
		notifyError("Product Adding Failed. Please try again  ffff");
	}
}