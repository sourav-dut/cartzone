import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        {/* Company Info */}
        <div>
          <h2 className="text-lg font-semibold">Cartzone</h2>
          <p className="text-sm mt-2">Your one-stop destination for all your shopping needs.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold">Quick Links</h2>
          <ul className="mt-2 space-y-2">
            <li><Link to="#" className="hover:underline">Home</Link></li>
            <li><Link to="#" className="hover:underline">Shop</Link></li>
            <li><Link to="#" className="hover:underline">About Us</Link></li>
            <li><Link to="#" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold">Follow Us</h2>
          <div className="mt-2 flex justify-center md:justify-start space-x-4">
            {/* <Link to="https://www.facebook.com/photo/?fbid=166064685896640&set=a.110218474814595" className="hover:text-gray-400">Facebook</Link> */}
            <a
              href="https://www.facebook.com/photo/?fbid=166064685896640&set=a.110218474814595"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >Facebook</a>
            <Link to="#" className="hover:text-gray-400">Twitter</Link>
            <Link to="#" className="hover:text-gray-400">Instagram</Link>
          </div>
        </div>

        {/* User Info */}
        <div>
          <h2 className="text-lg font-semibold">Devloper/Founder</h2>
          <div className="flex items-center md:items-start mt-3">
            <img
              src="https://scontent.frdp4-1.fna.fbcdn.net/v/t39.30808-6/315242203_200085665827875_6294218304206010475_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=0eJj0RrEKXMQ7kNvwGyD8V5&_nc_oc=AdmW14rFONagjPauMh5mnVEt6W_phLHwgQ-V9XKK30_F5ke3PJv-9qmoSxPwpM4lM-0Md6vak7CB3FqyofhfFZQv&_nc_zt=23&_nc_ht=scontent.frdp4-1.fna&_nc_gid=klXnMeiNFESE9IvfKZ3aHg&oh=00_AYEZfEZ6m8AyZKExzXZ3lqomQSEeB2LTC0iBCHeW0cPjRg&oe=67F6DBCD"
              alt="User"
              className="w-12 h-12 rounded-full mb-2"
            />
            <div className="ml-2">
              <p className="text-sm">Sourav Dutta</p>
              <p className="text-sm">dustbinpaul99@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-400 mt-8 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} Cartzone. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
