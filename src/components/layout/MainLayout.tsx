import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import AIAssistant from "@/components/features/AIAssistant";
import { useAuth } from "@/contexts/AuthContext";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background mesh-bg">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex">
        {isAuthenticated && (
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}
        <main
          className={`flex-1 min-h-[calc(100vh-64px)] transition-all duration-300 ${
            isAuthenticated ? "lg:ml-64" : ""
          }`}
        >
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
            <Outlet />
          </div>
        </main>
      </div>
      {isAuthenticated && <AIAssistant />}
    </div>
  );
}
