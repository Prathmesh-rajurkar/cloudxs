import { Cloud } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green-600 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-16 py-16">
        
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <Cloud size={36} className="text-white fill-white" />
              <h2 className="text-2xl font-semibold">
                Cloud<span className="opacity-90">XS</span>
              </h2>
            </div>
            <p className="mt-4 text-green-100 text-sm leading-relaxed">
              CloudXS is a developer-first media platform for uploading,
              optimizing, transforming, and delivering images and videos
              globally.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              Product
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-green-100">
              <li className="hover:text-white cursor-pointer">Features</li>
              <li className="hover:text-white cursor-pointer">Pricing</li>
              <li className="hover:text-white cursor-pointer">API Docs</li>
              <li className="hover:text-white cursor-pointer">Changelog</li>
            </ul>
          </div>

          {/* Developers */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              Developers
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-green-100">
              <li className="hover:text-white cursor-pointer">Documentation</li>
              <li className="hover:text-white cursor-pointer">SDKs</li>
              <li className="hover:text-white cursor-pointer">Status</li>
              <li className="hover:text-white cursor-pointer">Security</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              Company
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-green-100">
              <li className="hover:text-white cursor-pointer">About</li>
              <li className="hover:text-white cursor-pointer">Blog</li>
              <li className="hover:text-white cursor-pointer">Careers</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-green-500 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-green-100">
            © {new Date().getFullYear()} CloudXS. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-green-100">
            <span className="hover:text-white cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
