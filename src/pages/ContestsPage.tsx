import React from "react";
import { Trophy, Clock, Zap, Target, Users, Award } from "lucide-react";
import GenericContentPage from "@/components/templates/GenericContentPage";

export default function ContestsPage() {
  return (
    <GenericContentPage
      title="Contests"
      subtitle="Competitive Lab"
      heroBadge="Live Challenges"
      heroDescription="High-frequency technical competitions and real-time algorithmic audit protocols."
      sections={[
        {
          title: "Weekly Sprints",
          description: "Rapid-fire algorithmic challenges every Sunday at 08:00 UTC.",
          icon: <Trophy className="w-6 h-6" />
        },
        {
          title: "Architecture Sprints",
          description: "24-hour system design challenges for senior engineering architects.",
          icon: <Clock className="w-6 h-6" />
        },
        {
          title: "Blitz Protocols",
          description: "15-minute high-speed logic and debugging audit competitions.",
          icon: <Zap className="w-6 h-6" />
        },
        {
          title: "Global Ranking",
          description: "Real-time leaderboard synchronization and competitive tier audits.",
          icon: <Target className="w-6 h-6" />
        },
        {
          title: "Team Scrimmages",
          description: "Collaborative team-based competitions for agency and corporate labs.",
          icon: <Users className="w-6 h-6" />
        },
        {
          title: "Prize Bounties",
          description: "Verified bounties and professional reputation multipliers for winners.",
          icon: <Award className="w-6 h-6" />
        }
      ]}
      ctaTitle="Join Next Contest"
      ctaDescription="Register for the upcoming global technical audit and prove your expertise."
      ctaButton="Register Now"
      primaryColor="amber-500"
    />
  );
}
