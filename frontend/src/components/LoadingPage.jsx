import { motion } from "framer-motion";

export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Animated Loading Spinner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
      />

      {/* Loading Text with Fade-in Effect */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        className="mt-4 text-lg font-medium text-gray-700"
      >
        Loading, please wait...
      </motion.p>

      {/* Progress Bar */}
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="mt-6 w-32 h-2 bg-blue-500 rounded-full"
      />
    </div>
  );
}
