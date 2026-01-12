'use client';

export default function LeaderboardPage() {

  const topCrackers = [
    { id: 1, name: "J2 J21B...xCKs", winnings: 1882.72, trophy: "gold" },
    { id: 2, name: "7W 7W3C...vNpQ", winnings: 909.75, trophy: "silver" },
    { id: 3, name: "BW BW9K...mRtY", winnings: 756.43, trophy: "bronze" },
    { id: 4, name: "AP ApG3...cepT", winnings: 543.21, trophy: null },
    { id: 5, name: "GX Gx7L...kPqR", winnings: 432.18, trophy: null },
    { id: 6, name: "AI Ai2M...sTvW", winnings: 321.45, trophy: null },
    { id: 7, name: "CQ Cq5N...xYzA", winnings: 234.67, trophy: null },
    { id: 8, name: "7W 7W8P...bCdE", winnings: 189.34, trophy: null },
    { id: 9, name: "8S 8S1Q...fGhI", winnings: 167.89, trophy: null },
    { id: 10, name: "EV Ev4R...jKlM", winnings: 147.76, trophy: null },
  ];

  const topCreators = [
    { id: 1, name: "STACCoverflow", earnings: 123.02, trophy: "gold" },
    { id: 2, name: "ravi_riley", earnings: 113.71, trophy: "silver" },
    { id: 3, name: "CNkrypto", earnings: 98.45, trophy: "bronze" },
    { id: 4, name: "packletrades", earnings: 76.32, trophy: null },
    { id: 5, name: "dickgayAI", earnings: 65.18, trophy: null },
    { id: 6, name: "jamesoncrate", earnings: 54.27, trophy: null },
    { id: 7, name: "ethanmlam", earnings: 43.91, trophy: null },
    { id: 8, name: "solanajihad", earnings: 19.26, trophy: null },
  ];

  const getTrophyIcon = (trophy: string | null) => {
    if (!trophy) return null;
    
    const colors = {
      gold: "text-yellow-400",
      silver: "text-gray-300", 
      bronze: "text-amber-600"
    };

    return (
      <svg className={`w-5 h-5 ${colors[trophy as keyof typeof colors]}`} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
      </svg>
    );
  };

      const getAvatar = (name: string, trophy: string | null) => {
    if (trophy) {
      return getTrophyIcon(trophy);
    }
    
    const initials = name.split(' ')[0].substring(0, 2).toUpperCase();
    return (
      <div className="w-8 h-8 bg-gray-800/50 border border-gray-700/50 flex items-center justify-center text-white text-xs font-bold">
        {initials}
      </div>
    );
  };

  return (
    <div className="bg-black h-full">

      <div className="container mx-auto px-2 py-4 sm:py-5">
        <h1 className="text-xl sm:text-2xl font-press-start font-bold text-white text-center mb-12 sm:mb-8">
          Leaderboards
        </h1>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Top Crackers Section */}
          <div className="relative">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-8 h-8 bg-[#ff5800]/20 border border-[#ff5800]/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#ff5800]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xs font-bold text-white font-press-start">TOP CRACKERS</h2>
                <p className="text-white/60 text-xs mt-1">Elite vault breakers</p>
              </div>
            </div>

            <div className="space-y-2">
              {topCrackers.map((cracker, index) => (
                <div key={cracker.id} className="group relative">
                  <div className="flex items-center justify-between p-1 sm:p-1 bg-black/20 backdrop-blur-sm border border-gray-800/30 hover:border-[#ff5800]/40 hover:bg-black/30 transition-all duration-300 group-hover:scale-[1.01]">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        {getAvatar(cracker.name, cracker.trophy)}
                        {index < 3 && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#ff5800] border border-[#ff5800]/50 flex items-center justify-center">
                            <span className="text-white text-[10px] font-bold">{index + 1}</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="text-white font-mono text-xs group-hover:text-[#ff5800] transition-colors duration-300">
                          {cracker.name}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-10 h-1 bg-white/10 overflow-hidden">
                            <div 
                              className="h-full bg-[#ff5800] transition-all duration-300"
                              style={{ width: `${(cracker.winnings / 2000) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-white/40 text-[10px]">#{index + 1}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[#ff5800] font-bold font-mono text-base group-hover:scale-110 transition-transform duration-300">
                        ${cracker.winnings.toFixed(2)}
                      </span>
                      <div className="text-white/40 text-[10px] mt-1">winnings</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Creators Section */}
          <div className="relative">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-8 h-8 bg-[#ff5800]/20 border border-[#ff5800]/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#ff5800]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h2 className="text-xs font-bold text-white font-press-start">TOP CREATORS</h2>
                <p className="text-white/60 text-xs mt-1">Master vault builders</p>
              </div>
            </div>

            <div className="space-y-2">
              {topCreators.map((creator, index) => (
                <div key={creator.id} className="group relative">
                  <div className="flex items-center justify-between p-1 sm:p-1 bg-black/20 backdrop-blur-sm border border-gray-800/30 hover:border-[#ff5800]/40 hover:bg-black/30 transition-all duration-300 group-hover:scale-[1.01]">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        {getAvatar(creator.name, creator.trophy)}
                        {index < 3 && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#ff5800] border border-[#ff5800]/50 flex items-center justify-center">
                            <span className="text-white text-[10px] font-bold">{index + 1}</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="text-white font-mono text-xs group-hover:text-[#ff5800] transition-colors duration-300">
                          {creator.name}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-10 h-1 bg-white/10 overflow-hidden">
                            <div 
                              className="h-full bg-[#ff5800] transition-all duration-300"
                              style={{ width: `${(creator.earnings / 150) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-white/40 text-[10px]">#{index + 1}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[#ff5800] font-bold font-mono text-base group-hover:scale-110 transition-transform duration-300">
                        ${creator.earnings.toFixed(2)}
                      </span>
                      <div className="text-white/40 text-[10px] mt-1">earnings</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 