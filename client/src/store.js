import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./reducers/rootReducer.js";
import {getCookie} from './Cookies/Cookie'
const isloggedIn = getCookie('token')
	? true
	: false;

	console.log("isloggedIn is ",isloggedIn)
	const email=localStorage.getItem("email")
	? localStorage.getItem("email")
	: null;
	const userName=localStorage.getItem('userName');	

const initialState = {
	userLogin: { userInfo: {isloggedIn:isloggedIn,email:email,userName:userName} },
};
const store = createStore(rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(thunk)));
export default store; 