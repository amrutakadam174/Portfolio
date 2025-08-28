import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { portfolioData } from "../data/portfolioData";
export default function Experience() {
  // Load initial experience data from LocalStorage or default portfolioData
  const storedExperience =
    JSON.parse(localStorage.getItem("experience")) || portfolioData.experience;

  const [experience, setExperience] = useState(storedExperience);
  const [isEditing, setIsEditing] = useState(false);
  const [newExp, setNewExp] = useState({ role: "", company: "", duration: "" });

  // Add new experience
  const handleAddExp = () => {
    if (newExp.role.trim() && newExp.company.trim() && newExp.duration.trim()) {
      const updatedExp = [...experience, newExp];
      setExperience(updatedExp);
      setNewExp({ role: "", company: "", duration: "" });
      localStorage.setItem("experience", JSON.stringify(updatedExp));
    }
  };

  // Remove experience
  const handleRemoveExp = (indexToRemove) => {
    const updatedExp = experience.filter((_, index) => index !== indexToRemove);
    setExperience(updatedExp);
    localStorage.setItem("experience", JSON.stringify(updatedExp));
  };

  // Edit experience inline
  const handleExpChange = (index, field, value) => {
    const updatedExp = [...experience];
    updatedExp[index][field] = value;
    setExperience(updatedExp);
  };

  const handleSaveExperience = () => {
    localStorage.setItem("experience", JSON.stringify(experience));
    setIsEditing(false);
  };

  return (
    <div className="my-6 p-4 bg-white rounded-lg shadow relative">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-semibold">Experience / Volunteering</h2>
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

      <div className="flex flex-col gap-2">
        {experience.map((exp, index) => (
          <div
            key={index}
            className="p-3 border rounded-lg bg-gray-50 relative flex flex-col gap-1"
          >
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={exp.role}
                  onChange={(e) => handleExpChange(index, "role", e.target.value)}
                  className="border px-2 py-1 rounded w-full font-bold"
                  placeholder="Role"
                />
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) =>
                    handleExpChange(index, "company", e.target.value)
                  }
                  className="border px-2 py-1 rounded w-full"
                  placeholder="Company / Organization"
                />
                <input
                  type="text"
                  value={exp.duration}
                  onChange={(e) =>
                    handleExpChange(index, "duration", e.target.value)
                  }
                  className="border px-2 py-1 rounded w-full"
                  placeholder="Duration"
                />
                <button
                  onClick={() => handleRemoveExp(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold"
                  title="Remove Experience"
                >
                  ×
                </button>
              </>
            ) : (
              <>
                <h3 className="font-bold">{exp.role}</h3>
                <p>
                  {exp.company} | {exp.duration}
                </p>
              </>
            )}
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="mt-3 flex flex-col gap-2">
          <input
            type="text"
            value={newExp.role}
            onChange={(e) => setNewExp({ ...newExp, role: e.target.value })}
            className="border px-2 py-1 rounded w-full"
            placeholder="New Role"
          />
          <input
            type="text"
            value={newExp.company}
            onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
            className="border px-2 py-1 rounded w-full"
            placeholder="New Company / Organization"
          />
          <input
            type="text"
            value={newExp.duration}
            onChange={(e) => setNewExp({ ...newExp, duration: e.target.value })}
            className="border px-2 py-1 rounded w-full"
            placeholder="Duration"
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddExp}
              className="bg-green-500 text-white px-4 py-1 rounded"
            >
              Add Experience
            </button>
            <button
              onClick={handleSaveExperience}
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
