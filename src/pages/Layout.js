// src/components/Layout.js
import React from "react";
import { Outlet } from "react-router-dom";
import NavbarMenu from "../components/NavbarMenu";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Navbar / Notebook Menu */}
      <NavbarMenu />

      {/* Main Page Content */}
      <div className="flex-grow container mx-auto p-4">
        <Outlet /> {/* Renders the page like Dashboard */}
      </div>
    </div>
  );
}
