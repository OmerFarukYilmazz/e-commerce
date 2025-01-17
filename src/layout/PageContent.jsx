import { Switch, Route, Redirect } from "react-router-dom/";

import HomePage from "../pages/HomePage";
import ShopPage from "../pages/ShopPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import ContactPage from "../pages/ContactPage";
import TeamPage from "../pages/TeamPage";
import AboutPage from "../pages/AboutPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import CartPage from "../pages/CartPage";
import OrderPage from "../pages/OrderPage";
import PreviousOrdersPage from "../pages/PreviousOrdersPage";
import { useSelector } from 'react-redux';
import { PublicOnlyRoute } from '../routes/PublicOnlyRoute';

export const PageContent = () => {
  const userInfo = useSelector((state) => state.client.userInfo);

  return (
    <>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>        
        <Route path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId">
          <ProductDetailPage />
        </Route>
        <Route path="/shop">
          <ShopPage />
        </Route>
        <Route path="/contact">
          <ContactPage />
        </Route>
        <Route path="/team">
          <TeamPage />
        </Route>
        <Route path="/about-us">
          <AboutPage />
        </Route>
        <Route path="/cart">
          <CartPage />
        </Route>    
        {/* Protected Order Route */}
        <Route path="/orders">
          {userInfo.token ? <PreviousOrdersPage /> : <Redirect to="/login" />}
        </Route>
        <Route path="/order/address">
        {userInfo.token ? <OrderPage /> : <Redirect to="/login" />}
        </Route>  

        <PublicOnlyRoute path="/login" component={LoginPage} />
        <PublicOnlyRoute path="/register" component={RegisterPage} />
      </Switch>
    </>
  );
};