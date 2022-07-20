import { combineReducers } from "redux";

import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer
} from "./userReducer";
import{orderReducer,
	fetchItemsReducer
} from './orderReducer'

const rootReducer = combineReducers({
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	orderState:orderReducer,
	fetchItems:fetchItemsReducer
});

export default rootReducer;
