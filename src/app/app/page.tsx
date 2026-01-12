'use client';

import Image from "next/image";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BattlesComponent from "./components/BattlesComponent";
import CreateComponent from "./components/CreateComponent";
import LeaderboardComponent from "./components/LeaderboardComponent";
import BountiesComponent from "./components/BountiesComponent";
import AgentsComponent from "./components/AgentsComponent";
import ChatComponent from "./components/ChatComponent";

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

function AppPageContent() {
  const searchParams = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(true); // for mobile overlay
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // for desktop collapse

  // Set initial state based on URL parameters
  useEffect(() => {
    const page = searchParams.get('page');
    const category = searchParams.get('category');
    
    if (page === 'bounties' && category) {
      setCurrentPage('agents');
      // Set default sidebar behavior based on screen size
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        setSidebarOpen(false); // Hide on mobile only
      }
      // Desktop keeps sidebar open (no changes needed)
    } else if (page === 'bounties') {
      setCurrentPage('bounties');
      // Set default sidebar behavior based on screen size
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        setSidebarOpen(false); // Hide on mobile only
      }
      // Desktop keeps sidebar open (no changes needed)
    }
  }, [searchParams]);

  const userProfile = {
    name: "BustyBebo",
    joinedDate: "March 2024",
    walletAddress: "0x7F8E...9A2B",
    winnings: 1247.89,
    earnings: 892.34,
    profilePic: "/images/younggun.png"
  };



  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const navigationItems = [
    { name: 'Bounties', id: 'bounties', icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M8.5 12.5 7 21l5-3 5 3-1.5-8.5" />
      </>
    ) },
    { name: 'Battles', id: 'battles', icon: (
      <>
        <path d="M14.5 17.5 3 6V3h3L18.5 16.5" />
        <path d="m13 19 6 2-2-6" />
        <path d="M16 16 3 3" />
      </>
    ) },
    { name: 'Create', id: 'create', icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M12 8v8M8 12h8" />
      </>
    ) },
    { name: 'Leaderboard', id: 'leaderboard', icon: (
      <>
        <rect x="3" y="12" width="4" height="8" rx="1" />
        <rect x="9" y="8" width="4" height="12" rx="1" />
        <rect x="15" y="4" width="4" height="16" rx="1" />
      </>
    ) },
    { name: 'Documentation', id: 'docs', icon: (
      <>
        <path d="M2 19V6a2 2 0 0 1 2-2h7" />
        <path d="M22 19V6a2 2 0 0 0-2-2h-7" />
        <path d="M2 19a2 2 0 0 0 2 2h7" />
        <path d="M22 19a2 2 0 0 1-2 2h-7" />
      </>
    ) },
    { name: 'Profile', id: 'dashboard', icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
      </>
    ) },
  ];

  // Mock agent data for profile
  const crackedAgents = [
    { name: 'NeuralNet', date: '2024-05-01', price: 120.5, avatar: '/images/lucy.png' },
    { name: 'CodeBreaker', date: '2024-04-28', price: 98.2, avatar: '/images/bustybebo.png' },
    { name: 'VaultHunter', date: '2024-04-15', price: 75.0, avatar: '/images/missjen.png' },
  ];
  const createdAgents = [
    { name: 'QuantumAI', date: '2024-04-20', price: 210.0, avatar: '/images/thenerd.png' },
    { name: 'SecureBot', date: '2024-03-15', price: 180.0, avatar: '/images/claira.png' },
  ];


  // REMOVED: const profileCompletion = 80; // percent

  return (
    <div className="h-screen bg-black text-white flex overflow-hidden">
      {/* Left Sidebar */}
      <div className={`
        ${sidebarCollapsed ? 'w-16' : 'w-56'}
        bg-black flex-shrink-0 transition-all duration-500 overflow-hidden z-30
        ${sidebarOpen ? '' : '-translate-x-full'}
        fixed md:relative h-full
        md:bg-transparent
      `}>
        {/* Logo (Desktop) / Toggle Button (Mobile) */}
        <div className={`p-7 md:p-4 border-b border-[#ff5800]/90 flex items-center justify-center ${sidebarCollapsed ? 'justify-center' : ''}`}>
          {/* Desktop Logo */}
          <div className={`hidden md:block transition-all duration-500`}> 
            {sidebarCollapsed ? (
              <Image 
                src="/images/proff-logo.png"
                alt="Proff Logo"
                width={32}
                height={32}
                className={`w-8 h-8 object-contain p-0 m-0`}
              />
            ) : (
              <Image 
                src="/images/logo.svg"
                alt="Proff.fun Logo"
                width={120}
                height={40}
                className="w-auto h-8 object-contain"
              />
            )}
          </div>
        </div>
        {/* Navigation */}
        <nav className="p-2 space-y-1 flex-1 flex flex-col items-stretch justify-center overflow-hidden relative">
          {navigationItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.name}
                onClick={() => {
                  setCurrentPage(item.id);
                  setSelectedAgent(null); // Close chat when navigating
                }}
                className={`group w-full flex items-center ${sidebarCollapsed ?  'justify-center' : 'gap-3'} ${sidebarCollapsed ?  'px-2' : 'px-4'}  py-3 transition-colors text-left ${
                  isActive 
                    ? 'text-black bg-[#ff5800]/70' 
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {item.icon}
                  </svg>
                  <span className={`font-medium font-press-start text-[10px] transition-opacity duration-300 ${sidebarCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>{item.name}</span>
                  {/* Tooltip for nav icon */}
                  {sidebarCollapsed && (
                    <span className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-black text-white text-xs font-press-start opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 border border-[#ff5800] shadow-lg">
                      {item.name}
                    </span>
                  )}
                </button>
            );
          })}

        </nav>
        {/* Social Media Icons & Toggle */}
        <div className={`absolute bottom-16 left-0 ${sidebarCollapsed ? 'w-16' : 'w-56'} p-2 flex-shrink-0`}>
          <div className={`flex ${sidebarCollapsed ? 'flex-col justify-center' : 'justify-between'} items-center gap-3`}>
            {/* Telegram */}
            <button className="text-white/40 hover:text-[#0088cc] transition-all duration-300 p-1.5 border border-transparent hover:border-[#0088cc]/30 hover:shadow-[0_0_8px_rgba(0,136,204,0.3)]" onClick={() => {/* telegram logic here */}} aria-label="Telegram">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
              </svg>
            </button>
            
            {/* X (Twitter) */}
            <button className="text-white/40 hover:text-white transition-all duration-300 p-1.5 border border-transparent hover:border-white/30 hover:shadow-[0_0_8px_rgba(255,255,255,0.3)]" onClick={() => {/* x logic here */}} aria-label="X (Twitter)">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </button>
            
            {/* Sign Out */}
            <button className="text-white/40 hover:text-[#ff5800] transition-all duration-300 p-1.5 border border-transparent hover:border-[#ff5800]/30 hover:shadow-[0_0_8px_rgba(255,88,0,0.3)]" onClick={() => {/* sign out logic here */}} aria-label="Sign out">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
            </button>

            {/* Sidebar Toggle Button */}
            <button
              className="text-white/40 hover:text-[#ff5800] transition-all duration-300 p-1.5 border border-transparent hover:border-[#ff5800]/30 hover:shadow-[0_0_8px_rgba(255,88,0,0.3)]"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              aria-label="Toggle sidebar"
            >
              <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${sidebarCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Profile Section */}
        <div className={`absolute bottom-0 left-0 ${sidebarCollapsed ? 'w-16' : 'w-56'} p-2 flex-shrink-0`}>
          <div className="relative">
            <div className={`w-full flex items-center border-t border-[#ff5800]/90 ${sidebarCollapsed ? 'justify-center gap-0' : 'gap-3'} p-1 text-white/70`}>
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#ff5800]/90">
                <Image 
                  src={userProfile.profilePic}
                  alt="Profile Picture"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className={`flex-1 text-left transition-opacity duration-300 ${sidebarCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
                <p className="text-[10px] font-medium font-press-start">{userProfile.name}</p>
                <p className="text-[10px] text-[#ff5800] font-press-start">${userProfile.winnings.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-20 md:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}
      {/* Mobile Hamburger/Close Button (mobile only) */}
      <button
        className={`md:hidden fixed top-4 left-4 z-50 bg-transparent text-white rounded p-1 flex items-center justify-center hover:text-[#ff5800] transition ${selectedAgent ? 'hidden' : ''}`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label={sidebarOpen ? "Close navigation" : "Toggle navigation"}
      >
        {sidebarOpen ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
      {/* Main Content Area */}
      <div className={`flex-1 bg-black flex flex-col overflow-hidden relative ${sidebarOpen ? 'md:blur-none blur-sm' : ''}`}>
        {/* Top Header - Only for Profile (dashboard) */}
        {currentPage === 'dashboard' && (
          <main className="flex-1 flex flex-col items-center justify-center bg-black p-6 sm:p-12">
            <section className="w-full max-w-2xl flex flex-col items-center gap-4 sm:gap-6">
              {/* Avatar */}
              <div className="w-32 h-32 sm:w-36 sm:h-36 border-2 border-[#ff5800] bg-black flex items-center justify-center">
                <Image 
                  src={userProfile.profilePic}
                  alt="Profile Picture"
                  width={144}
                  height={144}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Name */}
              <h1 className="font-press-start text-xl sm:text-2xl text-white text-center">{userProfile.name}</h1>
              {/* Member Since */}
              <div className="text-xs text-white/50 font-mono text-center">Member since {userProfile.joinedDate}</div>
              {/* Wallet */}
              <div className="flex items-center gap-2 text-center">
                <span className="text-xs text-white/60 font-mono">{userProfile.walletAddress}</span>
                <button className="text-[#ff5800] hover:text-white transition-colors duration-300 text-xs" onClick={() => navigator.clipboard.writeText(userProfile.walletAddress)} title="Copy wallet address">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>
                </button>
              </div>
              {/* Divider */}
              <div className="w-full h-px bg-white/10 my-2" />
              {/* Stats */}
              <div className="flex flex-row justify-center items-center gap-6 sm:gap-8 w-full">
                <div className="flex flex-col items-center">
                  <span className="text-xs text-white/60 font-press-start mb-1">Winnings</span>
                  <span className="text-lg sm:text-xl font-bold text-[#ff5800] font-press-start">${userProfile.winnings.toFixed(2)}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-white/60 font-press-start mb-1">Earnings</span>
                  <span className="text-lg sm:text-xl font-bold text-[#ff5800] font-press-start">${userProfile.earnings.toFixed(2)}</span>
                </div>
              </div>
              {/* Divider */}
              <div className="w-full h-px bg-white/10 my-2" />
              {/* Cracked & Created Agents Side by Side */}
              <div className="w-full flex flex-col md:flex-row gap-6 sm:gap-8 mt-4 sm:mt-6">
                {/* Cracked Agents */}
                <div className="flex-1 min-w-0">
                  <div className="font-press-start text-xs text-white/80 mb-3">Cracked Agents ({crackedAgents.length})</div>
                  <div className="flex flex-col divide-y divide-white/10">
                    {crackedAgents.map(agent => (
                      <div key={agent.name} className="flex items-center gap-3 py-2">
                        <div className="w-8 h-8 bg-black/20 border border-[#ff5800]/30 flex items-center justify-center">
                          <Image src={agent.avatar || '/images/agent-placeholder.png'} alt={agent.name} width={32} height={32} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-white text-sm font-press-start truncate">{agent.name}</div>
                          <div className="text-xs text-white/50 font-mono truncate">Cracked: {agent.date}</div>
                        </div>
                        <div className="font-press-start text-xs text-[#ff5800] ml-2">${agent.price.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Created Agents */}
                <div className="flex-1 min-w-0">
                  <div className="font-press-start text-xs text-white/80 mb-3">Created Agents ({createdAgents.length})</div>
                  <div className="flex flex-col divide-y divide-white/10">
                    {createdAgents.map(agent => (
                      <div key={agent.name} className="flex items-center gap-3 py-2">
                        <div className="w-8 h-8 bg-black/20 border border-[#ff5800]/30 flex items-center justify-center">
                          <Image src={agent.avatar || '/images/agent-placeholder.png'} alt={agent.name} width={32} height={32} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-white text-sm font-press-start truncate">{agent.name}</div>
                          <div className="text-xs text-white/50 font-mono truncate">Created: {agent.date}</div>
                        </div>
                        <div className="font-press-start text-xs text-[#ff5800] ml-2">${agent.price.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </main>
        )}
        {/* Main Content */}
        <main className={`flex-1 md:p-5 ${currentPage === 'agents' ? 'overflow-y-auto' : 'overflow-hidden'} h-full`}>
          {selectedAgent ? (
            <ChatComponent 
              agent={selectedAgent} 
              onBack={() => setSelectedAgent(null)} 
            />
          ) : (
            <>
              {currentPage === 'battles' && <BattlesComponent />}

              {currentPage === 'bounties' && <BountiesComponent onAgentSelect={setSelectedAgent} />}

              {currentPage === 'agents' && <AgentsComponent onAgentSelect={setSelectedAgent} />}

              {currentPage === 'create' && <CreateComponent />}

              {currentPage === 'leaderboard' && <LeaderboardComponent />}

              {currentPage === 'docs' && (
                <div className="text-center p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">Documentation</h2>
                  <p className="text-white/70">Documentation content coming soon...</p>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default function AppPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-black flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
      <AppPageContent />
    </Suspense>
  );
} 