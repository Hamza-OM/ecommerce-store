import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-16 bg-white border-t dark:bg-gray-900 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">ShopHub</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Your one-stop destination for quality products.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a className="hover:text-gray-900 dark:hover:text-gray-200" href="#">About</a></li>
              <li><a className="hover:text-gray-900 dark:hover:text-gray-200" href="#">Careers</a></li>
              <li><a className="hover:text-gray-900 dark:hover:text-gray-200" href="#">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Support</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a className="hover:text-gray-900 dark:hover:text-gray-200" href="#">Help Center</a></li>
              <li><a className="hover:text-gray-900 dark:hover:text-gray-200" href="#">Shipping</a></li>
              <li><a className="hover:text-gray-900 dark:hover:text-gray-200" href="#">Returns</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Legal</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a className="hover:text-gray-900 dark:hover:text-gray-200" href="#">Privacy Policy</a></li>
              <li><a className="hover:text-gray-900 dark:hover:text-gray-200" href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 text-xs text-gray-500 dark:text-gray-500">© {new Date().getFullYear()} ShopHub. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
