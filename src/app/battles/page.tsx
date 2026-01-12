'use client';

import { useState } from 'react';

export default function BattlesPage() {
  const [activeTab, setActiveTab] = useState('attack');

  return (
    <div className="h-full bg-black">

      {/* Top Right Corner Info */}
      <div className="hidden md:block md:absolute top-4 right-4 z-10">
        <div className="flex items-center gap-2 sm:gap-4 text-white/50">
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-xs sm:text-sm font-medium">Wallet:</span>
            <span className="text-xs sm:text-sm font-medium text-[#ff5800]">1,000</span>
          </div>
          <div className="w-px h-3 sm:h-4 bg-white/30"></div>
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-xs sm:text-sm font-medium">Vault:</span>
            <span className="text-xs sm:text-sm font-medium text-red-500">None</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-5">
        <h1 className="text-xl sm:text-2xl font-press-start font-bold text-white text-center mb-4">
          Battle Arena
        </h1>
        
        {/* Subtitle */}
        <p className="text-white/70 text-center font-montserrat text-sm sm:text-lg mb-8 sm:mb-12">
          Defend your vault. Crack theirs.
        </p>

        {/* Tabs */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="flex bg-black/20 backdrop-blur-sm border border-gray-800/30 p-1 max-w-4xl w-full">
            <button 
              onClick={() => setActiveTab('attack')}
              className={`flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium font-montserrat flex-1 transition-all duration-300 ${
                activeTab === 'attack' 
                  ? 'bg-[#ff5800]/20 text-white border-b-2 border-[#ff5800]' 
                  : 'text-white/70 hover:text-white border-b-2 border-transparent hover:border-gray-600'
              }`}
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Attack
            </button>
            <button 
              onClick={() => setActiveTab('defend')}
              className={`flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium font-montserrat flex-1 transition-all duration-300 ${
                activeTab === 'defend' 
                  ? 'bg-[#ff5800]/20 text-white border-b-2 border-[#ff5800]' 
                  : 'text-white/70 hover:text-white border-b-2 border-transparent hover:border-gray-600'
              }`}
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Defend
            </button>
          </div>
        </div>

        {/* Attack Tab Content */}
        {activeTab === 'attack' && (
          <>
            {/* Tutorial Vaults Section */}
            <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
              <h2 className="text-lg sm:text-2xl font-bold text-white mb-2">Tutorial Vaults</h2>
              <p className="text-white/70 mb-4 sm:mb-6 text-sm sm:text-base">Earn your first points by cracking these tutorial vaults.</p>
              
              {/* Vaults Table */}
              <div className="bg-black/20 backdrop-blur-sm border border-gray-800/30 overflow-hidden">
                <div className="overflow-x-auto">
                  <div className="min-w-[600px]">
                    <div className="grid grid-cols-5 gap-2 sm:gap-4 p-2 sm:p-4 text-white/50 text-xs sm:text-sm font-medium border-b border-gray-800/30">
                      <div>Name</div>
                      <div>Creator</div>
                      <div>Rank</div>
                      <div>Balance</div>
                      <div>Attempts</div>
                    </div>
                
                {/* Vault 1 */}
                <div className="grid grid-cols-5 gap-2 sm:gap-4 p-2 sm:p-4 text-white border-b border-gray-800/30 hover:bg-black/10 transition-colors duration-300">
                  <div className="font-medium text-xs sm:text-sm">The Great Beginning</div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className="w-4 h-4 sm:w-6 sm:h-6 bg-gray-600 flex items-center justify-center">
                      <svg className="w-2 h-2 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <span className="text-xs sm:text-sm">crackfun</span>
                  </div>
                  <div>
                    <span className="bg-green-500 text-white px-1 sm:px-2 py-0.5 sm:py-1 text-xs">1</span>
                  </div>
                  <div className="text-xs sm:text-sm">100</div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-xs sm:text-sm">ready</span>
                  </div>
                </div>
                
                {/* Vault 2 */}
                <div className="grid grid-cols-5 gap-2 sm:gap-4 p-2 sm:p-4 text-white border-b border-gray-800/30 hover:bg-black/10 transition-colors duration-300">
                  <div className="font-medium text-xs sm:text-sm">The Shield Bearer</div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className="w-4 h-4 sm:w-6 sm:h-6 bg-gray-600 flex items-center justify-center">
                      <svg className="w-2 h-2 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <span className="text-xs sm:text-sm">crackfun</span>
                  </div>
                  <div>
                    <span className="bg-orange-500 text-white px-1 sm:px-2 py-0.5 sm:py-1 text-xs">2</span>
                  </div>
                  <div className="text-xs sm:text-sm">500</div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                    </svg>
                  </div>
                </div>
                
                {/* Vault 3 */}
                <div className="grid grid-cols-5 gap-2 sm:gap-4 p-2 sm:p-4 text-white hover:bg-black/10 transition-colors duration-300">
                  <div className="font-medium text-xs sm:text-sm">The Final Guardian</div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className="w-4 h-4 sm:w-6 sm:h-6 bg-gray-600 flex items-center justify-center">
                      <svg className="w-2 h-2 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <span className="text-xs sm:text-sm">crackfun</span>
                  </div>
                  <div>
                    <span className="bg-red-500 text-white px-1 sm:px-2 py-0.5 sm:py-1 text-xs">3</span>
                  </div>
                  <div className="text-xs sm:text-sm">1,000</div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                    </svg>
                  </div>
                </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Attack Other Players Section */}
            <div className="max-w-4xl text-center md:text-left mx-auto">
              <h2 className="text-lg sm:text-2xl font-bold text-white mb-2">Attack Other Players</h2>
              <p className="text-white/70 mb-4 sm:mb-6 text-sm text-justify sm:text-base">
                Your vault is shielded from attacks. You can&apos;t attack others, and they can&apos;t attack you. 
                When you&apos;re ready to enter the real battle arena, click the button below. 
                We recommend you complete the tutorial first.
              </p>
              <button className="font-press-start text-[#ff5800] hover:text-white px-6 sm:px-8 py-2 sm:py-3 transition-all duration-300 relative overflow-hidden group border border-[#ff5800]/30 hover:border-[#ff5800] hover:shadow-[0_0_20px_rgba(255,88,0,0.3)]">
                <span className="relative z-10 tracking-wider group-hover:scale-105 transition-transform duration-300 text-sm sm:text-base">I&apos;m ready to Battle!</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff5800]/10 via-[#ff5800]/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-[#ff5800] to-[#ff8c00] transition-all duration-300"></div>
              </button>
            </div>
          </>
        )}

        {/* Defend Tab Content */}
        {activeTab === 'defend' && (
          <div className="max-w-4xl mx-auto px-2 sm:px-0">
            {/* Header Section */}
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-xm sm:text-xl font-bold text-white font-press-start mb-2">VAULT CREATION</h2>
              <p className="text-white/60 text-xs sm:text-base">Build your digital fortress</p>
            </div>
            
            {/* Vault Creation Form */}
            <div className="bg-black/20 backdrop-blur-sm border border-gray-800/30 px-0 sm:p-6 mb-6 sm:mb-8 w-full">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#ff5800]/20 flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff5800]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">Vault Configuration</h3>
                  <p className="text-white/60 text-xs sm:text-sm">Configure your digital fortress</p>
                </div>
              </div>

              <form className="space-y-4 sm:space-y-6">
                {/* Vault Name */}
                <div>
                  <label className="block text-white font-medium mb-2 text-sm sm:text-base">Vault Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your vault name"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/20 border border-gray-800/30 text-white placeholder-white/40 focus:outline-none focus:border-[#ff5800] transition-all duration-300 text-sm sm:text-base"
                  />
                </div>
                
                {/* Vault Description */}
                <div>
                  <label className="block text-white font-medium mb-2 text-sm sm:text-base">Vault Description</label>
                  <textarea 
                    placeholder="Describe your vault&apos;s theme or challenge..."
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/20 border border-gray-800/30 text-white placeholder-white/40 focus:outline-none focus:border-[#ff5800] resize-none transition-all duration-300 text-sm sm:text-base"
                  ></textarea>
                </div>
                {/* Vault Avatar */}
                <div>
                  <label className="block text-white font-medium mb-2 text-sm sm:text-base">Vault Avatar</label>
                  <div className="border-2 border-dashed border-gray-800/30 p-4 sm:p-6 text-center hover:border-[#ff5800] hover:bg-black/10 transition-all duration-300">
                    <input 
                      type="file" 
                      accept="image/*"
                      className="hidden"
                      id="vault-avatar"
                    />
                    <label htmlFor="vault-avatar" className="cursor-pointer">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#ff5800]/20 border border-[#ff5800]/30 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#ff5800]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <p className="text-white/80 font-medium mb-1 text-sm sm:text-base">Click to upload vault avatar</p>
                      <p className="text-white/50 text-xs sm:text-sm">PNG, JPG, GIF up to 5MB</p>
                    </label>
                  </div>
                </div>
                
                {/* Initial Balance */}
                <div>
                  <label className="block text-white font-medium mb-2 text-sm sm:text-base">Initial Balance (Points)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      placeholder="100"
                      min="1"
                      max="1000"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/20 border border-gray-800/30 text-white placeholder-white/40 focus:outline-none focus:border-[#ff5800] transition-all duration-300 text-sm sm:text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <span className="text-[#ff5800] font-medium text-xs sm:text-sm">PTS</span>
                    </div>
                  </div>
                  <p className="text-white/50 text-xs sm:text-sm mt-2">Available: 1,000 Points</p>
                </div>
                
                {/* Defense System Prompts */}
                <div>
                  <label className="block text-white font-medium mb-2 text-sm sm:text-base">Defense System Prompts</label>
                  <textarea 
                    placeholder="Enter prompts that will guide your vault&apos;s defense system..."
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/20 border border-gray-800/30 text-white placeholder-white/40 focus:outline-none focus:border-[#ff5800] resize-none transition-all duration-300 text-sm sm:text-base"
                  ></textarea>
                  <p className="text-white/50 text-xs sm:text-sm mt-2">These prompts will help define how your vault responds to attacks</p>
                </div>
                
                {/* Shield Defense Checkbox */}
                <div>
                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-black/20 border border-gray-800/30">
                    <input 
                      type="checkbox" 
                      id="shield-defense"
                      className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff5800] bg-white/10 border border-white/20 focus:ring-[#ff5800] focus:ring-2 focus:ring-offset-2 focus:ring-offset-black transition-colors"
                    />
                    <div className="flex-1">
                      <label htmlFor="shield-defense" className="text-white font-medium cursor-pointer text-sm sm:text-base">
                        Enable Shield Defense
                      </label>
                      <p className="text-white/60 text-xs sm:text-sm">Premium protection for elite vaults</p>
                    </div>
                    <div className="text-white/50 text-xs sm:text-sm">
                      <span>250k+ $CRACK</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Defense Tools Section */}
            <div className="bg-black/20 backdrop-blur-sm border border-gray-800/30 px-0 sm:p-6 mb-6 sm:mb-8 w-full">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#ff5800]/20 flex items-center justify-center">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff5800]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">Defense Tools</h3>
                    <p className="text-white/60 text-xs sm:text-sm">Configure your vault&apos;s defense system</p>
                  </div>
                </div>
                <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-[#ff5800] hover:text-white text-xs sm:text-sm font-medium transition-all duration-300 relative overflow-hidden group border border-[#ff5800]/30 hover:border-[#ff5800] hover:shadow-[0_0_10px_rgba(255,88,0,0.2)]">
                  <span className="relative z-10 tracking-wide group-hover:scale-105 transition-transform duration-200">+ Add Tool</span>
                  <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-px bg-gradient-to-r from-[#ff5800] to-[#ff8c00] transition-all duration-300"></div>
                </button>
              </div>
              
              <p className="text-white/70 mb-4 sm:mb-6 text-sm sm:text-base">
                Create tools for your vault defense. One tool must be marked as winning (the one attackers try to trick you into using).
              </p>

              {/* Tool Configuration Card */}
              <div className="bg-black/20 border border-gray-800/30 p-1 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <input 
                      type="radio" 
                      id="winning-tool"
                      name="winning-tool"
                      defaultChecked={true}
                      className="w-3 h-3 sm:w-4 sm:h-4 text-[#ff5800] bg-white/10 border border-white/20 focus:ring-[#ff5800] focus:ring-2 focus:ring-offset-2 focus:ring-offset-black"
                    />
                    <div>
                      <label htmlFor="winning-tool" className="text-white font-medium cursor-pointer text-xs sm:text-base">
                        Winning Tool (Attackers Win)
                      </label>
                      <p className="text-white/60 text-xs sm:text-sm">This is the tool attackers must trick you into using</p>
                    </div>
                  </div>
                  <button className="text-white/50 hover:text-red-500 p-0 ml-[6px] sm:p-2 hover:bg-red-500/10">
                    <svg className="w-5 h-5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-3 sm:space-y-4">
                                    {/* Tool Name */}
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm sm:text-base">Tool Name (no spaces)</label>
                    <input 
                      type="text" 
                      defaultValue="access_denied"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/20 border border-gray-800/30 text-white focus:outline-none focus:border-[#ff5800] transition-all duration-300 text-sm sm:text-base"
                    />
                  </div>

                  {/* Tool Description */}
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm sm:text-base">Tool Description</label>
                    <textarea 
                      defaultValue="Deny the attacker access to the vault"
                      rows={3}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/20 border border-gray-800/30 text-white focus:outline-none focus:border-[#ff5800] resize-none transition-all duration-300 text-sm sm:text-base"
                    ></textarea>
                  </div>

                  {/* Explanation */}
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm sm:text-base">Explanation</label>
                    <textarea 
                      placeholder="Why you denied access"
                      rows={3}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/20 border border-gray-800/30 text-white placeholder-white/40 focus:outline-none focus:border-[#ff5800] resize-none transition-all duration-300 text-sm sm:text-base"
                    ></textarea>
                  </div>

                  {/* Tool Media */}
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm sm:text-base">Tool Media (Optional)</label>
                    <div className="border-2 border-dashed border-gray-800/30 p-3 sm:p-4 text-center hover:border-[#ff5800] hover:bg-black/10 transition-all duration-300">
                      <input 
                        type="file" 
                        className="hidden"
                        id="tool-media"
                      />
                      <label htmlFor="tool-media" className="cursor-pointer">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#ff5800]/20 border border-[#ff5800]/30 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff5800]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <p className="text-white/80 font-medium mb-1 text-sm sm:text-base">Browse... No file selected.</p>
                        <p className="text-white/50 text-xs sm:text-sm">Upload media for your tool</p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-3 sm:gap-4">
              <button className="px-6 sm:px-8 py-2 sm:py-3 text-[#ff5800] hover:text-white font-medium transition-all duration-300 relative overflow-hidden group border border-[#ff5800]/30 hover:border-[#ff5800] hover:shadow-[0_0_20px_rgba(255,88,0,0.3)]">
                <span className="relative z-10 tracking-wider group-hover:scale-105 transition-transform duration-300 text-sm sm:text-base">Create Vault</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff5800]/10 via-[#ff5800]/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-[#ff5800] to-[#ff8c00] transition-all duration-300"></div>
              </button>
              <button className="px-6 sm:px-8 py-2 sm:py-3 text-white/70 hover:text-white font-medium transition-all duration-300 relative overflow-hidden group border border-gray-800/30 hover:border-white/40 hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                <span className="relative z-10 tracking-wider group-hover:scale-105 transition-transform duration-300 text-sm sm:text-base">Cancel</span>
                <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-px bg-gradient-to-r from-white/60 to-white/40 transition-all duration-300"></div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 