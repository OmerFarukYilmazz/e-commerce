import {
  SET_USER,
  SET_ROLES,
  SET_THEME,
  SET_LANGUAGE,
  LOGOUT
} from "../actions/clientAction";

const initialState = {
  userInfo: {
    name: "",
    email: "",
    token: undefined,
    role_id: "",
  },
  addressList: [],
  creditCards: [],
  roles: [],
  theme: "light",
  language: "tr",
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          ...action.payload
        }
      };
    case SET_ROLES:
      return {
        ...state,
        roles: action.payload,
      };
    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        userInfo: initialState.userInfo // Initial state'deki boş userInfo'ya dön
      };
    default:
      return state;
  }
};

export default clientReducer;
