import { useState } from 'react';
import { Bell, MessageSquare, Award, Users, GitBranch, CheckCheck } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

type NotificationType = 'answer' | 'upvote' | 'review' | 'badge' | 'mention' | 'team' | 'reputation';

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
];

export default function NotificationPopup({ className }: { className?: string }) {
  const [notifications, setNotifications] = useState<Notification[]>(allNotifications);
  
  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id && !n.read ? { ...n, read: true } : n)));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className={`w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors relative ${className}`}>
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end" sideOffset={8}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-sm">Notifications</h4>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">{unreadCount}</Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-muted-foreground hover:text-primary" onClick={markAllRead}>
              <CheckCheck className="w-3.5 h-3.5 mr-1" /> Mark all read
            </Button>
          )}
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length > 0 ? (
            <div className="divide-y divide-border">
              {notifications.map(n => {
                const Icon = n.icon;
                return (
                  <div 
                    key={n.id} 
                    className={`flex items-start gap-3 p-3 cursor-pointer hover:bg-muted/50 transition-colors ${!n.read ? 'bg-primary/5' : ''}`}
                    onClick={() => markRead(n.id)}
                  >
                    <div className={`w-8 h-8 rounded-lg ${n.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${!n.read ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>{n.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{n.desc}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
                    </div>
                    {!n.read && (
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-6 text-center">
              <p className="text-sm text-muted-foreground">No notifications</p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
