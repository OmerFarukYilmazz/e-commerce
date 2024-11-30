import { Phone, Mail, Instagram, Youtube, Facebook, Twitter, Search, ShoppingCart, Heart, LogIn } from 'lucide-react';

const Header = () => {
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
                <a href="#" className="hover:text-blue-500 py-2 ">Home</a>
                <a href="#" className="hover:text-blue-500 py-2 ">Shop</a>
                <a href="#" className="hover:text-blue-500 py-2 ">About</a>
                <a href="#" className="hover:text-blue-500 py-2 ">Blog</a>
                <a href="#" className="hover:text-blue-500 py-2 ">Contact</a>
                <a href="#" className="hover:text-blue-500 py-2 ">Pages</a>
              </div>
            </nav>

            <div className="flex items-center gap-4">
              <button className="hover:text-blue-500">
                <LogIn size={24} />
              </button>
              <button className="hover:text-blue-500">
                <Search size={24} />
              </button>
              <button className="hover:text-blue-500">
                <ShoppingCart size={24} />
              </button>
              <button className="hover:text-blue-500 flex items-center gap-1 max-md:hidden">
                <Heart size={24} />
                <span>1</span>
              </button>  
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