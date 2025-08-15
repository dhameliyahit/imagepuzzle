import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Settings({ onBackgroundChange }) {
  const navigate = useNavigate();
  const [bgImage, setBgImage] = useState(localStorage.getItem("bgImage") || "");
  const [bgColor, setBgColor] = useState(localStorage.getItem("bgColor") || "#ffffff");

  const handleSave = () => {
    localStorage.setItem("bgImage", bgImage);
    localStorage.setItem("bgColor", bgColor);

    if (onBackgroundChange) {
      onBackgroundChange(bgImage, bgColor);
    }

    alert("Settings saved!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-lg bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          ⚙ Settings
        </h2>

        {/* Background Image Picker */}
        <label className="block mb-5">
          <span className="block mb-2 font-semibold text-gray-700">
            Background Image
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => setBgImage(reader.result);
                reader.readAsDataURL(file);
              }
            }}
            className="block w-full border border-gray-300 rounded-lg shadow-sm text-sm p-2 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
          {bgImage && (
            <div className="mt-3 flex justify-center">
              <img
                src={bgImage}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border"
              />
            </div>
          )}
        </label>

        {/* Background Color Picker */}
        <label className="block mb-6">
          <span className="block mb-2 font-semibold text-gray-700">
            Background Color
          </span>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => {
              setBgColor(e.target.value);
              setBgImage("");
            }}
            className="w-20 h-12 border border-gray-300 rounded-lg cursor-pointer shadow-sm"
          />
        </label>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition transform hover:scale-[1.02]"
        >
          💾 Save Settings
        </button>
      </div>
    </div>
  );
}
