'use client';

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { apiService, Agent as ApiAgent } from "../services/api";

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

interface BountiesProps {
  onAgentSelect?: (agent: Agent) => void;
}

export default function Bounties({ onAgentSelect }: BountiesProps) {
  const biggestScrollRef = useRef<HTMLDivElement>(null);
  const latestScrollRef = useRef<HTMLDivElement>(null);
  const crackedScrollRef = useRef<HTMLDivElement>(null);
  
  const [biggestAgents, setBiggestAgents] = useState<ApiAgent[]>([]);
  const [latestAgents, setLatestAgents] = useState<ApiAgent[]>([]);
  const [crackedAgents, setCrackedAgents] = useState<ApiAgent[]>([]);
  const [topAgent, setTopAgent] = useState<ApiAgent | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch agents from API
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);
        const [biggest, latest, cracked] = await Promise.all([
          apiService.getAgents('biggest', 10),
          apiService.getAgents('latest', 10),
          apiService.getAgents('cracked', 10)
        ]);
        
        setBiggestAgents(biggest);
        setLatestAgents(latest);
        setCrackedAgents(cracked);
        
        // Set top agent (first from biggest or latest)
        if (biggest.length > 0) {
          setTopAgent(biggest[0]);
        } else if (latest.length > 0) {
          setTopAgent(latest[0]);
        }
      } catch (err) {
        console.error('Failed to fetch agents:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const scrollLeft = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };
  return (
    <section id="bounties" className="w-full min-h-[600px] bg-black flex flex-col items-center py-4 px-4 overflow-hidden">
      <h2 className="text-white text-2xl font-press-start mb-10">Bounties</h2>
      {/* Single horizontal card with video background */}
      <div className="w-full max-w-6xl h-auto sm:h-[350px] bg-[#18181b] rounded-2xl shadow-xl flex flex-col sm:flex-row items-center p-4 sm:p-8 gap-4 sm:gap-8 border border-[#232323] relative overflow-hidden mb-16">
        {/* Video Background */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src="/videos/bounty-main-card.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        
        {/* Agent Avatar */}
        <div className="flex-shrink-0 relative z-10 flex flex-col items-center">
          <div className="text-[#ff5800] font-press-start text-xs sm:text-xm mb-3 sm:mb-6 bg-black/20 rounded-xl px-2 sm:px-3 py-1">
            {topAgent ? 'Top Live Agent' : 'No Agents Yet'}
          </div>
          <div className="w-[120px] h-[120px] sm:w-[240px] sm:h-[240px] rounded-xl shadow-lg overflow-hidden">
            {topAgent ? (
              <Image 
                src={topAgent.avatarUrl || '/images/lucy.png'} 
                alt={topAgent.creator} 
                width={240} 
                height={240} 
                className="object-cover w-full h-full" 
              />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <span className="text-white/40 text-xs">No agent</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Agent Details with Overlay */}
        <div className="flex-1 flex flex-col items-center sm:items-end relative z-10 w-full sm:w-auto">
          {topAgent ? (
            <div className="text-center sm:text-right bg-black/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 w-full sm:w-auto">
              <h3 className="text-2xl sm:text-4xl font-press-start text-[#ff5800] mb-3 sm:mb-4 tracking-wide">{topAgent.creator}</h3>
              <div className="text-white mb-4 sm:mb-6 space-y-2 sm:space-y-3">
                <div className="flex items-center justify-center sm:justify-end gap-2 sm:gap-3">
                  <span className="text-[#ff5800] font-press-start text-xs sm:text-sm">PRICE</span>
                  <span className="text-lg sm:text-2xl font-montserrat font-bold">${topAgent.prizePool.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-center sm:justify-end gap-2 sm:gap-3">
                  <span className="text-[#ff5800] font-press-start text-xs sm:text-sm">BUILDER</span>
                  <span className="text-sm sm:text-lg font-montserrat font-medium">{topAgent.creator}</span>
                </div>
                <div className="flex items-center justify-center sm:justify-end gap-2 sm:gap-3">
                  <span className="text-[#ff5800] font-press-start text-xs sm:text-sm">ATTEMPTS</span>
                  <span className="text-sm sm:text-lg font-montserrat font-medium">{topAgent.totalAttempts || 0}</span>
                </div>
              </div>
              <button 
                onClick={() => onAgentSelect?.({
                  id: topAgent.id,
                  name: topAgent.creator,
                  avatar: topAgent.avatarUrl || '/images/lucy.png',
                  prizePool: `$${topAgent.prizePool.toLocaleString()}`,
                  crackAttempts: topAgent.totalAttempts || 0,
                  messagePrice: '0.0064 SOL',
                  timeRemaining: '52d 0h 23m',
                  creator: topAgent.creator,
                  creatorAvatar: '/proff.png',
                  description: topAgent.systemPrompt || 'Chat with this agent to try and crack it!'
                })}
                className="font-press-start text-[#ff5800] hover:text-white px-6 sm:px-8 py-3 sm:py-4 transition-all duration-300 text-xs sm:text-sm relative overflow-hidden group border border-[#ff5800]/30 hover:border-[#ff5800] hover:shadow-[0_0_20px_rgba(255,88,0,0.3)]"
              >
                <span className="relative z-10 tracking-wider group-hover:scale-105 transition-transform duration-300">View Bounty</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff5800]/10 via-[#ff5800]/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-[#ff5800] to-[#ff8c00] transition-all duration-300"></div>
              </button>
            </div>
          ) : (
            <div className="text-center sm:text-right bg-black/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 w-full sm:w-auto">
              <p className="text-white/60 text-sm">Create your first agent to see it here!</p>
            </div>
          )}
        </div>
      </div>

      {/* Scrollable Categories */}
      <div className="w-full max-w-6xl space-y-12">
        {/* Biggest Category */}
        <div className="relative">
          <h3 className="text-[#ff5800] text-2xl font-press-start mb-6">Biggest</h3>
          {/* Desktop Scroll Buttons */}
          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 -left-10 z-10">
            <button
              onClick={() => scrollLeft(biggestScrollRef)}
              className="w-8 h-8 bg-black/40 hover:bg-black/60 text-[#ff5800] hover:text-white rounded-full flex items-center justify-center transition-all duration-300 group border border-[#ff5800]/20 hover:border-[#ff5800]/40"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 -right-10 z-10">
            <button
              onClick={() => scrollRight(biggestScrollRef)}
              className="w-8 h-8 bg-black/40 hover:bg-black/60 text-[#ff5800] hover:text-white rounded-full flex items-center justify-center transition-all duration-300 group border border-[#ff5800]/20 hover:border-[#ff5800]/40"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div ref={biggestScrollRef} className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {loading ? (
              <div className="flex-shrink-0 w-64 sm:w-80 h-48 sm:h-64 bg-white/5 backdrop-blur-sm border border-gray-800/30 flex items-center justify-center">
                <p className="text-white/60 text-sm">Loading...</p>
              </div>
            ) : biggestAgents.length === 0 ? (
              <div className="flex-shrink-0 w-64 sm:w-80 h-48 sm:h-64 bg-white/5 backdrop-blur-sm border border-gray-800/30 flex items-center justify-center">
                <p className="text-white/60 text-sm">No agents yet</p>
              </div>
            ) : (
              biggestAgents.map((agent) => (
                <div 
                key={agent.id} 
                className="flex-shrink-0 w-64 sm:w-80 h-48 sm:h-64 bg-white/10 md:bg-white/5 backdrop-blur-sm border border-gray-800/30 hover:border-[#ff5800]/40 transition-all duration-300 cursor-pointer group"
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
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 p-4 sm:p-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#ff5800]/20 border border-[#ff5800]/30 flex items-center justify-center overflow-hidden group-hover:bg-[#ff5800]/30 group-hover:border-[#ff5800]/50 transition-all duration-300">
                    <Image src={agent.avatarUrl || '/images/lucy.png'} alt={agent.creator} width={80} height={80} className="object-cover w-full h-full" />
                  </div>
                  <div>
                    <h4 className="text-white font-press-start text-sm sm:text-lg group-hover:text-[#ff5800] transition-colors duration-300">{agent.creator}</h4>
                    <p className="text-[#ff5800] font-montserrat font-bold text-lg sm:text-xl">${agent.prizePool.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between px-4 sm:px-6 pb-4 sm:pb-6">
                  <p className="text-gray-400 font-montserrat text-xs sm:text-sm mb-3">Attempts: {agent.totalAttempts || 0}</p>
                  <button className="font-press-start text-[#ff5800] hover:text-white px-3 sm:px-4 py-2 transition-all duration-300 text-xs relative overflow-hidden group border border-[#ff5800]/20 hover:border-[#ff5800]/50 hover:shadow-[0_0_10px_rgba(255,88,0,0.2)]">
                    <span className="relative z-10 tracking-wide group-hover:scale-105 transition-transform duration-200">View</span>
                    <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-px bg-gradient-to-r from-[#ff5800] to-[#ff8c00] transition-all duration-300"></div>
                  </button>
                </div>
              </div>
              ))
            )}
            {/* View More Card */}
            <Link href="/app?page=bounties&category=biggest" className="flex-shrink-0 w-64 sm:w-80 h-48 sm:h-64 bg-gradient-to-br from-[#ff5800] via-[#ff6b1a] to-[#ff8c00] p-4 sm:p-6 border-2 border-[#ff5800] flex flex-col items-center justify-center group hover:shadow-2xl hover:shadow-[#ff5800]/25 transition-all duration-500 cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="text-center relative z-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300 border border-white/30">
                  <span className="text-white font-press-start text-2xl sm:text-3xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">→</span>
                </div>
                <h4 className="text-white font-press-start text-sm sm:text-lg mb-1 sm:mb-2 group-hover:text-black transition-colors duration-300 drop-shadow-lg">View More</h4>
                <p className="text-white/90 font-montserrat text-xs sm:text-sm group-hover:text-black/80 transition-colors duration-300">See all biggest agents</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Latest Category */}
        <div className="relative">
          <h3 className="text-green-400 text-2xl font-press-start mb-6">Latest</h3>
          {/* Desktop Scroll Buttons */}
          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 -left-10 z-10">
            <button
              onClick={() => scrollLeft(latestScrollRef)}
              className="w-8 h-8 bg-black/40 hover:bg-black/60 text-green-400 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 group border border-green-400/20 hover:border-green-400/40"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 -right-10 z-10">
            <button
              onClick={() => scrollRight(latestScrollRef)}
              className="w-8 h-8 bg-black/40 hover:bg-black/60 text-green-400 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 group border border-green-400/20 hover:border-green-400/40"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div ref={latestScrollRef} className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {loading ? (
              <div className="flex-shrink-0 w-64 sm:w-80 h-48 sm:h-64 bg-white/5 backdrop-blur-sm border border-gray-800/30 flex items-center justify-center">
                <p className="text-white/60 text-sm">Loading...</p>
              </div>
            ) : latestAgents.length === 0 ? (
              <div className="flex-shrink-0 w-64 sm:w-80 h-48 sm:h-64 bg-white/5 backdrop-blur-sm border border-gray-800/30 flex items-center justify-center">
                <p className="text-white/60 text-sm">No agents yet</p>
              </div>
            ) : (
              latestAgents.map((agent) => (
                <div 
                key={agent.id} 
                className="flex-shrink-0 w-64 sm:w-80 h-48 sm:h-64 bg-white/10 md:bg-white/5  backdrop-blur-sm border border-gray-800/30 hover:border-green-400/40 transition-all duration-300 cursor-pointer group"
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
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 p-4 sm:p-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-400/20 border border-green-400/30 flex items-center justify-center overflow-hidden group-hover:bg-green-400/30 group-hover:border-green-400/50 transition-all duration-300">
                    <Image src={agent.avatarUrl || '/images/lucy.png'} alt={agent.creator} width={80} height={80} className="object-cover w-full h-full" />
                  </div>
                  <div>
                    <h4 className="text-white font-press-start text-sm sm:text-lg group-hover:text-green-400 transition-colors duration-300">{agent.creator}</h4>
                    <p className="text-green-400 font-montserrat font-bold text-lg sm:text-xl">${agent.prizePool.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between px-4 sm:px-6 pb-4 sm:pb-6">
                  <p className="text-gray-400 font-montserrat text-xs sm:text-sm mb-3">Attempts: {agent.totalAttempts || 0}</p>
                  <button className="font-press-start text-green-400 hover:text-white px-3 sm:px-4 py-2 transition-all duration-300 text-xs relative overflow-hidden group border border-green-400/20 hover:border-green-400/50 hover:shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                    <span className="relative z-10 tracking-wide group-hover:scale-105 transition-transform duration-200">View</span>
                    <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-px bg-gradient-to-r from-green-400 to-emerald-400 transition-all duration-300"></div>
                  </button>
                </div>
              </div>
              ))
            )}
            {/* View More Card */}
            <Link href="/app?page=bounties&category=latest" className="flex-shrink-0 w-64 sm:w-80 h-48 sm:h-64 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 p-4 sm:p-6 border-2 border-green-500 flex flex-col items-center justify-center group hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-500 cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="text-center relative z-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300 border border-white/30">
                  <span className="text-white font-press-start text-2xl sm:text-3xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">→</span>
                </div>
                <h4 className="text-white font-press-start text-sm sm:text-lg mb-1 sm:mb-2 group-hover:text-black transition-colors duration-300 drop-shadow-lg">View More</h4>
                <p className="text-white/90 font-montserrat text-xs sm:text-sm group-hover:text-black/80 transition-colors duration-300">See all latest agents</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Cracked Category */}
        <div className="relative">
          <h3 className="text-red-400 text-2xl font-press-start mb-6">Cracked</h3>
          {/* Desktop Scroll Buttons */}
          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 -left-10 z-10">
            <button
              onClick={() => scrollLeft(crackedScrollRef)}
              className="w-8 h-8 bg-black/40 hover:bg-black/60 text-red-400 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 group border border-red-400/20 hover:border-red-400/40"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 -right-10 z-10">
            <button
              onClick={() => scrollRight(crackedScrollRef)}
              className="w-8 h-8 bg-black/40 hover:bg-black/60 text-red-400 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 group border border-red-400/20 hover:border-red-400/40"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div ref={crackedScrollRef} className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {loading ? (
              <div className="flex-shrink-0 w-64 sm:w-80 h-48 sm:h-64 bg-white/5 backdrop-blur-sm border border-gray-800/30 flex items-center justify-center">
                <p className="text-white/60 text-sm">Loading...</p>
              </div>
            ) : crackedAgents.length === 0 ? (
              <div className="flex-shrink-0 w-64 sm:w-80 h-48 sm:h-64 bg-white/5 backdrop-blur-sm border border-gray-800/30 flex items-center justify-center">
                <p className="text-white/60 text-sm">No cracked agents yet</p>
              </div>
            ) : (
              crackedAgents.map((agent) => (
                <div 
                key={agent.id} 
                className="flex-shrink-0 w-64 sm:w-80 h-48 sm:h-64 bg-white/10 md:bg-white/5  backdrop-blur-sm border border-gray-800/30 hover:border-red-400/40 transition-all duration-300 cursor-pointer group"
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
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 p-4 sm:p-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-400/20 border border-red-400/30 flex items-center justify-center overflow-hidden group-hover:bg-red-400/30 group-hover:border-red-400/50 transition-all duration-300">
                    <Image src={agent.avatarUrl || '/images/lucy.png'} alt={agent.creator} width={80} height={80} className="object-cover w-full h-full" />
                  </div>
                  <div>
                    <h4 className="text-white font-press-start text-sm sm:text-lg group-hover:text-red-400 transition-colors duration-300">{agent.creator}</h4>
                    <p className="text-red-400 font-montserrat font-bold text-lg sm:text-xl">${agent.prizePool.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between px-4 sm:px-6 pb-4 sm:pb-6">
                  <p className="text-gray-400 font-montserrat text-xs sm:text-sm mb-3">Cracked by: {agent.crackedBy || 'Unknown'}</p>
                  <button className="font-press-start text-red-400 hover:text-white px-3 sm:px-4 py-2 transition-all duration-300 text-xs relative overflow-hidden group border border-red-400/20 hover:border-red-400/50 hover:shadow-[0_0_10px_rgba(248,113,113,0.2)]">
                    <span className="relative z-10 tracking-wide group-hover:scale-105 transition-transform duration-200">View</span>
                    <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-px bg-gradient-to-r from-red-400 to-pink-400 transition-all duration-300"></div>
                  </button>
                </div>
              </div>
              ))
            )}
            {/* View More Card */}
            <Link href="/app?page=bounties&category=cracked" className="flex-shrink-0 w-64 sm:w-80 h-48 sm:h-64 bg-gradient-to-br from-red-500 via-pink-500 to-rose-600 p-4 sm:p-6 border-2 border-red-500 flex flex-col items-center justify-center group hover:shadow-2xl hover:shadow-red-500/25 transition-all duration-500 cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="text-center relative z-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300 border border-white/30">
                  <span className="text-white font-press-start text-2xl sm:text-3xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">→</span>
                </div>
                <h4 className="text-white font-press-start text-sm sm:text-lg mb-1 sm:mb-2 group-hover:text-black transition-colors duration-300 drop-shadow-lg">View More</h4>
                <p className="text-white/90 font-montserrat text-xs sm:text-sm group-hover:text-black/80 transition-colors duration-300">See all cracked agents</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} // Frontend change 4
// Frontend change 4
