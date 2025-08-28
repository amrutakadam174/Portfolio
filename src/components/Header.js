import React, { useState } from "react";
import { FiEdit } from "react-icons/fi"; // Pencil icon
import { portfolioData } from "../data/portfolioData";

export default function Header() {
  // Load initial data from LocalStorage or default portfolioData
  const storedHeader = JSON.parse(localStorage.getItem("header")) || portfolioData.header;

  const [name, setName] = useState(storedHeader.name);
  const [title, setTitle] = useState(storedHeader.title);
  const [isEditing, setIsEditing] = useState(false);

  // Save updated data to LocalStorage
  const handleSave = () => {
    const updatedHeader = { name, title, photo: storedHeader.photo };
    localStorage.setItem("header", JSON.stringify(updatedHeader));
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md w-full relative">
      <img
        src={storedHeader.photo}
        alt="Profile"
        className="w-32 h-32 rounded-full mb-4"
      />

      {isEditing ? (
        <div className="flex flex-col items-center gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-2 py-1 rounded w-80 text-center font-bold text-2xl"
            placeholder="Your Name"
          />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border px-2 py-1 rounded w-80 text-center text-gray-600"
            placeholder="Your Headline"
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
        <div className="flex flex-col items-center gap-2 w-80 relative">
          <h1 className="text-3xl font-bold text-center">{name}</h1>
          <div className="flex items-center justify-between w-full">
            <p className="text-gray-600 text-center flex-1">{title}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 hover:text-blue-700 p-1 rounded"
              title="Edit"
            >
              <FiEdit size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
