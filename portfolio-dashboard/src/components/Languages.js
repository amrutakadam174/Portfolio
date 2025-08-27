import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { portfolioData } from "../data/portfolioData";
export default function Languages() {
  const storedLanguages =
    JSON.parse(localStorage.getItem("languages")) || portfolioData.languages;

  const [languages, setLanguages] = useState(storedLanguages);
  const [newLang, setNewLang] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Add new language
  const handleAddLang = () => {
    if (newLang.trim() && !languages.includes(newLang.trim())) {
      const updatedLang = [...languages, newLang.trim()];
      setLanguages(updatedLang);
      setNewLang("");
      localStorage.setItem("languages", JSON.stringify(updatedLang));
    }
  };

  // Remove language
  const handleRemoveLang = (langToRemove) => {
    const updatedLang = languages.filter((lang) => lang !== langToRemove);
    setLanguages(updatedLang);
    localStorage.setItem("languages", JSON.stringify(updatedLang));
  };

  return (
    <div className="my-6 p-4 bg-white rounded-lg shadow relative">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-semibold">Languages</h2>
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

      <ul className="list-disc ml-6">
        {languages.map((lang, index) => (
          <li key={index} className="flex items-center justify-between">
            <span>{lang}</span>
            {isEditing && (
              <button
                onClick={() => handleRemoveLang(lang)}
                className="text-red-500 hover:text-red-700 ml-2"
                title="Remove"
              >
                ×
              </button>
            )}
          </li>
        ))}
      </ul>

      {isEditing && (
        <div className="flex gap-2 mt-3">
          <input
            type="text"
            value={newLang}
            onChange={(e) => setNewLang(e.target.value)}
            className="border px-2 py-1 rounded flex-1"
            placeholder="Add new language"
          />
          <button
            onClick={handleAddLang}
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
      )}
    </div>
  );
}
