import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { portfolioData } from "../data/portfolioData";
export default function Achievements() {
  const storedAchievements =
    JSON.parse(localStorage.getItem("achievements")) || portfolioData.achievements;

  // Normalize old string achievements into objects
  const normalizeAch = (achs) =>
    achs.map((a) => (typeof a === "string" ? { title: a, link: "" } : a));

  const [achievements, setAchievements] = useState(normalizeAch(storedAchievements));
  const [newAch, setNewAch] = useState({ title: "", link: "" });
  const [isEditing, setIsEditing] = useState(false);

  // Save to localStorage
  const saveToLocalStorage = (updatedAch) => {
    localStorage.setItem("achievements", JSON.stringify(updatedAch));
  };

  // Add new achievement
  const handleAddAch = () => {
    if (newAch.title.trim() && !achievements.some((a) => a.title === newAch.title)) {
      const updatedAch = [...achievements, newAch];
      setAchievements(updatedAch);
      setNewAch({ title: "", link: "" });
      saveToLocalStorage(updatedAch);
    }
  };

  // Remove achievement
  const handleRemoveAch = (achToRemove) => {
    const updatedAch = achievements.filter((ach) => ach !== achToRemove);
    setAchievements(updatedAch);
    saveToLocalStorage(updatedAch);
  };

  return (
    <div className="my-6 p-4 bg-white rounded-lg shadow relative">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-semibold">Achievements</h2>
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

      {/* Numbered list */}
      <ol className="list-decimal list-inside space-y-2">
        {achievements.map((ach, index) => (
          <li key={index} className="relative">
            <p className="font-medium">{ach.title}</p>
            {ach.link && (
              <a
                href={ach.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm"
              >
                View Proof
              </a>
            )}
            {isEditing && (
              <button
                onClick={() => handleRemoveAch(ach)}
                className="absolute right-0 top-0 text-red-500 hover:text-red-700 font-bold"
                title="Remove Achievement"
              >
                ×
              </button>
            )}
          </li>
        ))}
      </ol>

      {/* Add section */}
      {isEditing && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
          <input
            type="text"
            value={newAch.title}
            onChange={(e) => setNewAch({ ...newAch, title: e.target.value })}
            className="border px-2 py-1 rounded"
            placeholder="Achievement Title"
          />
          <input
            type="text"
            value={newAch.link}
            onChange={(e) => setNewAch({ ...newAch, link: e.target.value })}
            className="border px-2 py-1 rounded"
            placeholder="Link (Drive/Proof)"
          />
          <div className="flex gap-2 col-span-1 md:col-span-2">
            <button
              onClick={handleAddAch}
              className="bg-green-500 text-white px-4 py-1 rounded"
            >
              Add
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white px-4 py-1 rounded"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
