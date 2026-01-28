import { ArrowRight, Cloud } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = ({ isLoggedIn = true }) => {
  const href = isLoggedIn ? "/dashboard" : "/login";

  return (
    <div className="flex items-center justify-between py-4 px-4 md:px-32 border-b border-gray-300 fixed top-0 right-0 w-full bg-white z-50">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Cloud size={40} className="text-green-600 fill-green-600" />
        <h1 className="text-2xl md:text-4xl font-semibold">
          Cloud<span className="text-green-600">XS</span>
        </h1>
      </div>

      {/* Action Button */}
      <Link
        href={href}
        className="flex items-center gap-3 md:bg-green-600 px-3 md:px-4 py-2 rounded-full md:hover:bg-green-700 transition"
      >
        {/* Text hidden on mobile */}
        <span className="hidden md:block text-lg text-white">
          {isLoggedIn ? "Dashboard" : "Login"}
        </span>

        {/* Arrow (always visible) */}
        <div className="bg-green-800 rounded-full p-2 flex items-center justify-center">
          <ArrowRight size={18} className="text-white" />
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
