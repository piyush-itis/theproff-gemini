'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { apiService, Agent as ApiAgent } from "../../../services/api";

// Fallback agent data for when API is not available
const fallbackAgents: ApiAgent[] = [
  {
    id: "1",
    creator: "user1",
    systemPrompt: "I am a helpful assistant",
    tools: "[]",
    crackTool: "hack",
    prizePool: 2345.67,
    currentEarnings: 0,
    isCracked: false,
    avatarUrl: "/images/lucy.png",
    createdAt: "2025-06-01T00:00:00Z",
    updatedAt: "2025-06-01T00:00:00Z",
    totalAttempts: 28
  }
];

interface Agent {
  id?: string;
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

interface AgentsComponentProps {
  onAgentSelect?: (agent: Agent) => void;
}

export default function AgentsComponent({ onAgentSelect }: AgentsComponentProps) {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("prize-pool");
  const [sortDirection, setSortDirection] = useState("desc"); // "asc" or "desc"
  const [agents, setAgents] = useState<ApiAgent[]>([]);
  const [filteredAgents, setFilteredAgents] = useState<ApiAgent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch agents from API
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);
        const category = searchParams.get('category') as 'latest' | 'biggest' | 'cracked' || 'latest';
        const sortType = category === 'biggest' ? 'biggest' : category === 'cracked' ? 'cracked' : 'latest';
        const data = await apiService.getAgents(sortType, 50);
        setAgents(data);
        setFilteredAgents(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch agents:', err);
        setError('Failed to load agents. Using fallback data.');
        setAgents(fallbackAgents);
        setFilteredAgents(fallbackAgents);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, [searchParams]);

  // Real-time search effect
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredAgents(agents);
    } else {
      const filtered = agents.filter(agent =>
        agent.creator.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAgents(filtered);
    }
  }, [searchTerm, agents]);



  const handleSort = (sortType: string) => {
    // If clicking the same sort type, toggle direction
    if (sortBy === sortType) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(sortType);
      setSortDirection("desc"); // Default to descending for new sort types
    }
  };

  // Apply sorting whenever sortBy or sortDirection changes
  useEffect(() => {
    const sorted = [...agents];
    
    switch (sortBy) {
      case "prize-pool":
        sorted.sort((a, b) => sortDirection === "asc" ? a.prizePool - b.prizePool : b.prizePool - a.prizePool);
        break;
      case "messages":
        sorted.sort((a, b) => sortDirection === "asc" ? (a.totalAttempts || 0) - (b.totalAttempts || 0) : (b.totalAttempts || 0) - (a.totalAttempts || 0));
        break;
      case "age":
        sorted.sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
        });
        break;
      default:
        break;
    }
    
    setFilteredAgents(sorted);
  }, [sortBy, sortDirection, agents]);

  return (
    <div className="w-full text-white">
      {/* Header Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <div className="w-full lg:w-auto py-4 text-center lg:text-left">
            <h1 className="text-2xl font-press-start mb-2">
              All Agents
            </h1>
            <p className="text-gray-400 text-sm">
              Browse and search through all available agents
            </p>
          </div>
        </div>
        
        {/* Search and Controls */}
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-8">
          <div className="w-full lg:flex-1 lg:max-w-md">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/20 border-b-2 border-gray-700 px-4 py-3 pl-10 text-white placeholder-gray-500 focus:outline-none focus:border-[#ff5800] transition-all duration-300 text-sm"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#ff5800] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 hover:text-white transition-colors duration-200"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          <div className="w-full lg:w-auto flex items-center justify-center lg:justify-start gap-3">
            <span className="text-gray-500 text-xs font-medium tracking-wide">SORT</span>
            <div className="flex gap-2">
              {/* Price Button */}
              <button
                onClick={() => handleSort("prize-pool")}
                className={`flex items-center gap-1 px-3 py-2 text-xs font-medium transition-all duration-300 ${
                  sortBy === "prize-pool"
                    ? "text-[#ff5800] border-b-2 border-[#ff5800]"
                    : "text-gray-400 hover:text-white border-b-2 border-transparent hover:border-gray-600"
                }`}
              >
                <span>Price</span>
                {sortBy === "prize-pool" && (
                  <svg className={`w-3 h-3 transition-transform duration-300 ${sortDirection === "asc" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 13l5-5 5 5" />
                  </svg>
                )}
              </button>

              {/* Messages Button */}
              <button
                onClick={() => handleSort("messages")}
                className={`flex items-center gap-1 px-3 py-2 text-xs font-medium transition-all duration-300 ${
                  sortBy === "messages"
                    ? "text-[#ff5800] border-b-2 border-[#ff5800]"
                    : "text-gray-400 hover:text-white border-b-2 border-transparent hover:border-gray-600"
                }`}
              >
                <span>Messages</span>
                {sortBy === "messages" && (
                  <svg className={`w-3 h-3 transition-transform duration-300 ${sortDirection === "asc" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 13l5-5 5 5" />
                  </svg>
                )}
              </button>

              {/* Age Button */}
              <button
                onClick={() => handleSort("age")}
                className={`flex items-center gap-1 px-3 py-2 text-xs font-medium transition-all duration-300 ${
                  sortBy === "age"
                    ? "text-[#ff5800] border-b-2 border-[#ff5800]"
                    : "text-gray-400 hover:text-white border-b-2 border-transparent hover:border-gray-600"
                }`}
              >
                <span>Age</span>
                {sortBy === "age" && (
                  <svg className={`w-3 h-3 transition-transform duration-300 ${sortDirection === "asc" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 13l5-5 5 5" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {error && (
          <div className="text-yellow-400 text-center md:text-left text-sm mb-4">
            {error}
          </div>
        )}
        <div className="text-gray-500 text-center md:text-left text-sm">
          {loading ? 'Loading agents...' : `Showing ${filteredAgents.length} of ${agents.length} agents`}
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
        {loading ? (
          Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="group relative bg-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-800/50 animate-pulse">
              <div className="aspect-square bg-gray-700"></div>
              <div className="p-2 sm:p-4 space-y-2">
                <div className="h-4 bg-gray-700 rounded"></div>
                <div className="h-6 bg-gray-700 rounded w-3/4"></div>
              </div>
            </div>
          ))
        ) : (
          filteredAgents.map((agent) => (
            <div 
              key={agent.id} 
              className="group relative bg-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-800/50 hover:border-[#ff5800]/30 transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => onAgentSelect?.({
                id: agent.id,
                name: agent.creator,
                avatar: agent.avatarUrl || '/images/lucy.png',
                prizePool: `$${agent.prizePool.toLocaleString()}`,
                crackAttempts: agent.totalAttempts || 0,
                messagePrice: '0.0064 SOL',
                timeRemaining: '52d 0h 23m',
                creator: agent.creator,
                creatorAvatar: '/proff.png',
                description: agent.systemPrompt || 'Chat with this agent to try and crack it!'
              })}
            >
              {/* Agent Image */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={agent.avatarUrl || '/images/lucy.png'}
                  alt={agent.creator}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* CRACKED Badge */}
                {agent.isCracked && (
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-black/80 backdrop-blur-sm text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs font-press-start transform rotate-12 border border-white/20">
                    CRACKED
                  </div>
                )}
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Agent Info */}
              <div className="p-2 sm:p-4 space-y-2 sm:space-y-3">
                <div className="space-y-1">
                  <h3 className="text-white font-press-start text-xs sm:text-sm truncate group-hover:text-[#ff5800] transition-colors duration-200">
                    {agent.creator}
                  </h3>
                  <p className="text-white font-bold text-sm sm:text-lg">${agent.prizePool.toLocaleString()}</p>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="text-xs">Created {new Date(agent.createdAt).toLocaleDateString()}</span>
                  <div className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>{agent.totalAttempts || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} // Frontend change 6
// Frontend change 6
