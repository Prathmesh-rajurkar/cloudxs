"use client";

import {
  Home,
  BarChart3,
  Image,
  Link2,
  Settings,
  Code2,
  Cloud,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode, useState } from "react";

/* ---------- Types ---------- */

type SidebarItemProps = {
  icon: ReactNode;
  label: string;
  href: string;
  active: boolean;
};

type SectionProps = {
  title: string;
};

/* ---------- Sidebar ---------- */

const Sidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-green-600 text-white p-2 rounded-lg"
      >
        <Menu size={20} />
      </button>

      {/* Backdrop (mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-[#0b1b2b] text-white z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Cloud size={32} className="text-green-600 fill-green-600" />
            <h1 className="text-2xl font-semibold">
              Cloud<span className="text-green-600">XS</span>
            </h1>
          </div>

          {/* Close (mobile) */}
          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-white/70 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 text-sm space-y-1 overflow-y-auto mt-10">
          <SidebarItem
            icon={<Home size={18} />}
            label="Get Started"
            href="/dashboard"
            active={pathname === "/dashboard"}
          />
          <SidebarItem
            icon={<BarChart3 size={18} />}
            label="Usage Analytics"
            href="/dashboard/analytics"
            active={pathname.startsWith("/dashboard/analytics")}
          />

          <Divider />

          <Section title="DIGITAL ASSET MANAGEMENT" />
          <SidebarItem
            icon={<Image size={18} />}
            label="Media Library"
            href="/dashboard/media"
            active={pathname.startsWith("/dashboard/media")}
          />

          <Divider />

          <Section title="PLATFORM" />
          <SidebarItem
            icon={<Link2 size={18} />}
            label="URL Endpoints"
            href="/dashboard/endpoints"
            active={pathname.startsWith("/dashboard/endpoints")}
          />
          <SidebarItem
            icon={<Settings size={18} />}
            label="Developer Options"
            href="/dashboard/settings"
            active={pathname.startsWith("/dashboard/settings")}
          />
          <SidebarItem
            icon={<Code2 size={18} />}
            label="APIs"
            href="/dashboard/apis"
            active={pathname.startsWith("/dashboard/apis")}
          />
        </nav>

        {/* User */}
        <div className="fixed px-4 py-4 border-t border-white/10 bottom-0 w-full">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center font-semibold">
              PR
            </div>
            <div className="text-xs">
              <p className="font-medium">Prathmesh Rajurkar</p>
              <p className="text-white/60">Developer</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

/* ---------- Helpers ---------- */

const SidebarItem = ({ icon, label, href, active }: SidebarItemProps) => (
  <Link
    href={href}
    className={`
      flex items-center gap-3 px-3 py-2 rounded-lg transition
      ${
        active
          ? "bg-green-600/20 text-white"
          : "text-white/70 hover:bg-white/10 hover:text-white"
      }
    `}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

const Section = ({ title }: SectionProps) => (
  <p className="px-3 mt-4 mb-2 text-[10px] tracking-widest text-white/40 font-semibold">
    {title}
  </p>
);

const Divider = () => <div className="my-3 h-px bg-white/10" />;
