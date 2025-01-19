"use client";
{/*import { GlobeAltIcon } from '@heroicons/react/24/outline';*/}
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="w-full z-10 mt-7">
      <nav className="container mx-auto px-4 py-5 bg-opacity-80 bg-gray-900 rounded-xl shadow-2xl flex justify-between items-center backdrop-blur-md mb-12">
        {/* Left Section: Company Name */}
        <div className="flex items-center space-x-16"> {/* Increased spacing to space-x-16 */}
          <p className="text-3xl font-extrabold text-white hover:text-blue-400 transition duration-300">
            FurniShare
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex w-full justify-between">
          
          {/* Left Aligned: Home (centered within left third) */}
          <div className="flex-1 flex justify-center">
            <Link href="/dashboard" className="text-2xl font-bold text-white hover:text-blue-400 transition duration-300">
              Home
            </Link>
          </div>

          {/* Center Aligned: Donate */}
          <div className="flex-1 flex justify-center">
            <Link href="/dashboard/donate" className="text-2xl font-bold text-white hover:text-blue-400 transition duration-300">
              Donate
            </Link>
          </div>

          {/* Right Aligned: Collect (centered within right third) */}
          <div className="flex-1 flex justify-center">
            <Link href="/dashboard/collect" className="text-2xl font-bold text-white hover:text-blue-400 transition duration-300">
              Collect
            </Link>
          </div>
        </div>

        {/* Right Section: Avatar with Dropdown */}
        <div className="relative ml-4">
          {/* Avatar Image */}
          <img
            src="/avatar-placeholder.png" // Replace with your avatar image path
            alt="User Avatar"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown
          />

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg">
              <Link href="/dashboard/Profile" className="block px-4 py-2 hover:bg-gray-700 rounded-t-lg">
                Profile
              </Link>
              <Link href="/">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded-b-lg"
              >
                Logout
              </button>
            </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
