'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WalletContextType {
  connected: boolean;
  publicKey: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  signMessage: (message: string) => Promise<string>;
}

const WalletContext = createContext<WalletContextType | null>(null);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      connect?: () => Promise<{ publicKey: { toString: () => string } }>;
      disconnect?: () => Promise<void>;
      signMessage?: (message: Uint8Array) => Promise<{ signature: Uint8Array }>;
      on?: (event: string, callback: (args: any) => void) => void;
      off?: (event: string, callback: (args: any) => void) => void;
    };
  }
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);

  useEffect(() => {
    // Check if wallet is already connected
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (typeof window !== 'undefined' && window.solana) {
      try {
        const response = await window.solana.connect?.({ onlyIfTrusted: true } as any);
        if (response) {
          setPublicKey(response.publicKey.toString());
          setConnected(true);
        }
      } catch (error) {
        console.log('Not auto-connected');
      }
    }
  };

  const connect = async () => {
    if (typeof window === 'undefined') {
      throw new Error('Window is not available');
    }

    if (!window.solana) {
      window.open('https://phantom.app/', '_blank');
      throw new Error('Phantom wallet not found! Please install Phantom wallet.');
    }

    try {
      const response = await window.solana.connect?.();
      if (response) {
        setPublicKey(response.publicKey.toString());
        setConnected(true);
      }
    } catch (error) {
      throw new Error('Failed to connect wallet');
    }
  };

  const disconnect = async () => {
    if (window.solana?.disconnect) {
      await window.solana.disconnect();
    }
    setConnected(false);
    setPublicKey(null);
  };

  const signMessage = async (message: string): Promise<string> => {
    if (!window.solana?.signMessage) {
      throw new Error('Wallet does not support message signing');
    }

    const encodedMessage = new TextEncoder().encode(message);
    const signedMessage = await window.solana.signMessage(encodedMessage);
    return Buffer.from(signedMessage.signature).toString('hex');
  };

  return (
    <WalletContext.Provider
      value={{
        connected,
        publicKey,
        connect,
        disconnect,
        signMessage,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};// Frontend change 3
// Frontend change 3
