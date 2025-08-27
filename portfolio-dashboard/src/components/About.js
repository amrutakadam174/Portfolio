import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { portfolioData } from "../data/portfolioData";
export default function About() {
  // Load initial data from LocalStorage or default portfolioData
  const storedAbout = JSON.parse(localStorage.getItem("about")) || portfolioData.about;

  const [aboutText, setAboutText] = useState(storedAbout);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    localStorage.setItem("about", JSON.stringify(aboutText));
    setIsEditing(false);
  };

  return (
    <div className="my-6 p-4 bg-white rounded-lg shadow relative">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold">About Me</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-700 p-1 rounded"
            title="Edit"
          >
            <FiEdit size={18} />
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="flex flex-col gap-2">
          <textarea
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
            className="border px-2 py-1 rounded w-full h-32"
            placeholder="Write something about yourself..."
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white px-4 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700">{aboutText}</p>
      )}
    </div>
  );
}
