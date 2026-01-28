import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Dotted background */}
      <div
        className="
      absolute inset-0
      bg-[radial-gradient(#16a34a_1px,transparent_1px)]
      bg-size-[16px_16px]
      opacity-40
      mask-[radial-gradient(circle,black_40%,transparent_70%)]
    "
      />

      {/* Content */}
      <div className="relative max-w-3xl mx-auto z-10 text-center flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
          Image & Video API with Transformation on Go
        </h1>
        <p className="text-sm md:text-xl mb-5">
          CloudXS helps you upload, optimize, transform, store, and deliver
          media globally so developers ship faster, teams move independently,
          and users get lightning-fast visuals everywhere.
        </p>

        <div className="flex gap-4">
          <Link
            href="/signup"
            className="mt-8 bg-green-600 text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-green-700 transition"
          >
            Get Started
          </Link>
          <Link
            href="/docs"
            className="mt-8 bg-white text-green-600 border px-6 py-3 rounded-xl text-lg font-medium hover:bg-gray-200 transition"
          >
            See How
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
