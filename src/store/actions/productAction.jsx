export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';
export const SET_TOTAL = 'SET_TOTAL';
export const SET_FETCH_STATE = 'SET_FETCH_STATE';
export const SET_LIMIT = 'SET_LIMIT';
export const SET_OFFSET = 'SET_OFFSET';
export const SET_FILTER = 'SET_FILTER';

// I added this action for sorting
export const SET_SORT = 'SET_SORT';

// I added these actions for not using Url params
export const SET_SELECTED_GENDER = 'SET_SELECTED_GENDER';
export const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY';

// I added this action for fetching product detail
export const SET_PRODUCT_DETAIL = 'SET_PRODUCT_DETAIL';

import { sendRequest, METHODS } from '../../utils/axiosUtil';



// Action Creators
export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories
});

export const setProductList = (products) => ({
  type: SET_PRODUCT_LIST,
  payload: products
});

export const setTotal = (total) => ({
  type: SET_TOTAL,
  payload: total
});

export const setFetchState = (type, status) => ({
  type: SET_FETCH_STATE,
  payload: { type, status }
});

export const setLimit = (limit) => ({
  type: SET_LIMIT,
  payload: limit
});

export const setOffset = (offset) => ({
  type: SET_OFFSET,
  payload: offset
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter
});

// I added this action for sorting
export const setSort = (sort) => ({
  type: SET_SORT,
  payload: sort
});

// I added these actions for not using Url params
export const setSelectedGender = (gender) => ({
  type: SET_SELECTED_GENDER,
  payload: gender
});

export const setSelectedCategory = (category) => ({
  type: SET_SELECTED_CATEGORY,
  payload: category
});

// I added this action for fetching product detail
export const setProductDetail = (productDetail) => ({
  type: SET_PRODUCT_DETAIL,
  payload: productDetail
});

// fetcheCategories thunk action
export const fetchCategories = () => {
  return async (dispatch) => {
    dispatch(setFetchState('categoriesFetchState', 'FETCHING'));
    try {
      const response = await sendRequest({
        url: '/categories',
        method: METHODS.GET,
      });
      dispatch(setCategories(response));
      dispatch(setFetchState('categoriesFetchState' , 'FETCHED'));
    } catch (error) {
      console.error('Error fetching categories:', error);
      dispatch(setFetchState('categoriesFetchState' , 'FAILED'));
    }
  };
};



// fetchProducts thunk action
export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch(setFetchState('FETCHING'));
    try {
      const response = await sendRequest({
        url: '/products',
        method: METHODS.GET,
      });
      
      dispatch(setProductList(response.products));
      dispatch(setTotal(response.total));
      dispatch(setFetchState('FETCHED'));
    } catch (error) {
      console.error('Error fetching products:', error);
      dispatch(setFetchState('FAILED'));
    }
  };
};


// fetchFilteredProducts thunk action
export const fetchFilteredProducts = () => {
  return async (dispatch, getState) => {
    const { selectedGender, selectedCategory, filter, sort, limit, offset } = getState().product;
    
    dispatch(setFetchState('productsFetchState', 'FETCHING'));
    try {
      const queryParams = {
        ...(selectedGender && { gender: selectedGender }),
        ...(selectedCategory && { category: selectedCategory.id }),
        ...(filter && { filter }),
        ...(sort && { sort }),
        limit,
        offset,
      };

      const response = await sendRequest({
        url: '/products',
        method: METHODS.GET,
        params: queryParams
      });
      
      dispatch(setProductList(response.products));
      dispatch(setTotal(response.total));
      dispatch(setFetchState('productsFetchState', 'FETCHED'));
    } catch (error) {
      console.error('Error fetching products:', error);
      dispatch(setFetchState('productsFetchState', 'FAILED'));
    }
  };
};

// fetchProductDetail thunk action
export const fetchProductDetail = (productId) => {
  return async (dispatch) => {
    dispatch(setFetchState('productDetailFetchState', 'FETCHING'));
    try {
      const response = await sendRequest({
        url: `/products/${productId}`,
        method: METHODS.GET
      });
      dispatch(setProductDetail(response));
      dispatch(setFetchState('productDetailFetchState', 'FETCHED'));
    } catch (error) {
      console.error('Error fetching product detail:', error);
      dispatch(setFetchState('productDetailFetchState', 'FAILED'));
    }
  };
};