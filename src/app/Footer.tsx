import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full min-h-[400px] md:min-h-[600px] lg:min-h-[810px] relative overflow-hidden flex flex-col">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-[#3b66ff]">
      </div>
      
      {/* Spacer to push buttons to bottom */}
      <div className="flex-1"></div>
      
      {/* Footer SVG */}
      <div className="relative z-10 flex justify-center px-4 sm:px-6 md:px-12 lg:px-24 xl:px-48 pb-8 md:pb-12 lg:pb-16 xl:pb-45">
        <Image 
          src="/images/footer.svg" 
          alt="Footer SVG" 
          width={400}
          height={200}
          className="w-full max-w-md md:max-w-lg lg:max-w-xl"
        />
      </div>
      
      {/* Bottom Buttons Section */}
      <div className="relative z-10 flex flex-row justify-between items-start px-4 sm:px-6 md:px-12 lg:px-24 xl:px-48 pb-8 md:pb-12 lg:pb-16 xl:pb-45 gap-4 md:gap-0">
        {/* Left Side Buttons */}
        <div className="flex flex-col gap-3 md:gap-4 w-1/2 md:w-auto">
          <button className="font-montserrat font-medium text-black hover:text-[#ff5800] transition text-lg sm:text-xl md:text-2xl flex items-center justify-start gap-2 md:gap-3 py-2 md:py-0">
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-left">INTRODUCTION</span>
          </button>
          <button className="font-montserrat font-medium text-black hover:text-[#ff5800] transition text-lg sm:text-xl md:text-2xl flex items-center justify-start gap-2 md:gap-3 py-2 md:py-0">
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-left">GET STARTED</span>
          </button>
          <button className="font-montserrat font-medium text-black hover:text-[#ff5800] transition text-lg sm:text-xl md:text-2xl flex items-center justify-start gap-2 md:gap-3 py-2 md:py-0">
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="text-left">TUTORIAL</span>
          </button>
          <button className="font-montserrat font-medium text-black hover:text-[#ff5800] transition text-lg sm:text-xl md:text-2xl flex items-center justify-start gap-2 md:gap-3 py-2 md:py-0">
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-left">PLAYGROUND</span>
          </button>
        </div>

        {/* Right Side Buttons */}
        <div className="flex flex-col gap-3 md:gap-4 w-1/2 md:w-auto">
          <button className="font-montserrat font-medium text-black hover:text-[#ff5800] transition text-lg sm:text-xl md:text-2xl flex items-center justify-start gap-2 md:gap-3 py-2 md:py-0">
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            <span className="text-left">TELEGRAM</span>
          </button>
          <button className="font-montserrat font-medium text-black hover:text-[#ff5800] transition text-lg sm:text-xl md:text-2xl flex items-center justify-start gap-2 md:gap-3 py-2 md:py-0">
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span className="text-left">TWITTER/X</span>
          </button>
          <button className="font-montserrat font-medium text-black hover:text-[#ff5800] transition text-lg sm:text-xl md:text-2xl flex items-center justify-start gap-2 md:gap-3 py-2 md:py-0">
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515a.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0a12.64 12.64 0 00-.617-1.25a.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057a19.9 19.9 0 005.993 3.03a.078.078 0 00.084-.028a14.09 14.09 0 001.226-1.994a.076.076 0 00-.041-.106a13.107 13.107 0 01-1.872-.892a.077.077 0 01-.008-.128a10.2 10.2 0 00.372-.292a.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127a12.299 12.299 0 01-1.873.892a.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028a19.839 19.839 0 006.002-3.03a.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            <span className="text-left">DISCORD</span>
          </button>
          <button className="font-montserrat font-medium text-black hover:text-[#ff5800] transition text-lg sm:text-xl md:text-2xl flex items-center justify-start gap-2 md:gap-3 py-2 md:py-0">
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-left">LOGIN/SIGNUP</span>
          </button>
        </div>
      </div>

      {/* Marquee Text at Bottom */}
      <div className="relative z-10 overflow-hidden bg-black bg-opacity-50 py-3 md:py-4">
        <div className="animate-marquee whitespace-nowrap">
          <span className="font-press-start text-[#ff5800] text-sm sm:text-base md:text-lg mx-4 sm:mx-6 md:mx-8">BUILD IT. BREAK IT. GET PAID.</span>
          <span className="font-press-start text-[#ff5800] text-sm sm:text-base md:text-lg mx-4 sm:mx-6 md:mx-8">BUILD IT. BREAK IT. GET PAID.</span>
          <span className="font-press-start text-[#ff5800] text-sm sm:text-base md:text-lg mx-4 sm:mx-6 md:mx-8">BUILD IT. BREAK IT. GET PAID.</span>
          <span className="font-press-start text-[#ff5800] text-sm sm:text-base md:text-lg mx-4 sm:mx-6 md:mx-8">BUILD IT. BREAK IT. GET PAID.</span>
          <span className="font-press-start text-[#ff5800] text-sm sm:text-base md:text-lg mx-4 sm:mx-6 md:mx-8">BUILD IT. BREAK IT. GET PAID.</span>
        </div>
      </div>
    </footer>
  );
} 