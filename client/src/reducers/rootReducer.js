import { combineReducers } from "redux";
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
} from "./userReducer";
import {
    orderReducer,
    ordersHistoryReducer,
    summaryReducer,
    fetchSingleOrderHistoryReducer,
} from "./orderReducer";
import { fetchItemsReducer, fetchItemByIdReducer } from "./itemReducer";
import { adminLoginReducer } from "./adminReducer";
const rootReducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderState: orderReducer,
    fetchItems: fetchItemsReducer,
    ordersHistory: ordersHistoryReducer,
    fetchItemById: fetchItemByIdReducer,
    summaryState: summaryReducer,
    SingleOrderHistory: fetchSingleOrderHistoryReducer,
    adminLogin: adminLoginReducer,
});

export default rootReducer;
