import {
    ITEMS_GET_REQUEST,
    ITEMS_GET_SUCCESS,
    ITEMS_GET_FAIL,
    PRODUCT_BY_ID_GET_REQUEST,
    PRODUCT_BY_ID_GET_SUCCESS,
    PRODUCT_BY_ID_GET_FAIL,
} from "../constants/itemConstant";

export const fetchItemsReducer = (
    state = { loading: true, items: [], error: null },
    action
) => {
    switch (action.type) {
        case ITEMS_GET_REQUEST:
            return { ...state, loading: true, items: null, error: null };

        case ITEMS_GET_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload,
                error: null,
            };

        case ITEMS_GET_FAIL:
            return {
                ...state,
                loading: false,
                items: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const fetchItemByIdReducer = (
    state = { loading: true, item: {}, error: null },
    action
) => {
    switch (action.type) {
        case PRODUCT_BY_ID_GET_REQUEST:
            return { ...state, loading: true, item: null, error: null };

        case PRODUCT_BY_ID_GET_SUCCESS:
            return {
                ...state,
                loading: false,
                item: action.payload,
                error: null,
            };

        case PRODUCT_BY_ID_GET_FAIL:
            return {
                ...state,
                loading: false,
                item: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

