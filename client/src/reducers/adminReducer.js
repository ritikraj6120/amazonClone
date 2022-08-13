import {
	ADMIN_LOGIN_REQUEST,
	ADMIN_LOGIN_SUCCESS,
	ADMIN_LOGIN_FAIL,
	ADMIN_LOGOUT,
} from "../constants/adminConstant";

export const adminLoginReducer = (state = { loading: false, adminInfo: {isAdmin:false}, error: null }, action) => {
	switch (action.type) {
		
		case ADMIN_LOGIN_REQUEST:
			return { ...state, loading: true};

		case ADMIN_LOGIN_SUCCESS:
			return { ...state, loading: false, adminInfo: {isAdmin:true}, error: null };

		case ADMIN_LOGIN_FAIL:
			return { ...state, loading: false,adminInfo: {isAdmin:false}, error: action.payload };
		case ADMIN_LOGOUT:
			return { ...state, loading: false, adminInfo: {isAdmin:false}, error: null };
		default:
			return state;
	}
};

