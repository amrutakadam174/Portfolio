import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4 text-center mt-8">
      <p>© {new Date().getFullYear()} My Portfolio. All Rights Reserved.</p>
    </footer>
  );
}
