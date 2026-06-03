import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Bell, MessageSquare, Award, Users, GitBranch, CheckCheck } from 'lucide-react';

// Type definitions for better maintainability
type NotificationType = 
  | 'answer'
  | 'upvote'
  | 'review'
  | 'badge'
  | 'mention'
  | 'team'
  | 'reputation';

interface Notification {
  id: string;
  type: NotificationType;
  icon: React.ElementType;
  color: string;
  title: string;
  desc: string;
  time: string;
  read: boolean;
}

const allNotifications: Notification[] = [
  { id: '1', type: 'answer', icon: MessageSquare, color: 'text-blue-600 dark:text-blue-400 bg-blue-500/10', title: 'New answer on your question', desc: 'Priya Nair answered "How to handle concurrent PostgreSQL transactions?"', time: '5m ago', read: false },
  { id: '2', type: 'upvote', icon: Award, color: 'text-yellow-600 dark:text-yellow-400 bg-yellow-500/10', title: 'Your answer received 12 upvotes', desc: 'Your answer about React useEffect cleanup is trending today', time: '1h ago', read: false },
  { id: '3', type: 'review', icon: GitBranch, color: 'text-green-600 dark:text-green-400 bg-green-500/10', title: 'Code review request', desc: 'Marcus Rivera submitted code for peer review — TypeScript auth middleware', time: '2h ago', read: false },
  { id: '4', type: 'badge', icon: Award, color: 'text-purple-600 dark:text-purple-400 bg-purple-500/10', title: 'New badge earned', desc: 'You earned the "Helpful Mentor" badge for guiding 50+ developers!', time: '1d ago', read: false },
  { id: '5', type: 'mention', icon: MessageSquare, color: 'text-pink-600 dark:text-pink-400 bg-pink-500/10', title: 'You were mentioned', desc: '@sarah_c mentioned you in "Best TypeScript patterns for large-scale apps"', time: '1d ago', read: true },
  { id: '6', type: 'team', icon: Users, color: 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10', title: 'Team invite', desc: 'Backend Platform team invited you to join their workspace', time: '2d ago', read: true },
  { id: '7', type: 'reputation', icon: Award, color: 'text-orange-600 dark:text-orange-400 bg-orange-500/10', title: 'Reputation milestone', desc: 'You reached 4,500 reputation! Unlocking new privileges.', time: '3d ago', read: true },
  { id: '8', type: 'answer', icon: MessageSquare, color: 'text-blue-600 dark:text-blue-400 bg-blue-500/10', title: 'Your answer was accepted', desc: 'Diana Patel accepted your answer on CQRS patterns in microservices', time: '4d ago', read: true },
];

export default function Notifications() {
  useScrollToTop();
  const [notifications, setNotifications] = useState<Notification[]>(allNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const markRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id && !n.read ? { ...n, read: true } : n))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = notifications.filter(n => filter === 'all' || !n.read);

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated />
      <ScrollToTop />

      <div className="pt-20 max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Bell className="w-6 h-6 text-primary" aria-hidden="true" />
              Notifications
              {unreadCount > 0 && (
                <Badge className="bg-primary text-white">{unreadCount}</Badge>
              )}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllRead}>
              <CheckCheck className="w-4 h-4 mr-1.5" aria-hidden="true" />
              Mark all read
            </Button>
          )}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-5">
          {(['all', 'unread'] as const).map(f => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${
                filter === f
                  ? 'bg-primary text-white'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
              aria-pressed={filter === f}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Notifications list */}
        <div className="space-y-2">
          {filteredNotifications.map(notification => {
            const Icon = notification.icon;
            const isUnread = !notification.read;

            return (
              <div
                key={notification.id}
                onClick={() => markRead(notification.id)}
                className={`flex gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                  isUnread
                    ? 'bg-primary/5 border-primary/20 hover:bg-primary/8'
                    : 'bg-card border-border hover:bg-muted/30'
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && markRead(notification.id)}
                aria-label={`Notification: ${notification.title}, ${isUnread ? 'unread' : 'read'}`}
              >
                <div className={`w-10 h-10 rounded-xl ${notification.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-medium ${!isUnread ? 'text-muted-foreground' : ''}`}>
                      {notification.title}
                    </p>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {notification.time}
                      </span>
                      {isUnread && (
                        <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" aria-hidden="true" />
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {notification.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredNotifications.length === 0 && (
          <div className="text-center py-16">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-30" aria-hidden="true" />
            <h3 className="font-semibold mb-2">All caught up!</h3>
            <p className="text-muted-foreground text-sm">
              {filter === 'unread' ? "You don't have any unread notifications" : "You don't have any notifications yet"}
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}