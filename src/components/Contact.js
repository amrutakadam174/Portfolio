import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from "react-icons/fa";
import { portfolioData } from "../data/portfolioData";

export default function Contact() {
  // Load initial data from localStorage or portfolioData
  const storedContact =
    JSON.parse(localStorage.getItem("contact")) || portfolioData.contact;

  const [contact, setContact] = useState({
    email: "amrutackadam@gmail.com", // Default email
    github: "https://github.com/amrutakadam174", // Default GitHub
    ...storedContact,
  });

  const [isEditing, setIsEditing] = useState(false);

  // Handle input change
  const handleChange = (field, value) => {
    setContact({ ...contact, [field]: value });
  };

  // Save changes to localStorage
  const handleSave = () => {
    localStorage.setItem("contact", JSON.stringify(contact));
    setIsEditing(false);
  };

  return (
    <div className="my-6 p-4 bg-white rounded-lg shadow relative">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-semibold">Contact Me</h2>
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

      {!isEditing ? (
        <div className="space-y-2">
          <p className="flex items-center gap-2">
            <FaEnvelope className="text-red-500" />
            <a
              href={`mailto:${contact.email}`}
              className="text-blue-600 underline"
            >
              {contact.email}
            </a>
          </p>
          <p className="flex items-center gap-2">
            <FaPhone className="text-green-500" />
            <a
              href={`tel:${contact.phone}`}
              className="text-blue-600 underline"
            >
              {contact.phone}
            </a>
          </p>
          <p className="flex items-center gap-2">
            <FaLinkedin className="text-blue-700" />
            <a
              href={contact.linkedin}
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {contact.linkedin}
            </a>
          </p>
          <p className="flex items-center gap-2">
            <FaGithub className="text-gray-800" />
            <a
              href={contact.github}
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {contact.github}
            </a>
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Email:</label>
            <input
              type="email"
              value={contact.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="border px-2 py-1 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone:</label>
            <input
              type="tel"
              value={contact.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="border px-2 py-1 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">LinkedIn:</label>
            <input
              type="url"
              value={contact.linkedin}
              onChange={(e) => handleChange("linkedin", e.target.value)}
              className="border px-2 py-1 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">GitHub:</label>
            <input
              type="url"
              value={contact.github}
              onChange={(e) => handleChange("github", e.target.value)}
              className="border px-2 py-1 rounded w-full"
            />
          </div>

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
      )}
    </div>
  );
}
