import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function LevelSelect() {
  const totalLevels = 30; // total number of levels
  const [unlockedLevels, setUnlockedLevels] = useState([1]);

  const navigate = useNavigate()

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("unlockedLevels")) || [1];
    setUnlockedLevels(saved);
  }, []);

  const handleUnlock = (level) => {
    alert("Pretend watching ad..."); // integrate real ad here
    const updated = [...unlockedLevels, level];
    setUnlockedLevels(updated);
    localStorage.setItem("unlockedLevels", JSON.stringify(updated));
  };

  // Function to decide difficulty
  const getDifficulty = (level) => {
    if (level <= 5) return "Easy 🟢";
    if (level <= 20) return "Medium 🟡";
    return "Hard 🔴";
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 sm:p-6 relative">
      {/* Title */}
      <h2 className="text-2xl sm:text-4xl font-extrabold text-white drop-shadow-lg mb-6 tracking-wide text-center">
        🎮 Select Your Level
      </h2>

      {/* Back Button */}
      <div
        onClick={() => navigate("/")}
        className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-black/60 text-white px-3 py-1 rounded-lg shadow-lg cursor-pointer hover:bg-black/80 transition text-sm sm:text-base"
      >
        ⬅ Back
      </div>

      {/* Level Grid */}
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 sm:gap-6">
        {Array.from({ length: totalLevels }, (_, i) => i + 1).map((level) => (
          <div
            key={level}
            className="relative w-28 h-28 xs:w-32 xs:h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 flex flex-col justify-center items-center transition-transform hover:scale-105"
          >
            {unlockedLevels.includes(level) ? (
              <Link
                to={`/play/${level}`}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-md shadow-blue-300 transition duration-300 text-xs sm:text-sm md:text-base text-center"
              >
                Play {level}
              </Link>
            ) : (
              <>
                <span className="text-xs sm:text-sm font-semibold text-gray-300">
                  Level {level} Locked
                </span>
                <button
                  onClick={() => handleUnlock(level)}
                  className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-md shadow-yellow-300 transition duration-300 text-xs sm:text-sm"
                >
                  Unlock by Ad
                </button>
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-xl flex items-center justify-center text-white text-lg sm:text-3xl">
                  🔒
                </div>
              </>
            )}

            {/* Difficulty label */}
            <span className="absolute bottom-2 text-[10px] sm:text-xs text-white bg-black/50 px-1.5 sm:px-2 py-0.5 rounded">
              {getDifficulty(level)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
