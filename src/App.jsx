import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import MainMenu from "./components/MainMenu";
import LevelSelect from "./components/LevelSelect";
import Settings from "./components/Settings";
import PuzzleGame from "./components/PuzzleGame";

export default function App() {
  const [bgImage, setBgImage] = useState(localStorage.getItem("bgImage") || "");
  const [bgColor, setBgColor] = useState(localStorage.getItem("bgColor") || "#ffffff");

  useEffect(() => {
    const updateBackground = () => {
      setBgImage(localStorage.getItem("bgImage") || "");
      setBgColor(localStorage.getItem("bgColor") || "#ffffff");
    };
    window.addEventListener("storage", updateBackground);
    return () => window.removeEventListener("storage", updateBackground);
  }, []);

  // This gets called when Settings changes values
  const handleBackgroundChange = (newImage, newColor) => {
    localStorage.setItem("bgImage", newImage || "");
    localStorage.setItem("bgColor", newColor || "#ffffff");
    setBgImage(newImage || "");
    setBgColor(newColor || "#ffffff");
  };

  return (
    <div
      style={{
        backgroundColor: bgColor,
        backgroundImage: bgImage ? `url(${bgImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        transition: "background 0.3s ease",
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/levels" element={<LevelSelect />} />
          <Route
            path="/settings"
            element={<Settings onBackgroundChange={handleBackgroundChange} />}
          />
          <Route path="/play/:levelId" element={<PuzzleGame />} />
          <Route path="/*" element={<h1>404 Page Not FOund!!</h1>} />
        </Routes>
      </Router>
    </div>
  );
}
