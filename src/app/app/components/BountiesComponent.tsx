'use client';

import BountiesPage from "../../Bounties";

interface Agent {
  name: string;
  avatar: string;
  prizePool: string;
  crackAttempts: number;
  messagePrice: string;
  timeRemaining: string;
  creator: string;
  creatorAvatar: string;
  description: string;
}

interface BountiesComponentProps {
  onAgentSelect?: (agent: Agent) => void;
}

export default function BountiesComponent({ onAgentSelect }: BountiesComponentProps) {
  return (
    <div className="h-full bg-black overflow-auto">
      <BountiesPage onAgentSelect={onAgentSelect} />
    </div>
  );
} 