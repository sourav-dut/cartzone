const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Company Info */}
        <div>
          <h2 className="text-lg font-semibold">ShopEase</h2>
          <p className="text-sm mt-2">Your one-stop destination for all your shopping needs.</p>
        </div>
        
        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold">Quick Links</h2>
          <ul className="mt-2 space-y-2">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Shop</a></li>
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>
        
        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold">Follow Us</h2>
          <div className="mt-2 flex justify-center md:justify-start space-x-4">
            <a href="#" className="hover:text-gray-400">Facebook</a>
            <a href="#" className="hover:text-gray-400">Twitter</a>
            <a href="#" className="hover:text-gray-400">Instagram</a>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="text-center text-sm text-gray-400 mt-8 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
