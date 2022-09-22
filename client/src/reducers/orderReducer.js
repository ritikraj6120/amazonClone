import {
    ADD_TO_BASKET,
    EMPTY_BASKET,
    REMOVE_FROM_BASKET,
    BASKET_DB_GET_REQUEST,
    BASKET_DB_GET_SUCCESS,
    BASKET_DB_GET_FAIL,
    ITEMS_GET_REQUEST,
    ITEMS_GET_SUCCESS,
    ITEMS_GET_FAIL,
    ORDERS_HISTORY_GET_REQUEST,
    ORDERS_HISTORY_GET_SUCCESS,
    ORDERS_HISTORY_GET_FAIL,
    PRODUCT_BY_ID_GET_REQUEST,
    PRODUCT_BY_ID_GET_SUCCESS,
    PRODUCT_BY_ID_GET_FAIL,
    SUMMARY_OF_ORDER_REQUEST,
    SUMMARY_OF_ORDER_SUCCESS,
    SUMMARY_OF_ORDER_FAIL,
    SINGLE_ORDER_HISTORY_REQUEST,
    SINGLE_ORDER_HISTORY_SUCCESS,
    SINGLE_ORDER_HISTORY_FAIL,
} from "../constants/orderConstant";

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
                error: "Internal Server Error",
            };
        default:
            return state;
    }
};

export const orderReducer = (
    state = { loading: true, basket: [], basketDict: {}, error: null },
    action
) => {
    switch (action.type) {
        case ADD_TO_BASKET:
            let itemId = action.item.id;
            let x = state.basketDict;
            if (itemId in x) {
                x[itemId] += 1;
                return {
                    ...state,
                    loading: false,
                    basket: [...state.basket],
                    basketDict: x,
                    error: null,
                };
            } else {
                x[itemId] = 1;
                return {
                    ...state,
                    loading: false,
                    basket: [...state.basket, action.item],
                    basketDict: x,
                    error: null,
                };
            }

        case EMPTY_BASKET:
            return {
                ...state,
                loading: false,
                basket: [],
                basketDict: {},
                error: null,
            };

        case REMOVE_FROM_BASKET:
            let RemovedId = action.id;
            let RemovedBasket = state.basketDict;
            if (RemovedId in RemovedBasket) {
                RemovedBasket[RemovedId] -= 1;
                if (RemovedBasket[RemovedId] === 0)
                    delete RemovedBasket.RemovedId;
            } else {
                console.warn(
                    `Cant remove product (id: ${action.id}) as its not in basket!`
                );
            }
            let newBasket = [...state.basket];
            if (RemovedBasket[RemovedId] === 0) {
                const index = state.basket.findIndex(
                    (basketItem) => basketItem.id === action.id
                );
                if (index >= 0) {
                    newBasket.splice(index, 1);
                } else {
                    console.warn(
                        `Cant remove product (id: ${action.id}) as its not in basket!`
                    );
                }
            }

            return {
                ...state,
                loading: false,
                basket: newBasket,
                basketDict: RemovedBasket,
                error: null,
            };
        case BASKET_DB_GET_REQUEST:
            return {
                ...state,
                loading: true,
                basket: [],
                basketDict: {},
                error: null,
            };
        case BASKET_DB_GET_SUCCESS:
            return {
                ...state,
                loading: false,
                basket: action.payload.basket,
                basketDict: action.payload.basketDict,
            };
        case BASKET_DB_GET_FAIL:
            return {
                ...state,
                loading: false,
                basket: [],
                basketDict: {},
                error: "something went wrong",
            };

        default:
            return state;
    }
};

export const ordersHistoryReducer = (
    state = {
        loading: true,
        error: null,
        pastOrders: { totalPages: null, orders: [] },
    },
    action
) => {
    switch (action.type) {
        case ORDERS_HISTORY_GET_REQUEST:
            return { ...state, loading: true, pastOrders: {}, error: null };

        case ORDERS_HISTORY_GET_SUCCESS:
            return {
                ...state,
                loading: false,
                pastOrders: action.payload,
                error: null,
            };

        case ORDERS_HISTORY_GET_FAIL:
            return {
                ...state,
                loading: false,
                pastOrders: {},
                error: action.payload,
            };
        default:
            return state;
    }
};

export const summaryReducer = (
    state = { loading: true, error: null, items: [], itemDict: {} },
    action
) => {
    switch (action.type) {
        case SUMMARY_OF_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
                items: [],
                itemDict: {},
                error: null,
            };

        case SUMMARY_OF_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.items,
                itemDict: action.payload.itemDict,
                error: null,
            };

        case SUMMARY_OF_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                items: [],
                itemDict: {},
                error: action.payload,
            };
        default:
            return state;
    }
};

export const fetchSingleOrderHistoryReducer = (
    state = { loading: true, error: null, order: {} },
    action
) => {
    switch (action.type) {
        case SINGLE_ORDER_HISTORY_REQUEST:
            return {
                ...state,
                loading: true,
                order: {},
                error: null,
            };

        case SINGLE_ORDER_HISTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload,
                error: null,
            };

        case SINGLE_ORDER_HISTORY_FAIL:
            return {
                ...state,
                loading: false,
                order: {},
                error: action.payload,
            };
        default:
            return state;
    }
};

export const fetchItemsByIdReducer = (
    state = { loading: true, items: {}, error: null },
    action
) => {
    switch (action.type) {
        case PRODUCT_BY_ID_GET_REQUEST:
            return { ...state, loading: true, items: null, error: null };

        case PRODUCT_BY_ID_GET_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload,
                error: null,
            };

        case PRODUCT_BY_ID_GET_FAIL:
            return {
                ...state,
                loading: false,
                items: null,
                error: "Internal Server Error",
            };
        default:
            return state;
    }
};
// Selector
export const getBasketTotal = (basket) =>
    basket.reduce((amount, item) => item.price + amount, 0);
