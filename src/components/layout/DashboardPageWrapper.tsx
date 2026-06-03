import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { mockUser } from '@/lib/mockData';
import { LayoutDashboard, MessageSquare, GitBranch, Bot, Bookmark, Bell } from 'lucide-react';

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'questions', label: 'My Questions', icon: MessageSquare },
  { id: 'answers', label: 'My Answers', icon: MessageSquare },
  { id: 'reviews', label: 'Code Reviews', icon: GitBranch },
  { id: 'ai', label: 'AI Assistant', icon: Bot },
  { id: 'saved', label: 'Saved', icon: Bookmark },
  { id: 'notifications', label: 'Notifications', icon: Bell, badge: 4 },
];

interface DashboardPageWrapperProps {
  children: React.ReactNode;
  activeTab: string;
}

export default function DashboardPageWrapper({ children, activeTab }: DashboardPageWrapperProps) {
  const navigate = useNavigate();

  const handleSetTab = (tab: string) => {
    navigate('/dashboard', { state: { activeTab: tab } });
  };

  return (
    <DashboardLayout
      user={mockUser}
      navItems={navItems}
      activeTab={activeTab}
      setActiveTab={handleSetTab}
    >
      {children}
    </DashboardLayout>
  );
}
