'use client';

import React, { ReactNode } from 'react';
import { useWallet } from './WalletProvider';
import WalletButton from './WalletButton';
import Image from 'next/image';

interface WalletGateProps {
  children: ReactNode;
}

const WalletGate: React.FC<WalletGateProps> = ({ children }) => {
  const { connected } = useWallet();

  if (!connected) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center p-8">
        {/* Video Background */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-30"
          src="/videos/bg.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        
        <div className="relative z-10 max-w-lg mx-auto text-center">
          {/* Logo */}
          <div className="mb-8">
            <Image 
              src="/images/logo.svg"
              alt="Proff.fun Logo"
              width={200}
              height={60}
              className="w-auto h-12 md:h-16 object-contain mx-auto"
            />
          </div>
          
          {/* Title */}
          <h1 className="font-press-start text-xl md:text-2xl text-white mb-4">
            CRACK.FUN
          </h1>
          
          {/* Subtitle */}
          <p className="font-montserrat text-lg md:text-xl text-white/80 mb-2 font-bold">
            BUILD IT. BREAK IT. GET PAID.
          </p>
          
          {/* Description */}
          <p className="text-white/60 mb-8 text-sm md:text-base leading-relaxed">
            Connect your Solana wallet to start creating unbreakable AI agents 
            or crack existing ones for bounties.
          </p>
          
          {/* Wallet Connection */}
          <div className="space-y-4">
            <WalletButton />
            
            <div className="flex items-center justify-center gap-2 text-xs text-white/40">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"/>
              </svg>
              <span>Secure connection via Phantom wallet</span>
            </div>
          </div>
          
          {/* Features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="text-center md:text-left">
              <div className="w-8 h-8 bg-[#ff5800] flex items-center justify-center mb-3 mx-auto md:mx-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <h3 className="font-press-start text-xs text-white mb-2">CREATE AGENTS</h3>
              <p className="text-white/60 text-xs">Build AI agents with custom prompts and tools</p>
            </div>
            
            <div className="text-center md:text-left">
              <div className="w-8 h-8 bg-[#ff5800] flex items-center justify-center mb-3 mx-auto md:mx-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-press-start text-xs text-white mb-2">CRACK & EARN</h3>
              <p className="text-white/60 text-xs">Find vulnerabilities and claim bounties</p>
            </div>
            
            <div className="text-center md:text-left">
              <div className="w-8 h-8 bg-[#ff5800] flex items-center justify-center mb-3 mx-auto md:mx-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-press-start text-xs text-white mb-2">COMPETE</h3>
              <p className="text-white/60 text-xs">Climb leaderboards and win prizes</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default WalletGate;