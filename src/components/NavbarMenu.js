import React, { useState } from "react";
import { Notebook } from "lucide-react";
import { Link } from "react-router-dom";

export default function NavbarMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-4 right-6 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 bg-white text-black rounded-full shadow hover:bg-gray-200"
      >
        <Notebook size={24} />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-xl p-4 z-50">
          <ul className="flex flex-col space-y-3 text-gray-800 font-semibold uppercase">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li><Link to="/about" className="hover:text-blue-600">About Me</Link></li>
            <li><Link to="/skills" className="hover:text-blue-600">Skills</Link></li>
            <li><Link to="/projects" className="hover:text-blue-600">Projects</Link></li>
            <li><Link to="/achievements" className="hover:text-blue-600">Achievements</Link></li>
            <li><Link to="/experience" className="hover:text-blue-600">Experience / Volunteering</Link></li>
            <li><Link to="/education" className="hover:text-blue-600">Education</Link></li>
            <li><Link to="/certifications" className="hover:text-blue-600">Certifications</Link></li>
            <li><Link to="/languages" className="hover:text-blue-600">Languages</Link></li>
            <li><Link to="/contact" className="hover:text-blue-600">Contact</Link></li>
            <li><Link to="/login" className="hover:text-blue-600">Login</Link></li>
            <li><Link to="/register" className="hover:text-blue-600">Register</Link></li>
          </ul>
        </div>
      )}
    </div>
  );
}
