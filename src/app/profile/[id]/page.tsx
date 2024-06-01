"use client";
import React, { useState } from "react";

export default function UserProfile({ params }: any) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav className="bg-gradient-to-r p-5s from-blue-500 to-indigo-600 text-white py-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <a
            href="#"
            className="text-2xl font-bold hover:text-gray-300 transition-colors"
          >
            BrandName
          </a>
          <div className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-gray-300 transition-colors">
              Home
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              About
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Services
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Contact
            </a>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none focus:text-gray-300"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"
                />
              </svg>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden bg-blue-500">
            <a
              href="#"
              className="block px-4 py-2 hover:bg-blue-600 transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-blue-600 transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-blue-600 transition-colors"
            >
              Services
            </a>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-blue-600 transition-colors"
            >
              Contact
            </a>
          </div>
        )}
      </nav>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Profile</h1>
        <hr />
        <p className="text-4xl">
          Profile page
          <span className=" p-2 ml-2 rounded bg-orange-500 text-black">
            {params.id}
          </span>
        </p>
      </div>
    </div>
  );
}
