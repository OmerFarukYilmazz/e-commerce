import {
  SET_CART,
  SET_PAYMENT,
  SET_ADDRESS,
  ADD_TO_CART,  
  UPDATE_CART_ITEM,
  TOGGLE_CART_ITEM,
  REMOVE_FROM_CART,
  SET_ADDRESSES,
  SET_SELECTED_ADDRESS,
  SET_CURRENT_STEP,
  SET_PAYMENT_METHOD,
  SET_CARDS,
  SET_SELECTED_CARD,
  RESET_CART,
  RESET_SELECTED_ADDRESS,
  RESET_SELECTED_CARD,
} from "../actions/shoppingCartAction";

const initialState = {
  cart: [], // [{  count: 1, product: { id: “1235”, … }  },]
  payment: {},
  address: {},
  addresses: [],
  selectedAddress: null,
  currentStep: 1,
  paymentMethod: null,
  cards: [],
  selectedCard: null,
};

const shoppingCartReducer = (state = initialState, action) => {
  let existingProductIndex;

  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case SET_PAYMENT:
      return {
        ...state,
        payment: action.payload,
      };
    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };
    case SET_ADDRESSES:
      return {
        ...state,
        addresses: action.payload,
      };
    case SET_SELECTED_ADDRESS:
      return {
        ...state,
        selectedAddress: action.payload,
      };
    case SET_CURRENT_STEP:
      return {
        ...state,
        currentStep: action.payload,
      };
    case 'SET_PAYMENT_METHOD':
      return {
        ...state,
        paymentMethod: action.payload,
        selectedCard: action.payload.id === 'credit_card' ? action.payload.selectedCard : state.selectedCard
      };
    case SET_CARDS:
      return {
        ...state,
        cards: action.payload,
      };
    case SET_SELECTED_CARD:
      return {
        ...state,
        selectedCard: action.payload,
      };

    case RESET_CART:
      return {
        ...state,
        cart: [],
        currentStep: 1
      };
      
    case RESET_SELECTED_ADDRESS:
      return {
        ...state,
        selectedAddress: null
      };
      
    case RESET_SELECTED_CARD:
      return {
        ...state,
        selectedCard: null
      };
    case ADD_TO_CART:
      // Sepette aynı ürün var mı kontrol et
      existingProductIndex = state.cart.findIndex(
        (item) => item.product.id === action.payload.id
      );

      if (existingProductIndex >= 0) {
        // Ürün zaten sepette varsa count'u artır
        const newCart = [...state.cart];
        newCart[existingProductIndex] = {
          ...newCart[existingProductIndex],
          count: newCart[existingProductIndex].count + 1,
        };
        return {
          ...state,
          cart: newCart,
        };
      }

      // Yeni ürün ekle
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            count: 1,
            checked: true,
            product: action.payload,
          },
        ],
      };
    case UPDATE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === action.payload.productId
            ? { ...item, count: action.payload.count }
            : item
        ),
      };

    case TOGGLE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === action.payload.productId
            ? { ...item, checked: action.payload.checked }
            : item
        ),
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.product.id !== action.payload),
      };

    default:
      return state;
  }
};

export default shoppingCartReducer;
