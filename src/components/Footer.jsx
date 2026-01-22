import { Link } from "react-router-dom";
import {
  FiGithub,
  FiTwitter,
  FiFacebook,
  FiInstagram,
  FiMail,
} from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Earthloom</h3>
            <p className="text-sm text-gray-400">
              Your one-stop destination for quality products at amazing prices.
              Shop with confidence!
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-blue-400 transition-colors">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="hover:text-pink-400 transition-colors">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="hover:text-gray-100 transition-colors">
                <FiGithub size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/products"
                  className="hover:text-blue-400 transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="hover:text-blue-400 transition-colors"
                >
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/wishlist"
                  className="hover:text-blue-400 transition-colors"
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  to="/orders"
                  className="hover:text-blue-400 transition-colors"
                >
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Customer Service
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Track Order
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Shipping Info
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <FiMail size={16} />
                <span>support@shophub.com</span>
              </li>
              <li>
                <p className="text-gray-400">Mon - Fri: 9:00 AM - 6:00 PM</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>
            &copy; {currentYear} ShopHub. All rights reserved. Made with ❤️ for
            learning purposes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
