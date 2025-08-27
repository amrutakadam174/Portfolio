import React from "react";
import { portfolioData } from "../data/portfolioData";

export default function Dashboard() {
  const { name, role, about, contact } = portfolioData;

  return (
    <div className="p-6">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-6">
        <img
          src="/AMRU.jpg" // ✅ Use your actual image
          alt="Profile"
          className="w-28 h-28 rounded-full border-2 border-gray-300 object-cover"
        />
        <h1 className="mt-4 text-2xl font-bold">{name}</h1>
        <p className="text-gray-600">{role}</p>
      </div>

      {/* About Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">About Me</h2>
        <p className="text-gray-700">{about}</p>
      </div>

      {/* Contact Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Contact</h2>
        <p>Email: {contact.email}</p>
        <p>Phone: {contact.phone}</p>
        <p>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            LinkedIn
          </a>
        </p>
        <p>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            GitHub
          </a>
        </p>
      </div>
    </div>
  );
}
