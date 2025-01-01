import {
  SET_CATEGORIES,
  SET_PRODUCT_LIST,
  SET_TOTAL,
  SET_FETCH_STATE,
  SET_LIMIT,
  SET_OFFSET,
  SET_FILTER,
  SET_SORT, 
  SET_SELECTED_GENDER,
  SET_SELECTED_CATEGORY,
  SET_PRODUCT_DETAIL
} from '../actions/productAction';

const initialState = {
  categories: [],
  productList: [], // list of products
  total: 0, // total number of products
  limit: 25, //default limit
  offset: 0, //default offset
  filter: '', // filter for search
  categoriesFetchState: 'NOT_FETCHED', // Categories için ayrı fetch state
  productsFetchState: 'NOT_FETCHED',   // Products için ayrı fetch state
  selectedGender: null,  // 'e' or 'k'
  selectedCategory: null, // selected category
  productDetail: null, // product detail
  productDetailFetchState: 'NOT_FETCHED', // product detail fetch state
  sort: '' // sort for sorting // 
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case SET_PRODUCT_LIST:
      return {
        ...state,
        productList: action.payload
      };
    case SET_TOTAL:
      return {
        ...state,
        total: action.payload
      };
    case SET_FETCH_STATE:
      // Action'da hangi fetch state'in güncellendiğini belirtelim
      return {
        ...state,
        [action.payload.type]: action.payload.status
      };
    case SET_LIMIT:
      return {
        ...state,
        limit: action.payload
      };
    case SET_OFFSET:
      return {
        ...state,
        offset: action.payload
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };
    case SET_SORT:
      return {
        ...state,
        sort: action.payload
      };
    case SET_SELECTED_GENDER:
      return {
        ...state,
        selectedGender: action.payload
      };
    case SET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload
      };
    case SET_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: action.payload
      };
    default:
      return state;
    
  }
};

export default productReducer;