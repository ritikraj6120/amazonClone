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
    USER_UPDATE_PASSWORD_FAIL,
    USER_UPDATE_PASSWORD_REQUEST,
    USER_UPDATE_PASSWORD_SUCCESS,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
} from "../constants/userConstant";

export const userLoginReducer = (
    state = {
        loading: false,
        userInfo: { isloggedIn: false, email: null, userName: null },
        error: null,
    },
    action
) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                userInfo: { isloggedIn: false, email: null, userName: null },
                error: null,
            };
        case USER_LOGIN_SUCCESS: //
            const { email, userName } = action.payload;
            return {
                ...state,
                loading: false,
                userInfo: {
                    isloggedIn: true,
                    email: email,
                    userName: userName,
                },
                error: null,
            };
        case USER_LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                userInfo: { isloggedIn: false, email: null, userName: null },
                error: action.payload,
            };
        case USER_LOGOUT:
            return {
                ...state,
                loading: false,
                userInfo: { isloggedIn: false, email: null, userName: null },
                error: null,
            };
        default:
            return state;
    }
};

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { ...state, loading: true, success: false, error: null };
        case USER_REGISTER_SUCCESS:
            return { ...state, loading: false, success: true, error: null };
        case USER_REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
            };
        // case USER_LOGOUT:
        // 	return { ...state, loading: false, success: false, error: null };
        default:
            return state;
    }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true, error: null, user: {} };
        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                error: null,
            };
        case USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                user: {},
                error: action.payload,
            };
        case USER_DETAILS_RESET:
            return { ...state, loading: false, user: {}, error: null };
        case USER_UPDATE_PROFILE_REQUEST:
            return state;
        case USER_UPDATE_PROFILE_SUCCESS:
            const { phone, address } = action.payload;
            let element = state.user;
            if (phone !== null && address !== null) {
                element = { ...element, phone: phone, address: address };
            } else if (address !== null) {
                element = { ...element, address: address };
            } else {
                element = { ...element, phone: phone };
            }
            return { ...state, user: element };
        case USER_UPDATE_PROFILE_FAIL:
            return state;
        default:
            return state;
    }
};

export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PASSWORD_REQUEST:
            return { ...state, loading: true, success: false, error: null };
        case USER_UPDATE_PASSWORD_SUCCESS:
            return { ...state, loading: false, success: true, error: null };
        case USER_UPDATE_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
