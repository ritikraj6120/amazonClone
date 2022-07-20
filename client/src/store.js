import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./reducers/rootReducer.js";
const isloggedIn = localStorage.getItem("token")
	? true
	: false;
	const email=localStorage.getItem("email")
	? true
	: false;

const initialState = {
	userLogin: { userInfo: {isloggedIn:isloggedIn,email:email} },
};
const store = createStore(rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(thunk)));
export default store; 