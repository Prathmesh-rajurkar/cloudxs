"use client";

import { getUser, logout } from "@/utils/auth";
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
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

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
  const [user, setUser] = useState<{
  username?: string;
  email?: string;
} | null>(null);

useEffect(() => {
  const u = getUser();

  if (u) {
    setUser({
      username: u.username ?? undefined,
      email: u.email ?? undefined,
    });
  }
}, []);


  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-green-600 text-white p-2 rounded-lg"
      >
        <Menu size={20} />
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-black text-white z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Cloud size={30} className="text-green-500 fill-green-500" />
            <h1 className="text-2xl font-semibold">
              Cloud<span className="text-green-500">XS</span>
            </h1>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-white/70 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 text-sm space-y-1 overflow-y-auto scrollbar-hide">
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

        {/* User Section */}
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            {/* FULL PERFECT CIRCLE */}
            <div className="w-10 h-10 min-w-[40px] rounded-full bg-green-500 flex items-center justify-center font-semibold text-black">
              {user?.username?.[0]?.toUpperCase() ?? "U"}
            </div>

            {/* Scrollable Username + Email */}
            <div className="flex-1 text-xs overflow-x-auto scrollbar-hide whitespace-nowrap">
              <p className="font-medium truncate">{user?.username}</p>
              <p className="text-white/50 truncate">{user?.email}</p>
            </div>

            <LogOut
              size={16}
              className="text-white/60 hover:text-white cursor-pointer"
              onClick={() => logout()}
            />
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
