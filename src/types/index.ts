export type UserRole = "developer" | "expert" | "recruiter" | "admin";
export type ThemeMode = "dark" | "light";

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar: string;
  role: UserRole;
  reputation: number;
  badges: Badge[];
  skills: string[];
  bio: string;
  location: string;
  website: string;
  github: string;
  twitter: string;
  joinedAt: string;
  isVerified: boolean;
  streak: number;
  company?: string;
  title: string;
  followers: number;
  following: number;
  contributions: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earnedAt: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export interface Question {
  id: string;
  title: string;
  body: string;
  author: User;
  tags: string[];
  votes: number;
  answers: number;
  views: number;
  createdAt: string;
  isAnswered: boolean;
  isFeatured: boolean;
  bounty?: number;
  acceptedAnswerId?: string;
}

export interface Answer {
  id: string;
  questionId: string;
  body: string;
  author: User;
  votes: number;
  isAccepted: boolean;
  createdAt: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  body: string;
  author: User;
  createdAt: string;
  votes: number;
}

export interface CodeReview {
  id: string;
  title: string;
  description: string;
  author: User;
  language: string;
  code: string;
  score: number;
  status: "pending" | "reviewed" | "approved" | "needs-work";
  issues: CodeIssue[];
  suggestions: string[];
  reviewedBy?: User;
  createdAt: string;
  tags: string[];
}

export interface CodeIssue {
  id: string;
  type: "error" | "warning" | "info" | "security";
  line: number;
  message: string;
  suggestion: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "freelance" | "remote";
  salary: string;
  description: string;
  requirements: string[];
  skills: string[];
  postedAt: string;
  deadline: string;
  applicants: number;
  isRemote: boolean;
  isFeatured: boolean;
  experienceLevel: "junior" | "mid" | "senior" | "lead";
  recruiter: User;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: User;
  tags: string[];
  category: string;
  readTime: number;
  likes: number;
  views: number;
  comments: number;
  publishedAt: string;
  isFeatured: boolean;
  coverImage: string;
}

export interface Notification {
  id: string;
  type: "mention" | "answer" | "vote" | "badge" | "follow" | "job" | "review" | "system";
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  link?: string;
  actor?: User;
}

export interface TeamChannel {
  id: string;
  name: string;
  description: string;
  members: User[];
  messages: TeamMessage[];
  isPrivate: boolean;
  createdAt: string;
}

export interface TeamMessage {
  id: string;
  author: User;
  content: string;
  type: "text" | "code" | "file";
  createdAt: string;
  reactions: Record<string, number>;
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  score: number;
  change: number;
  answers: number;
  questions: number;
  codeReviews: number;
}

export interface AnalyticsData {
  contributions: { date: string; count: number }[];
  skillGrowth: { skill: string; level: number; growth: number }[];
  engagement: { week: string; views: number; votes: number; answers: number }[];
  topTags: { tag: string; count: number; color: string }[];
}

export interface AIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  codeBlock?: string;
}
