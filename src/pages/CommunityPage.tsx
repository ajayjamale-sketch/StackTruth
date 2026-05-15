import React from "react";
import { Users, MessageSquare, Globe, Heart, Award, Shield } from "lucide-react";
import GenericContentPage from "@/components/templates/GenericContentPage";

export default function CommunityPage() {
  return (
    <GenericContentPage
      title="Community"
      subtitle="Expert Network"
      heroBadge="Collaboration"
      heroDescription="Join a global network of verified engineering experts and architectural auditors."
      sections={[
        {
          title: "Expert Forums",
          description: "High-fidelity technical discussions and peer-reviewed knowledge sharing.",
          icon: <Users className="w-6 h-6" />
        },
        {
          title: "Regional Nodes",
          description: "Localized engineering hubs and community-led technical meetups.",
          icon: <Globe className="w-6 h-6" />
        },
        {
          title: "Open Source Lab",
          description: "Collaborative auditing for global open-source infrastructure projects.",
          icon: <MessageSquare className="w-6 h-6" />
        },
        {
          title: "Mentorship Lab",
          description: "Verified mentorship protocols for developing engineering talent.",
          icon: <Heart className="w-6 h-6" />
        },
        {
          title: "Sovereign Badges",
          description: "Reputation-based recognition and expert-level contribution audits.",
          icon: <Award className="w-6 h-6" />
        },
        {
          title: "Community Trust",
          description: "Governance protocols and community-led quality assurance audits.",
          icon: <Shield className="w-6 h-6" />
        }
      ]}
      ctaTitle="Join the Network"
      ctaDescription="Connect with global experts and contribute to the sovereignty of knowledge."
      ctaButton="Initialize Membership"
      primaryColor="blue-500"
    />
  );
}
