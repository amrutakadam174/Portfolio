import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { portfolioData } from "../data/portfolioData";

export default function Skills() {
  // Load initial skills from LocalStorage or default portfolioData
  const storedSkills =
    JSON.parse(localStorage.getItem("skills")) || portfolioData.skills;

  const [technicalSkills, setTechnicalSkills] = useState(
    storedSkills?.technical || []
  );
  const [softSkills, setSoftSkills] = useState(storedSkills?.soft || []);
  const [newSkill, setNewSkill] = useState("");
  const [activeCategory, setActiveCategory] = useState("technical"); // "technical" or "soft"
  const [isEditing, setIsEditing] = useState(false);

  const saveToLocalStorage = (updatedTechnical, updatedSoft) => {
    localStorage.setItem(
      "skills",
      JSON.stringify({ technical: updatedTechnical, soft: updatedSoft })
    );
  };

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;

    if (activeCategory === "technical" && !technicalSkills.includes(newSkill)) {
      const updated = [...technicalSkills, newSkill.trim()];
      setTechnicalSkills(updated);
      saveToLocalStorage(updated, softSkills);
    } else if (activeCategory === "soft" && !softSkills.includes(newSkill)) {
      const updated = [...softSkills, newSkill.trim()];
      setSoftSkills(updated);
      saveToLocalStorage(technicalSkills, updated);
    }
    setNewSkill("");
  };

  const handleRemoveSkill = (category, skillToRemove) => {
    if (category === "technical") {
      const updated = technicalSkills.filter((s) => s !== skillToRemove);
      setTechnicalSkills(updated);
      saveToLocalStorage(updated, softSkills);
    } else {
      const updated = softSkills.filter((s) => s !== skillToRemove);
      setSoftSkills(updated);
      saveToLocalStorage(technicalSkills, updated);
    }
  };

  return (
    <div className="my-6 p-4 bg-white rounded-lg shadow relative">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-semibold">Skills</h2>
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

      {/* Technical Skills */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Technical Skills</h3>
        <ul className="flex flex-wrap gap-2 mb-2">
          {technicalSkills.map((skill, index) => (
            <li
              key={index}
              className="bg-blue-200 px-3 py-1 rounded-full flex items-center gap-1"
            >
              {skill}
              {isEditing && (
                <button
                  onClick={() => handleRemoveSkill("technical", skill)}
                  className="text-red-500 hover:text-red-700 font-bold ml-1"
                  title="Remove Skill"
                >
                  ×
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Soft Skills */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Soft Skills</h3>
        <ul className="flex flex-wrap gap-2 mb-2">
          {softSkills.map((skill, index) => (
            <li
              key={index}
              className="bg-green-200 px-3 py-1 rounded-full flex items-center gap-1"
            >
              {skill}
              {isEditing && (
                <button
                  onClick={() => handleRemoveSkill("soft", skill)}
                  className="text-red-500 hover:text-red-700 font-bold ml-1"
                  title="Remove Skill"
                >
                  ×
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      {isEditing && (
        <div className="flex gap-2 mt-3">
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="technical">Technical</option>
            <option value="soft">Soft</option>
          </select>
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="border px-2 py-1 rounded flex-1"
            placeholder="Add new skill"
          />
          <button
            onClick={handleAddSkill}
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
