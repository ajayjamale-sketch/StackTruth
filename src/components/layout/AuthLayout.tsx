import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import AIAssistant from "@/components/features/AIAssistant";
import { useSidebar } from "@/contexts/SidebarContext";

export default function AuthLayout() {
  const { sidebarOpen, setSidebarOpen, isCollapsed, setIsCollapsed } = useSidebar();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col">
      <Navbar minimal onMenuClick={() => setSidebarOpen(true)} />
      
      <div className="flex flex-1">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
        
        <main className={`flex-1 flex flex-col transition-all duration-500 ${isCollapsed ? 'lg:ml-20' : 'lg:ml-80'}`}>
          <div className="flex-1 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-10 w-full relative">
            {/* Mobile Sidebar Toggle (Visible ONLY when Navbar is hidden on admin pages) */}
            {(location.pathname.startsWith("/admin") || location.pathname.startsWith("/dashboard/admin")) && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden fixed top-6 left-6 w-12 h-12 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl flex items-center justify-center shadow-xl z-[60] active:scale-95 transition-all"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}
            <Outlet />
          </div>
        </main>
      </div>
      
      <AIAssistant />
    </div>
  );
}
