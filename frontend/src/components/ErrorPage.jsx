import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-900 px-6">
      {/* Animated 404 */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 drop-shadow-lg"
      >
        404
      </motion.h1>

      {/* Error Message */}
      <p className="mt-4 text-lg text-gray-600">Oops! The page you are looking for doesn’t exist.</p>

      {/* Go Back Button */}
      <Link to="/" className="mt-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="px-6 py-3 bg-blue-500 rounded-lg text-white font-medium hover:bg-blue-600 transition-all shadow-lg"
        >
          Go Back Home
        </motion.button>
      </Link>
    </div>
  );
}
