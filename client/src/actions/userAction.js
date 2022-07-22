import {
	USER_DETAILS_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_RESET,
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_UPDATE_PROFILE_FAIL,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS
} from "../constants/userConstant";
import {getCookie,removeCookie} from '../Cookies/Cookie'
import { notifyError, notifySuccess, notifyUnAuthorized, notifyWarning } from '../alert';
import {useHistory} from 'react-router-dom'
// const host = "https://khatabook-app.herokuapp.com"
// const host = "https://khatabook-app6120.herokuapp.com"
const host ="http://localhost:5000"

export const login = (user, history) => async (dispatch) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		});
		const response = await fetch(`${host}/signin`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		});
		const json = await response.json()
		if (response.status === 200) {
			// Save the auth token and redirect
			// localStorage.setItem('token', json.authtoken);
			dispatch({
				type: USER_LOGIN_SUCCESS,
				payload: {email:json.email}
			});
			localStorage.setItem('email',json.email);
			notifySuccess("Successfully logged in")
			history.push("/");
		}
		else if (response.status === 400) {
			let x = json.error;
			notifyError(x);
			dispatch({
				type: USER_LOGIN_FAIL,
				payload: x
			});
		}
		else {
			dispatch({
				type: USER_LOGIN_FAIL,
				payload: "Logging Failed. Please try again"
			});
			notifyError("Logging Failed. Please try again");
		}
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload: "Logging Failed. Please try again"
		});
		notifyError("Logging Failed. Please try again");
	}
};

export const handleLogout = (history) => (dispatch) => {
	removeCookie('token');
	localStorage.removeItem('email');
	dispatch({ type: USER_LOGOUT });
	dispatch({ type: USER_DETAILS_RESET });
	history.push('/login')
};

export const signup = (user, history) => async (dispatch) => {
	try {
		dispatch({
			type: USER_REGISTER_REQUEST,
		});

		const response = await fetch(`${host}/signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		});
		const json = await response.json()

		if (response.status === 200) {
			dispatch({
				type: USER_REGISTER_SUCCESS,
			});
			notifySuccess("Account Created Successfully")
			history.push("/login");
		}
		else if (response.status === 400) {
			let x = json.error[0];
			dispatch({
				type: USER_REGISTER_FAIL,
				payload: x.msg
			});
			notifyError(x.msg);
		}
		else if (response.status === 409) {
			dispatch({
				type: USER_REGISTER_FAIL,
				payload: "Sorry a user with this e-mail address already exists"
			});
			notifyError("Sorry a user with this e-mail address already exists");
		}
		else {
			dispatch({
				type: USER_REGISTER_FAIL,
				payload: "User Signup fail.please try again"
			});
			notifyError("User Signup fail.please try again");
		}
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload: "User Signup fail.please try again"
		});
		notifyError("User Signup fail.please try again");
	}
};

export const getUserDetails = () => async (dispatch, getState) => {
	let history=useHistory();
	try {
		dispatch({
			type: USER_DETAILS_REQUEST,
		});

		const response = await fetch(`${host}/userdetails`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": getCookie('token')
			}
		});
		const json = await response.json()
		if (response.status === 200) {
			dispatch({
				type: USER_DETAILS_SUCCESS,
				payload: json,
			});
		}
		else if (response.status === 401) {
			notifyError("Not authorized");
			dispatch(handleLogout(history));
		}
		else {
			dispatch({
				type: USER_DETAILS_FAIL,
				payload: "Fetching user details failed",
			});
		}
	}
	catch (error) {
		dispatch({
			type: USER_DETAILS_FAIL,
			payload: "Fetching user details failed",
		});
	}
};

export const changePassword = (user) => async (dispatch, getState) => {
	let history=useHistory();
	try {
		dispatch({
			type: USER_UPDATE_PROFILE_REQUEST,
		});
		const response = await fetch(`${host}/changepassword`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"auth-token": getCookie('token')
			},
			body: JSON.stringify(user)
		});
		if (response.status === 200) {
			notifySuccess("successfully Updated Password");
			dispatch({
				type: USER_UPDATE_PROFILE_SUCCESS
			});
		}
		else if (response.status === 400) {
			notifyWarning("Current Password not correctly entered");
			dispatch({
				type: USER_UPDATE_PROFILE_FAIL,
				payload: "Current Password not correctly entered"
			});
		}
		else if (response.status === 401) {
			notifyUnAuthorized("Not Authorized");
			dispatch({
				type: USER_UPDATE_PROFILE_FAIL,
				payload: "Not Authorized"
			});
			dispatch(handleLogout(history));
		}
		else {
			dispatch({
				type: USER_UPDATE_PROFILE_FAIL,
				payload: "Update Password Failed"
			});
			notifyError("Update Password Failed");
		}
	} catch (error) {
		dispatch({
			type: USER_UPDATE_PROFILE_FAIL,
			payload: "Update Password Failed",
		});
		notifyError("Update Password Failed");
	}
};
