import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { portfolioData } from "../data/portfolioData";

export default function Education() {
  // Load initial education data from LocalStorage or default portfolioData
  const storedEducation =
    JSON.parse(localStorage.getItem("education")) || portfolioData.education;

  const [education, setEducation] = useState(storedEducation);
  const [isEditing, setIsEditing] = useState(false);
  const [newEdu, setNewEdu] = useState({ degree: "", institution: "", year: "" });

  // Add new education
  const handleAddEdu = () => {
    if (newEdu.degree.trim() && newEdu.institution.trim() && newEdu.year.trim()) {
      const updatedEdu = [...education, newEdu];
      setEducation(updatedEdu);
      setNewEdu({ degree: "", institution: "", year: "" });
      localStorage.setItem("education", JSON.stringify(updatedEdu));
    }
  };

  // Remove education
  const handleRemoveEdu = (indexToRemove) => {
    const updatedEdu = education.filter((_, index) => index !== indexToRemove);
    setEducation(updatedEdu);
    localStorage.setItem("education", JSON.stringify(updatedEdu));
  };

  // Edit education inline
  const handleEduChange = (index, field, value) => {
    const updatedEdu = [...education];
    updatedEdu[index][field] = value;
    setEducation(updatedEdu);
  };

  const handleSaveEducation = () => {
    localStorage.setItem("education", JSON.stringify(education));
    setIsEditing(false);
  };

  return (
    <div className="my-6 p-4 bg-white rounded-lg shadow relative">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-semibold">Education</h2>
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
        {education.map((edu, index) => (
          <div
            key={index}
            className="p-3 border rounded-lg bg-gray-50 relative flex flex-col gap-1"
          >
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleEduChange(index, "degree", e.target.value)}
                  className="border px-2 py-1 rounded w-full font-bold"
                  placeholder="Degree"
                />
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) =>
                    handleEduChange(index, "institution", e.target.value)
                  }
                  className="border px-2 py-1 rounded w-full"
                  placeholder="Institution"
                />
                <input
                  type="text"
                  value={edu.year}
                  onChange={(e) => handleEduChange(index, "year", e.target.value)}
                  className="border px-2 py-1 rounded w-full"
                  placeholder="Year"
                />
                <button
                  onClick={() => handleRemoveEdu(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold"
                  title="Remove Education"
                >
                  ×
                </button>
              </>
            ) : (
              <>
                <h3 className="font-bold">{edu.degree}</h3>
                <p>
                  {edu.institution} | {edu.year}
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
            value={newEdu.degree}
            onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
            className="border px-2 py-1 rounded w-full"
            placeholder="New Degree"
          />
          <input
            type="text"
            value={newEdu.institution}
            onChange={(e) => setNewEdu({ ...newEdu, institution: e.target.value })}
            className="border px-2 py-1 rounded w-full"
            placeholder="New Institution"
          />
          <input
            type="text"
            value={newEdu.year}
            onChange={(e) => setNewEdu({ ...newEdu, year: e.target.value })}
            className="border px-2 py-1 rounded w-full"
            placeholder="Year"
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddEdu}
              className="bg-green-500 text-white px-4 py-1 rounded"
            >
              Add Education
            </button>
            <button
              onClick={handleSaveEducation}
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
