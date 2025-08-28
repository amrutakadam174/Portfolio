import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { portfolioData } from "../data/portfolioData";
export default function Certifications() {
  const storedCerts =
    JSON.parse(localStorage.getItem("certifications")) || portfolioData.certifications;

  // Normalize old string data into objects
  const normalizeCerts = (certs) =>
    certs.map((c) =>
      typeof c === "string" ? { name: c, platform: "", link: "" } : c
    );

  const [certifications, setCertifications] = useState(normalizeCerts(storedCerts));
  const [newCert, setNewCert] = useState({ name: "", platform: "", link: "" });
  const [isEditing, setIsEditing] = useState(false);

  const saveToLocalStorage = (updatedCerts) => {
    localStorage.setItem("certifications", JSON.stringify(updatedCerts));
  };

  const handleAddCert = () => {
    if (
      newCert.name.trim() &&
      newCert.platform.trim() &&
      newCert.link.trim() &&
      !certifications.some(
        (c) =>
          c.name.toLowerCase() === newCert.name.toLowerCase() &&
          c.platform.toLowerCase() === newCert.platform.toLowerCase()
      )
    ) {
      const updatedCerts = [...certifications, newCert];
      setCertifications(updatedCerts);
      setNewCert({ name: "", platform: "", link: "" });
      saveToLocalStorage(updatedCerts);
    }
  };

  const handleRemoveCert = (certToRemove) => {
    const updatedCerts = certifications.filter((cert) => cert !== certToRemove);
    setCertifications(updatedCerts);
    saveToLocalStorage(updatedCerts);
  };

  return (
    <div className="my-6 p-4 bg-white rounded-lg shadow relative">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-semibold">Certifications</h2>
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

      <ul className="space-y-2">
        {certifications.map((cert, index) => (
          <li key={index} className="relative border p-2 rounded bg-gray-50">
            <p className="font-medium">{cert.name}</p>
            {cert.platform && (
              <p className="text-sm text-gray-600">Platform: {cert.platform}</p>
            )}
            {cert.link && (
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm"
              >
                View Certificate
              </a>
            )}
            {isEditing && (
              <button
                onClick={() => handleRemoveCert(cert)}
                className="absolute right-2 top-2 text-red-500 hover:text-red-700 font-bold"
                title="Remove Certification"
              >
                ×
              </button>
            )}
          </li>
        ))}
      </ul>

      {isEditing && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
          <input
            type="text"
            value={newCert.name}
            onChange={(e) => setNewCert({ ...newCert, name: e.target.value })}
            className="border px-2 py-1 rounded"
            placeholder="Certification Name"
          />
          <input
            type="text"
            value={newCert.platform}
            onChange={(e) => setNewCert({ ...newCert, platform: e.target.value })}
            className="border px-2 py-1 rounded"
            placeholder="Platform (e.g., Coursera)"
          />
          <input
            type="text"
            value={newCert.link}
            onChange={(e) => setNewCert({ ...newCert, link: e.target.value })}
            className="border px-2 py-1 rounded"
            placeholder="Drive/Certificate Link"
          />
          <div className="flex gap-2 col-span-1 md:col-span-3">
            <button
              onClick={handleAddCert}
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
