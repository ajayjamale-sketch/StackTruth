import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface SidebarContextType {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem("stacktruth_sidebar_collapsed");
    return saved ? JSON.parse(saved) : false;
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("stacktruth_sidebar_collapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed, sidebarOpen, setSidebarOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
