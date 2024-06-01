"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div>
      <nav className="bg-gradient-to-r p-5 from-blue-500 to-indigo-600 text-white py-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <a
            href="#"
            className="text-2xl font-bold hover:text-gray-300 transition-colors"
          >
            Environment Analyzer: Surrounding Assessment Tool
          </a>
          <div className="hidden md:flex space-x-6">
            <a href="/userlocation" className="hover:text-gray-50 hover:font-bold transition-colors  ">
              Home
            </a>
            <a href="#" className="hover:text-gray-50 hover:font-bold transition-colors">
              About
            </a>
            <a href="#" className="hover:text-gray-50 hover:font-bold transition-colors">
              Services
            </a>
            <a href="#" className="hover:text-gray-50 hover:font-bold transition-colors">
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
              href="/userlocation"
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
        <p>Profile page</p>
        <h2 className="p-1 rounded bg-green-500">
          {data === "nothing" ? (
            "Nothing"
          ) : 
           data
          }
        </h2>
        <hr />
        <button
          onClick={logout}
          className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>

        <button
          onClick={getUserDetails}
          className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          GetUser Details
        </button>
      </div>
    </div>
  );
}
