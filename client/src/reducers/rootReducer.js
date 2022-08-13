import { combineReducers } from "redux";

import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer
} from "./userReducer";
import{orderReducer,
	fetchItemsReducer,
	fetchItemsByIdReducer,
	summaryReducer
} from './orderReducer'
import {adminLoginReducer} from './adminReducer'
const rootReducer = combineReducers({
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	orderState:orderReducer,
	fetchItems:fetchItemsReducer,
	fetchItemsById:fetchItemsByIdReducer,
	summaryState:summaryReducer,
	adminLogin:adminLoginReducer
});

export default rootReducer;
