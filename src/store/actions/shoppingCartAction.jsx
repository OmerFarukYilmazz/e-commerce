export const SET_CART = 'SET_CART';
export const SET_PAYMENT = 'SET_PAYMENT';
export const SET_ADDRESS = 'SET_ADDRESS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
export const TOGGLE_CART_ITEM = 'TOGGLE_CART_ITEM';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const SET_ADDRESSES = 'SET_ADDRESSES';
export const SET_SELECTED_ADDRESS = 'SET_SELECTED_ADDRESS';
export const SET_CURRENT_STEP = 'SET_CURRENT_STEP';
export const SET_PAYMENT_METHOD = 'SET_PAYMENT_METHOD';
export const SET_CARDS = 'SET_CARDS';
export const SET_SELECTED_CARD = 'SET_SELECTED_CARD';
export const RESET_CART = 'RESET_CART';
export const RESET_SELECTED_ADDRESS = 'RESET_SELECTED_ADDRESS';
export const RESET_SELECTED_CARD = 'RESET_SELECTED_CARD';


import { toast } from 'react-toastify';
import { sendRequest, METHODS } from '../../utils/axiosUtil';

// Action Creators
export const setCart = (cart) => ({
  type: SET_CART,
  payload: cart
});

export const setPayment = (payment) => ({
  type: SET_PAYMENT,
  payload: payment
});

export const setAddress = (address) => ({
  type: SET_ADDRESS,
  payload: address
});

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product
});

export const updateCartItem = (productId, count) => ({
  type: UPDATE_CART_ITEM,
  payload: { productId, count }
});

export const toggleCartItem = (productId, checked) => ({
  type: TOGGLE_CART_ITEM,
  payload: { productId, checked }
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId
}); 

export const setAddresses = (addresses) => ({
  type: SET_ADDRESSES,
  payload: addresses
});

export const setSelectedAddress = (address) => ({
  type: SET_SELECTED_ADDRESS,
  payload: address
});

export const setCurrentStep = (step) => ({
  type: SET_CURRENT_STEP,
  payload: step
});

export const setPaymentMethod = (method) => ({
  type: SET_PAYMENT_METHOD,
  payload: method
});

export const resetCart = () => ({
  type: RESET_CART
});

export const resetSelectedAddress = () => ({
  type: RESET_SELECTED_ADDRESS
});

export const resetSelectedCard = () => ({
  type: RESET_SELECTED_CARD
});

// Address Thunk Actions
export const fetchAddresses = () => {
  return async (dispatch) => {
    try {
      const response = await sendRequest({
        url: '/user/address',
        method: METHODS.GET
      });
      dispatch(setAddresses(response));
    } catch (error) {
      toast.error('Addresses could not be loaded');
    }
  };
};

// Add Address Thunk Action
export const addAddress = (addressData) => {
  return async (dispatch) => {
    try {
      await sendRequest({
        url: '/user/address',
        method: METHODS.POST,
        data: addressData
      });
      dispatch(fetchAddresses()); 
      toast.success('Address added successfully');
    } catch (error) {
      toast.error('Address could not be added');
    }
  };
};
// Update Address Thunk Action
export const updateAddress = (addressData) => {
  return async (dispatch) => {
    try {
      await sendRequest({
        url: '/user/address',
        method: METHODS.PUT,
        data: addressData
      });
      dispatch(fetchAddresses()); 
      toast.success('Address updated successfully');
    } catch (error) {
      toast.error('Address could not be updated');
    }
  };
};

// Delete Address Thunk Action
export const deleteAddress = (addressId) => {
  return async (dispatch) => {
    try {
      await sendRequest({
        url: `/user/address/${addressId}`,
        method: METHODS.DELETE
      });
      dispatch(fetchAddresses());
      toast.success('Address deleted successfully');
    } catch (error) {
      toast.error('Address could not be deleted');
    }
  };
};

// Kartları getir
export const fetchCards = () => async dispatch => {
  try {
    const response = await sendRequest({
      url: '/user/card',
      method: METHODS.GET
    });
    dispatch({ type: SET_CARDS, payload: response });
  } catch (error) {
    console.error('Error fetching cards:', error);
  }
};

// Yeni kart ekle
export const addCard = (cardData) => async dispatch => {
  try {
    const response = await sendRequest({
      url: '/user/card',
      method: METHODS.POST,
      data: cardData
    });
    
    // Kartları yeniden yükle
    await dispatch(fetchCards());
    
    // Yeni eklenen kartı otomatik seç
    dispatch({ 
      type: 'SET_SELECTED_CARD', 
      payload: response 
    });
    
    // Ödeme yöntemini kredi kartı olarak ayarla
    dispatch({ 
      type: 'SET_PAYMENT_METHOD', 
      payload: { 
        id: 'credit_card', 
        selectedCard: response 
      } 
    });

    return response;
  } catch (error) {
    console.error('Error adding card:', error);
    throw error;
  }
};



// Kart güncelle
export const updateCard = (cardData) => async dispatch => {
  try {
    await sendRequest({
      url: '/user/card',
      method: METHODS.PUT,
      data: cardData
    });
    dispatch(fetchCards()); // Kartları yeniden yükle
  } catch (error) {
    console.error('Error updating card:', error);
    throw error;
  }
};

// Kart sil
export const deleteCard = (cardId) => async dispatch => {
  try {
    await sendRequest({
      url: `/user/card/${cardId}`,
      method: METHODS.DELETE
    });
    dispatch(fetchCards()); // Kartları yeniden yükle
  } catch (error) {
    console.error('Error deleting card:', error);
    throw error;
  }
};
// Siparişi tamamla
export const completeOrder = () => async (dispatch, getState) => {
  const state = getState();
  const { selectedAddress, selectedCard, cart } = state.shoppingCart;
  
  if (!selectedAddress || !selectedCard) {
    return { success: false, error: 'Address or card not selected' };
  }

  const orderData = {
    address_id: selectedAddress.id,
    order_date: new Date().toISOString(),
    card_no: selectedCard.card_no,
    card_name: selectedCard.name_on_card,
    card_expire_month: selectedCard.expire_month,
    card_expire_year: selectedCard.expire_year,
    card_ccv: selectedCard.ccv,
    price: cart
      .filter(item => item.checked)
      .reduce((total, item) => total + (item.product.price * item.count), 0),
    products: cart
      .filter(item => item.checked)
      .map(item => ({
        product_id: item.product.id,
        count: item.count,
        detail: item.detail || ''
      }))
  };

  try {
    await sendRequest({
      url: '/order',
      method: METHODS.POST,
      data: orderData
    });

    // Başarılı sipariş sonrası state'i temizle
    dispatch({ type: 'RESET_CART' });
    dispatch({ type: 'RESET_SELECTED_ADDRESS' });
    dispatch({ type: 'RESET_SELECTED_CARD' });
    dispatch({ type: 'SET_CURRENT_STEP', payload: 1 });

    return { success: true };
  } catch (error) {
    console.error('Order creation failed:', error);
    return { success: false, error };
  }
};