import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <>
      {/* Üst Footer - Koyu Arka Plan */}
      <footer className="bg-gray-50 py-12">
        <div className="w-[90%] mx-auto">
          {/* Üst Kısım - Logo ve Sosyal Medya */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-2xl font-bold mb-4 md:mb-0">Bandage</h2>
            <div className="flex gap-4 mr-8"> {/* mr-8 ekledik */}
              <a href="#" className="text-blue-400 hover:text-blue-600">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-600">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-600">
                <Twitter size={24} />
              </a>
            </div>
          </div>

          {/* Ana İçerik Grid */}
          <div className="w-[90%] grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg mb-6">Company Info</h3>
              <ul className="space-y-3 text-gray-600">
                <li><a href="#" className="hover:text-blue-500">About Us</a></li>
                <li><a href="#" className="hover:text-blue-500">Carrier</a></li>
                <li><a href="#" className="hover:text-blue-500">We are hiring</a></li>
                <li><a href="#" className="hover:text-blue-500">Blog</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg mb-6">Legal</h3>
              <ul className="space-y-3 text-gray-600">
                <li><a href="#" className="hover:text-blue-500">About Us</a></li>
                <li><a href="#" className="hover:text-blue-500">Carrier</a></li>
                <li><a href="#" className="hover:text-blue-500">We are hiring</a></li>
                <li><a href="#" className="hover:text-blue-500">Blog</a></li>
              </ul>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg mb-6">Features</h3>
              <ul className="space-y-3 text-gray-600">
                <li><a href="#" className="hover:text-blue-500">Business Marketing</a></li>
                <li><a href="#" className="hover:text-blue-500">User Analytic</a></li>
                <li><a href="#" className="hover:text-blue-500">Live Chat</a></li>
                <li><a href="#" className="hover:text-blue-500">Unlimited Support</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg mb-6">Resources</h3>
              <ul className="space-y-3 text-gray-600">
                <li><a href="#" className="hover:text-blue-500">IOS & Android</a></li>
                <li><a href="#" className="hover:text-blue-500">Watch a Demo</a></li>
                <li><a href="#" className="hover:text-blue-500">Customers</a></li>
                <li><a href="#" className="hover:text-blue-500">API</a></li>
              </ul>
            </div>

            {/* Get In Touch */}
            <div className="space-y-4 mr-10 w-[100%]">
              <h3 className="font-bold text-lg mb-6">Get In Touch</h3>
              <div className="flex items-center">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="flex-grow py-3 border border-r-0 rounded-l focus:outline-none"
                />
                <button className="bg-blue-500 text-white px-4 py-3 rounded-r hover:bg-blue-600 transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-gray-600 text-sm">
                Lore imp sum dolor Amit
              </p>
            </div>
            <div>

            </div>
          </div>
        </div>
      </footer>

      {/* Alt Footer - Daha Koyu Arka Plan */}
      <div className="bg-gray-100 py-6">
        <div className="w-[90%] mx-auto">
          <p className="text-left md:text-left text-gray-600">
            Made With Love By Finland All Right Reserved
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;