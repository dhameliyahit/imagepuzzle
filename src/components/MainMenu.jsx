import { Link } from "react-router-dom";
import { FaPlay, FaRedo, FaCog } from "react-icons/fa";

export default function MainMenu() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#9600FF] to-[#AEBAF8] gap-8 sm:gap-10 relative overflow-hidden px-4">

      {/* Subtle background animation */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 animate-pulse-slow"></div>

      {/* Game Title */}
      <h1 className="text-4xl sm:text-6xl font-extrabold text-white text-center drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] animate-fade-in">
        🎯 Image Puzzle Master
      </h1>

      {/* Menu Buttons */}
      <div className="flex flex-col gap-4 sm:gap-6 w-full sm:w-64 relative z-10">
        
        <Link
          to="/levels"
          className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transform transition-all duration-200 text-base sm:text-lg font-semibold"
        >
          <FaPlay className="text-lg sm:text-xl" /> Play
        </Link>

        <Link
          to="/levels?resume=true"
          className="flex items-center justify-center gap-3 bg-yellow-500 hover:bg-yellow-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transform transition-all duration-200 text-base sm:text-lg font-semibold"
        >
          <FaRedo className="text-lg sm:text-xl" /> Resume
        </Link>

        <Link
          to="/settings"
          className="flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-900 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transform transition-all duration-200 text-base sm:text-lg font-semibold"
        >
          <FaCog className="text-lg sm:text-xl" /> Settings
        </Link>
      </div>
    </div>
  );
}
