import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import AIAssistant from "@/components/features/AIAssistant";

export default function AuthLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 flex flex-col transition-all duration-300 lg:ml-80">
          <div className="flex-1 max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 py-10 w-full">
            <Outlet />
          </div>
        </main>
      </div>
      
      <AIAssistant />
    </div>
  );
}
