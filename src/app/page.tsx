'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import IntroPage from "./IntroPage";
import Footer from "./Footer";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="relative font-sans min-h-screen p-8 pb-20 sm:p-20 overflow-hidden">
        {/* Video Background */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src="/videos/bg.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        
        {/* Logo */}
        <div className="absolute top-6 left-8 z-30">
          <Image 
            src="/images/logo.svg"
            alt="Proff.fun Logo"
            width={120}
            height={40}
            className="w-auto h-6 md:h-8 object-contain"
          />
        </div>

        {/* Mobile Toggle Button - Positioned above overlay */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden absolute top-6 right-6 z-50 font-montserrat uppercase text-black text-sm font-medium hover:text-white transition-colors duration-300 px-3 py-2"
        >
          <div className="relative z-10 flex flex-col gap-1 w-6 h-5">
            <div className={`w-full h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
            <div className={`w-full h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-full h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
          </div>
        </button>

        {/* Desktop Navigation */}
        <div className="absolute top-6 right-8 z-30 hidden md:flex gap-6">
          <button className="group relative font-montserrat uppercase text-black text-base font-medium hover:text-white transition-colors duration-300 px-3 py-2">
            <div className="absolute inset-0 border border-transparent group-hover:border-white transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
            <span className="relative z-10">Documentation</span>
          </button>
          <button className="group relative font-montserrat uppercase text-black text-base font-medium hover:text-white transition-colors duration-300 px-3 py-2">
            <div className="absolute inset-0 border border-transparent group-hover:border-white opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <span className="relative z-10">Features</span>
          </button>
          <button className="group relative font-montserrat uppercase text-black text-base font-medium hover:text-white transition-colors duration-300 px-3 py-2">
            <div className="absolute inset-0 border border-transparent group-hover:border-white opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <span className="relative z-10">Contact</span>
          </button>
          <button className="group relative font-montserrat uppercase text-black text-base font-medium hover:text-white transition-colors duration-300 px-3 py-2">
            <div className="absolute inset-0 border border-transparent group-hover:border-white opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <span className="relative z-10">Support</span>
          </button>
        </div>

        {/* Mobile Full-Screen Menu Overlay */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-[#ff5800] z-40 flex flex-col items-center justify-center">
            {/* Close Button */}
            
            
            {/* Navigation Buttons - Centered and Stacked */}
            <div className="flex flex-col items-center gap-8">
              <button className="font-montserrat uppercase text-black text-xl font-medium hover:text-white transition-colors duration-300">
                Documentation
              </button>
              <button className="font-montserrat uppercase text-black text-xl font-medium hover:text-white transition-colors duration-300">
                Features
              </button>
              <button className="font-montserrat uppercase text-black text-xl font-medium hover:text-white transition-colors duration-300">
                Contact
              </button>
              <button className="font-montserrat uppercase text-black text-xl font-medium hover:text-white transition-colors duration-300">
                Support
              </button>
            </div>
          </div>
        )}
        {/* Centered Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <div className="text-black text-center mb-4 font-montserrat text-lg sm:text-xl font-bold tracking-wide">
            BUILD IT. BREAK IT. GET PAID
          </div>
          <Link href="/app?page=bounties" className="group relative font-montserrat bg-transparent text-[#ff5800]/90 hover:text-[#ff5800] md:text-[#ff5800]/90 md:font-bold md:hover:text-black md:hover:bg-[#ff5800] px-8 py-3 transition-all duration-500 text-xm font-bold overflow-hidden">
            {/* Moving Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shine"></div>
            
            <div className="absolute -top-0.5 -left-0.5 w-[calc(100%+1px)] h-1 bg-gradient-to-r from-black to-[#ff5800] transition-all duration-700 ease-out animate-pulse z-10"></div>
            <div className="absolute -bottom-0.5 -right-0.5 w-[calc(100%+1px)] h-1 bg-gradient-to-r from-[#ff5800] to-black transition-all duration-700 ease-out delay-100 animate-pulse z-10"></div>
            <div className="absolute -top-0.5 -left-0.5 h-[calc(100%+1px)] w-1 bg-gradient-to-b from-black to-[#ff5800] transition-all duration-700 ease-out delay-200 animate-pulse z-10"></div>
            <div className="absolute -bottom-0.5 -right-0.5 h-[calc(100%+1px)] w-1 bg-gradient-to-b from-[#ff5800] to-black transition-all duration-700 ease-out delay-300 animate-pulse z-10"></div>
            
            <span className="relative z-20 scale-105 md:scale-100 md:group-hover:scale-105 transition-transform duration-300">START APP</span>
          </Link>
        </div>

        {/* Hero/Home Content (if any) can go here */}
      </div>
      <IntroPage />
      <Footer />
    </>
  );
}
// Frontend change 1
// Frontend change 1
