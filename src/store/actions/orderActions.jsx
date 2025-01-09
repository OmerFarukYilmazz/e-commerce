export const SET_ORDERS = 'SET_ORDERS';
export const SET_LOADING = 'SET_LOADING';

import { sendRequest, METHODS } from '../../utils/axiosUtil';
import { toast } from 'react-toastify';

export const fetchOrders = () => async dispatch => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await sendRequest({
      url: '/order',
      method: METHODS.GET
    });
    dispatch({ type: SET_ORDERS, payload: response });
  } catch (error) {
    console.error('Error fetching orders:', error);
    toast.error('Orders could not be loaded');
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};