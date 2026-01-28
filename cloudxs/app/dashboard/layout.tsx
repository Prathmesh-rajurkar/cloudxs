import Sidebar from "@/components/Sidebar";
import React from "react";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="md:ml-64">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
