"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = ["home", "about", "skills", "projects", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.6 },
    );

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className={`z-100 relative transition-transform duration-300`}>
      <div className="relative max-w-7xl mx-auto py-4 px-4 sm:px-6 flex items-center justify-between">
        <a
          href="/"
          className={`text-2xl sm:text-xl lg:text-2xl duration-300 font-semibold text-gray-100 ${isOpen === true ? "opacity-0" : "opacity-100"}`}
        >
          Portfolio
        </a>

        <div
          onClick={() => setIsOpen(true)}
          className={`relative z-100 lg:hidden duration-300 md:hidden px-1 py-1 bg-white/10 rounded-md flex items-center ${isOpen === true ? "opacity-0" : "opacity-100"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="35px"
            viewBox="0 -960 960 960"
            width="40px"
            fill="#FFFFFF"
          >
            <path d="M120-240v-66.67h720V-240H120Zm0-206.67v-66.66h720v66.66H120Zm0-206.66V-720h720v66.67H120Z" />
          </svg>
        </div>

        <div className="hidden md:flex items-center space-x-3 sm:space-x-6 ">
          <p
            className={`cursor-pointer hover:border-b-2 ${active === "home" ? "border-b-2" : ""}`}
          >
            <a href="#home">HOME</a>
          </p>

          <p
            className={`cursor-pointer hover:border-b-2 ${active === "about" ? "border-b-2 " : ""}`}
          >
            <a href="#about">ABOUT</a>
          </p>

          <p
            className={`cursor-pointer hover:border-b-2 ${active === "skills" ? "border-b-2  " : ""}`}
          >
            <a href="#skills">SKILLS</a>
          </p>

          <p
            className={`cursor-pointer hover:border-b-2 ${active === "projects" ? "border-b-2  " : ""}`}
          >
            <a href="#projects">PROJECTS</a>
          </p>

          <p
            className={`cursor-pointer hover:border-b-2 ${active === "contact" ? "border-b-2 " : ""}`}
          >
            <a href="#contact">CONTACT</a>
          </p>
          <button className="bg-linear-90 from-blue-500 to-purple-700 hover:from-purple-700 hover:to-blue-500 border border-purple-700 rounded-md py-1 px-3 cursor-pointer text-transparent bg-clip-text font-semibold">
            Contact Me
          </button>
        </div>
      </div>

      <div
        className={`absolute top-5 z-50 mt-1 left-0 backdrop-blur-md right-0 mx-5 px-4 transform origin-top transition-all duration-300 ease-in-out bg-white/20 lg:hidden md:hidden py-5 flex flex-col divide-y divide-white/30 rounded-md ${isOpen === true ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
      >
        <div className="flex justify-between items-center pb-4">
          <p className="text-2xl sm:text-xl lg:text-2xl font-semibold text-gray-100">
            ALBERT
          </p>
          <div
            onClick={() => setIsOpen(false)}
            className="px-0.5 py-0.5 bg-white/10 border border-purple-700 rounded-md flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="35px"
              viewBox="0 -960 960 960"
              width="40px"
              fill="#FFFFFF"
            >
              <path d="m251.33-204.67-46.66-46.66L433.33-480 204.67-708.67l46.66-46.66L480-526.67l228.67-228.66 46.66 46.66L526.67-480l228.66 228.67-46.66 46.66L480-433.33 251.33-204.67Z" />
            </svg>
          </div>
        </div>

        <p
          className={`py-3 font-semibold w-full text-center ${active === "home" ? "underline" : ""}`}
        >
          <a href="#home">HOME</a>
        </p>
        <p
          className={`py-3 font-semibold w-full text-center ${active === "about" ? "underline" : ""}`}
        >
          <a href="#about">ABOUT</a>
        </p>
        <p
          className={`py-3 font-semibold w-full text-center ${active === "skills" ? "underline" : ""}`}
        >
          <a href="#skills">SKILLS</a>
        </p>
        <p
          className={`py-3 font-semibold w-full text-center ${active === "projects" ? "underline" : ""}`}
        >
          <a href="#projects">PROJECTS</a>
        </p>
        <p
          className={`py-3 font-semibold w-full text-center ${active === "contact" ? "underline" : ""}`}
        >
          <a href="#contact">CONTACT</a>
        </p>
      </div>
    </header>
  );
};

export default Header;
