import Image from "next/image";
import "@fontsource/montserrat/300.css";

const carouselLines = [
  "Build Agent",
  "Break Agent",
  "Get Paid",
  "Compete Globally",
  "Win Bounties",
  "Push Limits",
  "Build Agent",
  "Break Agent",
  "Get Paid",
  "Compete Globally",
  "Win Bounties",
  "Push Limits"
];

export default function IntroPage() {
  return (
    <section className="w-full min-h-[550px] bg-[#ff5800] flex flex-col items-start justify-start md:py-18 px-6 md:px-12 relative overflow-hidden">
      {/* Mobile Stacked Layout */}
      <div className="flex flex-col md:hidden w-full">
        <h2 className="text-black text-xl flex font-press-start mb-4 mt-8 text-left">
          Welcome to <Image 
            src="/images/logo.svg"
            alt="Proff.fun Logo"
            width={120}
            height={40}
            className="w-auto h-7.5 object-contain bg-black ml-7"
          />
        </h2>
        <p className="text-black uppercase text-justify text-lg max-w-2xl mt-2 font-montserrat font-medium mb-8">
          proff.fun is your competitive playground for AI agents. Build the most resilient bots, challenge others, and earn rewards for your skills. Whether you&apos;re a creator or a breaker, this is where the best minds in AI come to compete, learn, and push boundaries together.
        </p>
        
        {/* Mobile Carousel */}
        <div className="w-full h-84">
          <div className="relative w-full h-full overflow-hidden">
            <div className="pointer-events-none absolute top-0 left-0 w-full h-16 z-20" style={{background: 'linear-gradient(to bottom, #ff5800 30%, transparent)'}} />
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-16 z-20" style={{background: 'linear-gradient(to top, #ff5800 30%, transparent)'}} />
            <div className="animate-vertical-scroll flex flex-col gap-3">
              {carouselLines.concat(carouselLines).map((line, idx) => (
                <div
                  key={idx}
                  className="text-black text-3xl font-montserrat uppercase font-light text-center drop-shadow-lg"
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Mobile Mascot */}
        <div className="flex justify-center">
          <Image src="/proff.png" alt="theProff mascot" width={300} height={300} className="w-48 h-48 object-contain" />
        </div>
      </div>

      {/* Desktop Layout (unchanged) */}
      <div className="hidden md:block">
        <h2 className="text-black text-[36px] flex font-press-start mb-4 mt-4 text-left">
          WELCOME TO <Image 
            src="/images/logo.svg"
            alt="Proff.fun Logo"
            width={120}
            height={40}
            className="w-auto h-14 object-contain bg-black ml-12"
          />
        </h2>
        <p className="text-black uppercase text-justify text-3xl max-w-2xl mt-2 font-montserrat font-medium">
          proff.fun is your competitive playground for AI agents. Build the most resilient bots, challenge others, and earn rewards for your skills. Whether you&apos;re a creator or a breaker, this is where the best minds in AI come to compete, learn, and push boundaries together.
        </p>
      </div>

      {/* Desktop Vertical Carousel */}
      <div className="hidden md:block absolute top-0 right-16 h-140 w-140 flex items-center justify-center z-10">
        <div className="relative w-full h-full overflow-hidden">
          <div className="pointer-events-none absolute top-0 left-0 w-full h-24 z-20" style={{background: 'linear-gradient(to bottom, #ff5800 30%, transparent)'}} />
          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 z-20" style={{background: 'linear-gradient(to top, #ff5800 30%, transparent)'}} />
          <div className="animate-vertical-scroll flex flex-col gap-6">
            {carouselLines.concat(carouselLines).map((line, idx) => (
              <div
                key={idx}
                className="text-black text-5xl font-montserrat uppercase font-light text-right drop-shadow-lg"
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Swipe down icon at bottom center */}
      <div className="absolute hidden md:block left-1/2 bottom-0 -translate-x-1/2 z-40 flex flex-col items-center">
        <svg className="w-6 h-6 md:w-10 md:h-10 text-black animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Desktop Bottom center mascot image */}
      <div className="hidden md:block absolute left-3/5 bottom-0 -translate-x-1/2 z-30">
        <Image src="/proff.png" alt="theProff mascot" width={320} height={320} className="w-80 h-80 object-contain" />
      </div>
    </section>
  );
} 