// src/routes/ProtectedRoute.jsx
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PublicOnlyRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  
  return (
    <Route
      {...rest}
      render={props =>
        !token ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};