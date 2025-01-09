import { SET_ORDERS, SET_LOADING } from '../actions/orderActions';

const initialState = {
    orders: [],
    loading: false
  };
  
  export default function orderReducer(state = initialState, action) {
    switch (action.type) {
      case SET_ORDERS:
        return {
          ...state,
          orders: action.payload
        };
      case SET_LOADING:
        return {
          ...state,
          loading: action.payload
        };
      default:
        return state;
    }
  }