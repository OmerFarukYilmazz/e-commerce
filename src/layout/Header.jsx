import { Phone, Mail, Instagram, Youtube, Facebook, Twitter, Search, ShoppingCart, Heart, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Gravatar from 'react-gravatar';
import { logout } from '../store/actions/clientAction';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Categories from '../components/category/Categories';
import { useState } from 'react';

import CartDropdown from '../components/shop/CartDropdown';


const Header = () => {
  const userInfo = useSelector((state) => state.client.userInfo);  
  const [showCategories, setShowCategories] = useState(false);
  
  const [showCart, setShowCart] = useState(false);
  const cart = useSelector(state => state.shoppingCart.cart);
  const totalItems = cart.reduce((total, item) => total + item.count, 0);

  const [closeTimeout, setCloseTimeout] = useState(null);

  //console.log("Current user state:", userInfo); // Debug için
  
  const dispatch = useDispatch();
  const history = useHistory();
 
  const handleShowCategories = () => {
    setShowCategories(!showCategories);
  };
 

  const handleLogout = () => {
    dispatch(logout());
    history.push('/');
  };
  

  const handleMouseEnter = () => {
    if (closeTimeout) clearTimeout(closeTimeout);
    setShowCart(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowCart(false);
    }, 300); // 300ms gecikme ekledik
    setCloseTimeout(timeout);
  };

  const handleCartClick = () => {
    setShowCart(false); 
    history.push('/cart');
  };

  return (
    <>
      {/* Top Bar - Mobile'da gizlenecek */}
      <div className="bg-headerDark text-white py-2 px-4 max-md:hidden">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>(225) 555-0118</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>michelle.rivera@example.com</span>
            </div>
          </div>
          
          <div className="text-center">
            <span>Follow Us and get a chance to win 80% off</span>
          </div>

          <div className="flex items-center gap-4">
            <span>Follow Us :</span>
            <div className="flex gap-2">
              <a href="#" className="hover:text-gray-300"><Instagram size={16} /></a>
              <a href="#" className="hover:text-gray-300"><Youtube size={16} /></a>
              <a href="#" className="hover:text-gray-300"><Facebook size={16} /></a>
              <a href="#" className="hover:text-gray-300"><Twitter size={16} /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="py-4 px-4 shadow-sm">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">
              Bandage
            </div>

            {/* Navigation - Masaüstünde yatay, mobilde dikey */}
            <nav className="max-md:hidden md:items-center md:justify-center md:gap-8 md:mt-0 mt-4">
            <div className="flex flex-col md:flex-row md:gap-8 text-center">
                <Link to="/" className="hover:text-blue-500 py-2">Home</Link>
                <div className="relative">
                  <button 
                    className="hover:text-blue-500 py-2"
                    onClick={handleShowCategories}
                  >
                    Shop
                  </button>
                  {showCategories && (
                    <div className="absolute z-10 top-full">
                      <Categories handleShowCategories = {handleShowCategories} />
                    </div>
                  )}
                </div>
                <Link to="/about-us" className="hover:text-blue-500 py-2">About</Link>
                <Link to="/team" className="hover:text-blue-500 py-2">Team</Link>
                <Link to="/contact" className="hover:text-blue-500 py-2">Contact</Link>
                {/* <Link to="/pages" className="hover:text-blue-500 py-2">Pages</Link> */}
              </div>
            </nav>

            <div className="flex items-center gap-4">
            {userInfo.token? (
              <div className="flex items-center gap-2">
                <Gravatar
                  email={userInfo.email}
                  size={32}
                  className="rounded-full"
                />
                <User size={20} />
                <span className="text-sm font-medium">{userInfo.name}</span>
                <button onClick={handleLogout}>Log out</button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="text-sm font-medium hover:text-blue-500">
                  Login
                </Link>
                <span>/</span>
                <Link to="/register" className="text-sm font-medium hover:text-blue-500">
                  Register
                </Link>
              </div>
)}
              
              <button className="hover:text-blue-500">
                <Search size={20} />
              </button>
              <div 
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button 
                  className="hover:text-blue-500 flex items-center gap-1"
                  onClick={handleCartClick}
                >
                  <ShoppingCart size={20} />
                  <span>{totalItems}</span>
                </button>
                {showCart && <CartDropdown cart={cart} onClose={() => setShowCart(false)} />}
              </div>
              <Link to="/wishlist" className="hover:text-blue-500 flex items-center gap-1 max-md:hidden">
                <Heart size={20} />
                <span>1</span>
              </Link>
            </div>         
          </div>

          {/* Mobil Menü */}
          <nav className="md:hidden flex flex-col items-center text-gray-500 text-5xl font-medium py-10">
            <a href="#" className="hover:text-blue-500 py-6">Home</a>
            <a href="#" className="hover:text-blue-500 py-6">Product</a>
            <a href="#" className="hover:text-blue-500 py-6">Pricing</a>
            <a href="#" className="hover:text-blue-500 py-6">Contact</a>
          </nav>

          </div>
      </header>
    </>
  );
};

export default Header;