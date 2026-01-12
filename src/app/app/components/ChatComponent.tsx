'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { apiService } from '../../../services/api';

interface Agent {
  id?: string;
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

interface Message {
  id: string;
  sender: 'user' | 'agent';
  content: string;
  timestamp: string;
  agentAction?: string;
  userName?: string;
}

interface ChatComponentProps {
  agent: Agent;
  onBack: () => void;
}

export default function ChatComponent({ agent, onBack }: ChatComponentProps) {
  const [activeTab, setActiveTab] = useState<'global' | 'my'>('global');
  const [message, setMessage] = useState('');
  const [isDetailsPanelCollapsed, setIsDetailsPanelCollapsed] = useState(false);
  const [showMobileInfo, setShowMobileInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agentCracked, setAgentCracked] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = async () => {
    if (message.trim() && !isLoading && agent.id) {
      const userMessage: Message = {
        id: Date.now().toString(),
        sender: 'user',
        content: message,
        timestamp: new Date().toLocaleString(),
        userName: 'user'
      };
      
      setMessages(prev => [...prev, userMessage]);
      setMessage('');
      setIsLoading(true);
      
      // Maintain focus on input after sending message
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
      
      try {
        const response = await apiService.sendMessage(agent.id, {
          sender: 'user',
          content: userMessage.content
        });
        
        const agentResponse: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'agent',
          content: response.response,
          timestamp: new Date().toLocaleString(),
          agentAction: response.tool_call ? `Agent used ${response.tool_call}` : undefined
        };
        
        setMessages(prev => [...prev, agentResponse]);
        
        if (response.cracked) {
          setAgentCracked(true);
        }
      } catch (error) {
        console.error('Failed to send message:', error);
        const errorMessage: Message = {
          id: (Date.now() + 2).toString(),
          sender: 'agent',
          content: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date().toLocaleString()
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle mobile info toggle
  const handleMobileInfoToggle = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setShowMobileInfo(!showMobileInfo);
    } else {
      // Desktop behavior - toggle panel collapse
      setIsDetailsPanelCollapsed(!isDetailsPanelCollapsed);
    }
  };

  return (
    <div className="h-full bg-black flex flex-col md:flex-row">
      {/* Chat Section - Left Side */}
      <div className={`flex-1 flex flex-col border-l border-white/10 ${showMobileInfo ? 'hidden md:flex' : 'flex'}`}>
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex">
            <button
              onClick={() => setActiveTab('global')}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                activeTab === 'global'
                  ? 'bg-[#ff5800] text-black'
                  : 'bg-black text-white/60'
              }`}
            >
              <span className="font-mono tracking-wide">global chat</span>
            </button>
            <button
              onClick={() => setActiveTab('my')}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                activeTab === 'my'
                  ? 'bg-[#ff5800] text-black'
                  : 'bg-black text-white/60'
              }`}
            >
              <span className="font-mono tracking-wide">my chat</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleMobileInfoToggle}
              className="text-white/60 hover:text-[#ff5800] transition-all duration-300 px-3 py-1.5 border border-white/20 hover:border-[#ff5800] hover:shadow-[0_0_8px_rgba(255,88,0,0.3)] font-mono text-xs tracking-wide"
            >
              info
            </button>
            <button
              onClick={onBack}
              className="text-white/60 hover:text-[#ff5800] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto md:overflow-y-auto overflow-hidden p-3 space-y-3">
          {agentCracked && (
            <div className="text-center py-4">
              <div className="inline-block bg-green-600/20 border border-green-600/50 px-4 py-2 rounded">
                <span className="text-green-400 font-bold">🎉 AGENT CRACKED! 🎉</span>
              </div>
            </div>
          )}
          
          {messages.length === 0 && !isLoading && (
            <div className="text-center text-white/50 py-8">
              <p>Start a conversation with {agent.name}</p>
            </div>
          )}
          
          {messages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-2">
              {msg.sender === 'agent' && (
                <div className="w-6 h-6 bg-black/20 border border-[#ff5800]/30 flex items-center justify-center flex-shrink-0">
                  <Image
                    src={agent.avatar}
                    alt={agent.name}
                    width={24}
                    height={24}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {msg.sender === 'user' && (
                <div className="w-6 h-6 bg-black/20 border border-white/30 flex items-center justify-center flex-shrink-0">
                  <div className="w-4 h-4 bg-[#ff5800] rounded-sm flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{msg.userName?.charAt(0).toUpperCase()}</span>
                  </div>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    {msg.sender === 'agent' && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-white font-mono">{agent.name}</span>
                        {msg.agentAction && (
                          <span className="text-xs text-[#ff5800] font-mono">{msg.agentAction}</span>
                        )}
                      </div>
                    )}
                    {msg.sender === 'user' && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-white font-mono">{msg.userName}</span>
                      </div>
                    )}
                    <div className="text-xs text-white">{msg.content}</div>
                  </div>
                  <div className="text-[10px] text-white/50 font-mono flex-shrink-0">{msg.timestamp}</div>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 bg-black/20 border border-[#ff5800]/30 flex items-center justify-center flex-shrink-0">
                <Image
                  src={agent.avatar}
                  alt={agent.name}
                  width={24}
                  height={24}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-white font-mono">{agent.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-[#ff5800] rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-[#ff5800] rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-[#ff5800] rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-3 md:m-12 mb-32 md:mb-48 m-6">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`say something to ${agent.name}...`}
                className="w-full bg-black/20 border-b-2 border-white/20 px-2 py-1.5 text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#ff5800] transition-all duration-300 font-mono"
              />
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#ff5800] to-[#ff8c00] transition-all duration-300 group-focus-within:w-full"></div>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !message.trim()}
              className="text-[#ff5800] hover:text-white transition-all duration-300 p-1 relative overflow-hidden group border border-[#ff5800]/30 hover:border-[#ff5800] hover:shadow-[0_0_10px_rgba(255,88,0,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff5800]/10 via-[#ff5800]/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Agent Details Panel - Right Side */}
      <div className={`${showMobileInfo ? 'w-full' : isDetailsPanelCollapsed ? 'w-0' : 'hidden md:block md:w-80'} bg-white/3 border-l border-white/10 p-6 flex flex-col transition-all duration-300 overflow-hidden`}>
        {(showMobileInfo || !isDetailsPanelCollapsed) && (
          <>
            {/* Mobile Close Button */}
            {showMobileInfo && (
              <div className="flex justify-end mb-4 md:hidden">
                <button
                  onClick={() => setShowMobileInfo(false)}
                  className="text-white/60 hover:text-white transition-colors p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            
            {/* Agent Image */}
            <div className="flex justify-center px-4 mb-4">
              <div className="w-48 h-48 bg-black/20 border border-[#ff5800]/30">
                <Image
                  src={agent.avatar}
                  alt={agent.name}
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Agent Name */}
            <div className="px-4 mb-6">
              <h2 className="text-2xl font-bold text-white text-center">{agent.name}</h2>
            </div>

            {/* Agent Details */}
            <div className="px-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/60">Prize Pool</span>
                <span className="text-sm text-white font-medium">{agent.prizePool}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/60">Crack Attempts</span>
                <span className="text-sm text-white font-medium">{agent.crackAttempts}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/60">Message Price</span>
                <span className="text-sm text-white font-medium">{agent.messagePrice}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/60">Time Remaining</span>
                <span className="text-sm text-white font-medium">{agent.timeRemaining}</span>
              </div>
            </div>

            {/* Creator */}
            <div className="px-4 mt-6">
              <span className="text-sm text-white/60 block mb-2">Creator</span>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-black/20 border border-[#ff5800]/30 flex items-center justify-center">
                  <Image
                    src={agent.creatorAvatar}
                    alt="img"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm text-white font-mono">{agent.creator}</span>
              </div>
            </div>

            {/* Description */}
            <div className="px-4 mt-6 flex-1">
              <span className="text-sm text-white/60 block mb-2">Description</span>
              <p className="text-sm text-white leading-relaxed">{agent.description}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 