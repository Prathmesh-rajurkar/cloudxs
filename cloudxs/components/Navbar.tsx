"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = ({
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) => {
  const href = isLoggedIn ? "/dashboard" : "/login";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-emerald-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <Image
            src="/cloudxs.svg"
            width={32}
            height={32}
            alt="CloudXS Logo"
            className="rounded"
          />
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Cloud
            <span className="text-emerald-600">XS</span>
          </h1>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <a
            href="#features"
            className="hover:text-gray-900 transition-colors"
          >
            Features
          </a>
          <a
            href="#workflow"
            className="hover:text-gray-900 transition-colors"
          >
            Workflow
          </a>
          <a
            href="#developer"
            className="hover:text-gray-900 transition-colors"
          >
            Developer
          </a>
        </nav>

        <Link
          href={href}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-3 sm:px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
        >
          <span className="hidden sm:inline">
            {isLoggedIn
              ? "Open Dashboard"
              : "Login"}
          </span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
