import { ArrowRight, Cloud } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = ({ isLoggedIn = true }) => {
  return (
    <div className="flex items-center justify-between py-4 px-4 md:px-32 border-b border-gray-300 fixed top-0 right-0 w-full bg-white z-50">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Cloud size={48} className="text-green-600 fill-green-600" />
        <h1 className="text-4xl font-semibold">
          Cloud<span className="text-green-600">XS</span>
        </h1>
      </div>

      {/* Right Action */}
      {isLoggedIn ? (
        <Link href="/dashboard" className="flex items-center gap-3 bg-green-600 px-4 py-2 rounded-full cursor-pointer hover:bg-green-700 transition">
          <div>
            <p className="text-lg text-white">Dashboard</p>
          </div>

          {/* Proper Arrow Circle */}
          <div className="bg-green-800 rounded-full p-2 flex items-center justify-center">
            <ArrowRight size={18} className="text-white" />
          </div>
        </Link>
      ) : (
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-lg text-gray-700 hover:text-gray-900 transition">
            Login
          </Link>
          <Link href="/signup" className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition">
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
