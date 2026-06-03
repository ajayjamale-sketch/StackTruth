// Analytics.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardPageWrapper from '@/components/layout/DashboardPageWrapper';
import { LayoutDashboard, MessageSquare, GitBranch, Bot, Bookmark, Bell, BarChart3, TrendingUp, Users, Award, ArrowUp, ArrowDown } from 'lucide-react';
import { mockUser } from '@/lib/mockData';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// ------------- Helper functions to generate dynamic data based on period -------------
const getReputationData = (period: string) => {
  // Full yearly data (Jan - Dec)
  const fullYearData = [
    { month: 'Jan', rep: 1200 }, { month: 'Feb', rep: 1580 }, { month: 'Mar', rep: 2100 },
    { month: 'Apr', rep: 2450 }, { month: 'May', rep: 3200 }, { month: 'Jun', rep: 3580 },
    { month: 'Jul', rep: 3900 }, { month: 'Aug', rep: 4200 }, { month: 'Sep', rep: 4480 },
    { month: 'Oct', rep: 4600 }, { month: 'Nov', rep: 4750 }, { month: 'Dec', rep: 4820 },
  ];

  // Daily mock data for last 30 days (for 7D and 30D views)
  const generateDailyRep = (days: number) => {
    const today = new Date();
    return Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() - (days - 1 - i));
      const value = 1200 + Math.floor(Math.random() * 200) + i * 30;
      return { month: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), rep: value };
    });
  };

  switch (period) {
    case '7D':
      return generateDailyRep(7);
    case '30D':
      return generateDailyRep(30);
    case '3M':
      return fullYearData.slice(-3); // Last 3 months
    case '12M':
    default:
      return fullYearData;
  }
};

const getWeeklyData = (period: string) => {
  const fullWeek = [
    { day: 'Mon', questions: 3, answers: 8 }, { day: 'Tue', questions: 1, answers: 12 },
    { day: 'Wed', questions: 4, answers: 6 }, { day: 'Thu', questions: 2, answers: 15 },
    { day: 'Fri', questions: 5, answers: 9 }, { day: 'Sat', questions: 1, answers: 3 },
    { day: 'Sun', questions: 0, answers: 4 },
  ];

  // Generate multi-week data for longer periods
  const generateMultiWeek = (weeks: number) => {
    const data = [];
    for (let w = 0; w < weeks; w++) {
      for (let d = 0; d < fullWeek.length; d++) {
        const dayOffset = w * 7 + d;
        const date = new Date();
        date.setDate(date.getDate() - (weeks * 7 - dayOffset) + 1);
        data.push({
          day: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          questions: Math.floor(Math.random() * 5) + (w === 0 ? fullWeek[d].questions : 2),
          answers: Math.floor(Math.random() * 15) + (w === 0 ? fullWeek[d].answers : 5)
        });
      }
    }
    return data;
  };

  switch (period) {
    case '7D':
      return fullWeek; // single week
    case '30D':
      return generateMultiWeek(4); // ~4 weeks
    case '3M':
      return generateMultiWeek(12); // 12 weeks
    case '12M':
      return generateMultiWeek(52); // 52 weeks (truncated for display)
    default:
      return fullWeek;
  }
};

// KPI data (static but could be made dynamic)
const kpis = [
  { label: 'Reputation', value: '4,820', change: '+240', up: true, icon: Award },
  { label: 'Questions Asked', value: '47', change: '+5', up: true, icon: MessageSquare },
  { label: 'Answers Given', value: '183', change: '+22', up: true, icon: MessageSquare },
  { label: 'Code Reviews', value: '92', change: '+8', up: true, icon: GitBranch },
];

// Static skills data
const skillsData = [
  { skill: 'TypeScript', score: 92 }, { skill: 'Rust', score: 78 }, { skill: 'React', score: 88 },
  { skill: 'PostgreSQL', score: 84 }, { skill: 'Node.js', score: 76 }, { skill: 'Kubernetes', score: 65 },
];

export default function Analytics() {
  useScrollToTop();
  const navigate = useNavigate();
  const [period, setPeriod] = useState('12M');
  const [activeTab, setActiveTab] = useState('analytics');

  // Dynamically computed data based on period
  const reputationData = getReputationData(period);
  const weeklyData = getWeeklyData(period);

  return (
    <DashboardPageWrapper activeTab="overview">
      <ScrollToTop />

      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-primary" /> My Analytics
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Track your developer growth and community impact</p>
          </div>
          <div className="flex gap-2">
            {['7D', '30D', '3M', '12M'].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  period === p ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {kpis.map(kpi => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.label} className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">{kpi.label}</p>
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className={`flex items-center gap-1 text-xs mt-1 ${kpi.up ? 'text-accent' : 'text-destructive'}`}>
                  {kpi.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {kpi.change} this month
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-5 mb-5">
          {/* Reputation Growth */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Reputation Growth</h3>
              <Badge variant="secondary" className="text-xs">
                {period === '7D' ? 'Last 7 days' : period === '30D' ? 'Last 30 days' : period === '3M' ? 'Last 3 months' : 'Year to date'}
              </Badge>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={reputationData}>
                <defs>
                  <linearGradient id="repGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(221 83% 53%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(221 83% 53%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="rep" stroke="hsl(221 83% 53%)" fill="url(#repGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Weekly Contributions */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Contributions</h3>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-primary inline-block" />Questions</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-accent inline-block" />Answers</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                <Bar dataKey="questions" fill="hsl(221 83% 53%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="answers" fill="hsl(142 71% 45%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skills Progress */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold mb-5">Skill Proficiency Scores</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillsData.map(skill => (
              <div key={skill.skill}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium">{skill.skill}</span>
                  <span className="text-sm font-bold text-primary">{skill.score}</span>
                </div>
                <div className="h-2 bg-muted rounded-full">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      skill.score >= 85 ? 'bg-accent' : skill.score >= 70 ? 'bg-primary' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${skill.score}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {skill.score >= 85 ? 'Expert' : skill.score >= 70 ? 'Proficient' : 'Learning'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardPageWrapper>
  );
}