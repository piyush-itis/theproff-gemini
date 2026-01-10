'use client';

import React, { useState } from 'react';
import { useWallet } from './WalletProvider';
import Image from 'next/image';

const WalletButton: React.FC = () => {
  const { connected, publicKey, connect, disconnect } = useWallet();
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      await connect();
    } catch (error) {
      console.error('Wallet connection failed:', error);
      alert(error instanceof Error ? error.message : 'Failed to connect wallet');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    await disconnect();
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (connected && publicKey) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-black/20 border border-[#ff5800]/30 px-3 py-2 rounded">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <span className="text-white text-sm font-mono">
            {truncateAddress(publicKey)}
          </span>
        </div>
        <button
          onClick={handleDisconnect}
          className="text-white/60 hover:text-red-400 transition-colors p-2"
          title="Disconnect wallet"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H3m0 0l3-3m-3 3l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      disabled={isLoading}
      className="group relative flex items-center gap-2 bg-[#ff5800] hover:bg-[#ff5800]/80 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 font-medium transition-all duration-300 border border-transparent hover:border-white/20"
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
      ) : (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.1 2C6.58 2 2.1 6.48 2.1 12S6.58 22 12.1 22c1.45 0 2.83-.31 4.07-.87.2-.09.33-.29.33-.51 0-.32-.26-.58-.58-.58-.18 0-.34.08-.45.2-.98.46-2.07.71-3.37.71-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8c0 1.3-.25 2.39-.71 3.37-.12.11-.2.27-.2.45 0 .32.26.58.58.58.22 0 .42-.13.51-.33.56-1.24.87-2.62.87-4.07-.05-5.52-4.53-10-10.05-10z"/>
        </svg>
      )}
      <span className="font-press-start text-xs">
        {isLoading ? 'CONNECTING...' : 'CONNECT WALLET'}
      </span>
    </button>
  );
};

export default WalletButton;// Frontend change 2
// Frontend change 2
