"use client";

import Image from "next/image";
import { useState } from "react";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="relative z-10 shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
      <div className="relative max-w-7xl mx-auto py-4 px-4 sm:px-6 flex items-center justify-between">
        {!isOpen && (
          <h1 className="text-2xl sm:text-xl lg:text-2xl font-semibold text-gray-100">
            Portfolio
          </h1>
        )}
        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="lg:hidden md:hidden px-1 py-1 bg-white/10 rounded-md flex items-center"
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
        )}
        <div className="lg:flex hidden sm:hidden md:flex items-center space-x-3 sm:space-x-6 ">
          <p className="cursor-pointer"> HOME </p>
          <p> ABOUT </p>
          <p> SKILLS </p>
          <p> PROJECTS </p>
          <p> CONTACT </p>
        </div>
      </div>

      <div
        className={`absolute top-4 left-0 right-0 mx-5 px-4 transform transition-all duration-300 ease-in-out bg-white/20 lg:hidden md:hidden py-5 flex flex-col divide-y divide-white/30 rounded-md ${isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
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
        <p className="py-3 font-semibold w-full text-center">HOME</p>
        <p className="py-3 font-semibold w-full text-center">ABOUT</p>
        <p className="py-3 font-semibold w-full text-center">SKILLS</p>
        <p className="py-3 font-semibold w-full text-center">PROJECTS</p>
        <p className="py-3 font-semibold w-full text-center">CONTACT</p>
      </div>
    </header>
  );
};

export default Header;
