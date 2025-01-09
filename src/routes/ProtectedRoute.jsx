import { Routes, Route } from 'react-router-dom';
import Orders from '../pages/Orders';

const ProtectedRoute = () => {
  return (
    <Routes>
      {/* ... diğer routelar ... */}
      <Route path="/orders" element={<Orders />} />
    </Routes>
  );
};

export default ProtectedRoute;