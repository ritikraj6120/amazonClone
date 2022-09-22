import { combineReducers } from "redux";

import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
} from "./userReducer";
import {
    orderReducer,
    fetchItemsReducer,
    ordersHistoryReducer,
    fetchItemsByIdReducer,
    summaryReducer,
	fetchSingleOrderHistoryReducer
} from "./orderReducer";
import { adminLoginReducer } from "./adminReducer";
const rootReducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderState: orderReducer,
    fetchItems: fetchItemsReducer,
    ordersHistory: ordersHistoryReducer,
    fetchItemsById: fetchItemsByIdReducer,
    summaryState: summaryReducer,
	SingleOrderHistory:fetchSingleOrderHistoryReducer,
    adminLogin: adminLoginReducer,
});

export default rootReducer;
