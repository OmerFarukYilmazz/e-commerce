export const SET_USER = 'SET_USER';
export const SET_ROLES = 'SET_ROLES';
export const SET_THEME = 'SET_THEME';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const LOGOUT = 'LOGOUT';

import { toast } from 'react-toastify';
import { sendRequest, METHODS } from '../../utils/axiosUtil';

// Action Creators
export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

export const setRoles = (roles) => ({
  type: SET_ROLES,
  payload: roles
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme
});

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language
});

// Logout action
export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('token'); // Token'ı localStorage'dan kaldır
    dispatch({ type: LOGOUT }); // Reducer'da LOGOUT action'ını tetikle
    toast.success('Successfully logged out!'); // Başarılı çıkış mesajı göster
  };
};

// Thunk Action Creator for Roles
export const fetchRoles = () => {
  return async (dispatch) => {
    try {
      const response = await sendRequest({
        url: '/roles',
        method: METHODS.GET
      });
      dispatch(setRoles(response));
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };
};

// Login Thunk Action
export const loginUser = (formData, history, from = '/') => {
    return async (dispatch) => {
        try {
            const response = await sendRequest({
              url: '/login',
              method: METHODS.POST,
              data: {
                email: formData.email,
                password: formData.password
              }
            });
      
            const userData = {
              name: response.name,
              email: response.email,
              role_id: response.role_id,
              token: response.token
            };

            // User bilgisini store'a kaydet
            dispatch(setUser(userData));

            // Remember me seçiliyse token'ı localStorage'a kaydet
            if (formData.rememberMe) {
                localStorage.setItem('token', response.token);               
            }

            toast.success('Successfully logged in!');
            history.replace(from);

        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed!');
        }
    };
  };

// Verify token action
export const verifyToken = () => {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem('token');        
        if (!token) return;
        console.log("Token:", token);

        // Token'ı verify et
        const response = await sendRequest({
          url: '/verify',
          method: METHODS.GET
        });
  
        // User bilgilerini güncelle
        const userData = {
          name: response.name,
          email: response.email,
          role_id: response.role_id,
          token: token
        };
  
        dispatch(setUser(userData));
  
      } catch (error) {
        // Token geçersizse temizle
        localStorage.removeItem('token');        
        dispatch(setUser(null));
      }
    };
  };