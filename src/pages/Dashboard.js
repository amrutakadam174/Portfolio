import React from "react";
import Header from "../components/Header";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Education from "../components/Education";
import Certifications from "../components/Certifications";
import Achievements from "../components/Achievements";
import Languages from "../components/Languages";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import NavbarMenu from "../components/NavbarMenu"; // ✅ import menu

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Notebook Menu */}
      <NavbarMenu />

      {/* Main Content */}
      <div className="container mx-auto p-4 flex-grow">
        <div id="home"><Header /></div>
        <div id="about"><About /></div>
        <div id="skills"><Skills /></div>
        <div id="projects"><Projects /></div>
        <div id="experience"><Experience /></div>
        <div id="education"><Education /></div>
        <div id="certifications"><Certifications /></div>
        <div id="achievements"><Achievements /></div>
        <div id="languages"><Languages /></div>
        <div id="contact"><Contact /></div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
