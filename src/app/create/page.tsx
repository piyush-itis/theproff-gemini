'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { apiService } from '../../services/api';

export default function CreatePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [agentData, setAgentData] = useState({
    creator: '',
    systemPrompt: '',
    tools: [{ name: '', description: '' }],
    crackTool: '',
    prizePool: '',
    avatarUrl: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAgentData(prev => ({ ...prev, [name]: value }));
  };

  const handleToolChange = (index: number, field: 'name' | 'description', value: string) => {
    setAgentData(prev => ({
      ...prev,
      tools: prev.tools.map((tool, i) => 
        i === index ? { ...tool, [field]: value } : tool
      )
    }));
  };

  const addTool = () => {
    setAgentData(prev => ({
      ...prev,
      tools: [...prev.tools, { name: '', description: '' }]
    }));
  };

  const removeTool = (index: number) => {
    setAgentData(prev => ({
      ...prev,
      tools: prev.tools.filter((_, i) => i !== index)
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Convert file to data URL for now (in production, you'd upload to a server)
      const reader = new FileReader();
      reader.onloadend = () => {
        setAgentData(prev => ({ ...prev, avatarUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      // Validate required fields
      if (!agentData.creator || !agentData.systemPrompt || !agentData.crackTool || !agentData.prizePool) {
        throw new Error('Please fill in all required fields');
      }

      // Validate tools
      const validTools = agentData.tools.filter(tool => tool.name && tool.description);
      if (validTools.length === 0) {
        throw new Error('Please add at least one tool');
      }

      // Check if crackTool exists in tools
      const crackToolExists = validTools.some(tool => tool.name === agentData.crackTool);
      if (!crackToolExists) {
        throw new Error('Crack tool must be one of the defined tools');
      }

      // Create agent via API
      const createdAgent = await apiService.createAgent({
        creator: agentData.creator,
        systemPrompt: agentData.systemPrompt,
        tools: validTools,
        crackTool: agentData.crackTool,
        prizePool: parseFloat(agentData.prizePool),
        avatarUrl: agentData.avatarUrl || undefined
      });

      // Show success message
      setSuccess('Agent created successfully! Redirecting...');
      
      // Wait a moment to show success message, then redirect
      setTimeout(() => {
        router.push('/app?page=bounties');
      }, 1500);
    } catch (err) {
      console.error('Failed to create agent:', err);
      setError(err instanceof Error ? err.message : 'Failed to create agent. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
        

        {/* Page Title */}
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-3 font-press-start">
            Create Agent
          </h1>
          <p className="text-white/60 text-xs sm:text-sm max-w-md mx-auto">
            Design and deploy your AI agent for the battle arena
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-2xl mx-auto relative">
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 text-red-400 text-sm rounded animate-fade-in">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 text-green-400 text-sm rounded animate-fade-in">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{success}</span>
            </div>
          </div>
        )}
        {isLoading && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center rounded-lg">
            <div className="bg-black/90 border border-[#ff5800]/50 p-8 rounded-lg flex flex-col items-center gap-4">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 border-4 border-[#ff5800]/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-transparent border-t-[#ff5800] rounded-full animate-spin"></div>
              </div>
              <p className="text-white font-medium text-sm">Creating agent...</p>
              <p className="text-white/60 text-xs">Please wait</p>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className={`space-y-6 sm:space-y-8 ${isLoading ? 'pointer-events-none opacity-50' : ''}`}>
          {/* Basic Info Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-[#ff5800]"></div>
              <h2 className="text-lg font-semibold text-white">Basic Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-white/80 mb-2 uppercase tracking-wider">
                  Creator Name *
                </label>
                <input
                  type="text"
                  name="creator"
                  value={agentData.creator}
                  onChange={handleInputChange}
                  className="w-full bg-black/20 border border-gray-800/30 px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#ff5800] transition-all duration-300 text-sm"
                  placeholder="Your username"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/80 mb-2 uppercase tracking-wider">
                  Prize Pool *
                </label>
                <input
                  type="number"
                  name="prizePool"
                  value={agentData.prizePool}
                  onChange={handleInputChange}
                  className="w-full bg-black/20 border border-gray-800/30 px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#ff5800] transition-all duration-300 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-white/80 mb-2 uppercase tracking-wider">
                System Prompt *
              </label>
              <textarea
                name="systemPrompt"
                value={agentData.systemPrompt}
                onChange={handleInputChange}
                rows={4}
                className="w-full bg-black/20 border border-gray-800/30 px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#ff5800] transition-all duration-300 resize-none text-sm"
                placeholder="Define your agent's behavior, personality, and instructions..."
                required
              />
              <p className="text-xs text-white/40 mt-1">
                This is the system prompt that defines how your agent behaves
              </p>
            </div>
          </div>

          {/* Tools Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-[#ff5800]"></div>
              <h2 className="text-lg font-semibold text-white">Tools *</h2>
            </div>
            
            <div className="space-y-4">
              {agentData.tools.map((tool, index) => (
                <div key={index} className="bg-black/20 border border-gray-800/30 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/60 font-medium">Tool {index + 1}</span>
                    {agentData.tools.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTool(index)}
                        className="text-red-400 hover:text-red-300 text-xs"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-white/80 mb-1 uppercase tracking-wider">
                        Tool Name
                      </label>
                      <input
                        type="text"
                        value={tool.name}
                        onChange={(e) => handleToolChange(index, 'name', e.target.value)}
                        className="w-full bg-black/20 border border-gray-800/30 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-[#ff5800] transition-all duration-300 text-sm"
                        placeholder="e.g., hack, exploit, crack"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/80 mb-1 uppercase tracking-wider">
                        Description
                      </label>
                      <input
                        type="text"
                        value={tool.description}
                        onChange={(e) => handleToolChange(index, 'description', e.target.value)}
                        className="w-full bg-black/20 border border-gray-800/30 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-[#ff5800] transition-all duration-300 text-sm"
                        placeholder="What this tool does"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addTool}
                className="w-full px-4 py-2 border border-gray-800/30 text-white/70 hover:border-[#ff5800] hover:text-[#ff5800] transition-all duration-300 text-sm"
              >
                + Add Tool
              </button>
            </div>

            <div>
              <label className="block text-xs font-medium text-white/80 mb-2 uppercase tracking-wider">
                Crack Tool * (The tool name that cracks this agent)
              </label>
              <select
                name="crackTool"
                value={agentData.crackTool}
                onChange={handleInputChange}
                className="w-full bg-black/20 border border-gray-800/30 px-3 sm:px-4 py-2 sm:py-3 text-white focus:outline-none focus:border-[#ff5800] transition-all duration-300 text-sm"
                required
              >
                <option value="">Select a tool...</option>
                {agentData.tools
                  .filter(tool => tool.name)
                  .map((tool, index) => (
                    <option key={index} value={tool.name}>
                      {tool.name}
                    </option>
                  ))}
              </select>
              <p className="text-xs text-white/40 mt-1">
                When a user gets the agent to use this tool, the agent is "cracked" and the prize pool is awarded
              </p>
            </div>
          </div>

          {/* Avatar Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-[#ff5800]"></div>
              <h2 className="text-lg font-semibold text-white">Avatar (Optional)</h2>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-[#ff5800]/20 border border-[#ff5800]/30 flex items-center justify-center">
                {agentData.avatarUrl ? (
                  <Image
                    src={agentData.avatarUrl}
                    alt="Agent Avatar"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="avatar-upload"
                />
                <label
                  htmlFor="avatar-upload"
                  className="inline-flex items-center gap-2 px-4 py-2 text-[#ff5800] hover:text-white text-sm font-medium cursor-pointer transition-all duration-300 relative overflow-hidden group border border-[#ff5800]/30 hover:border-[#ff5800] hover:shadow-[0_0_10px_rgba(255,88,0,0.2)]"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Upload Image
                </label>
                <p className="text-xs text-white/40 mt-1">
                  256x256px recommended (or enter URL below)
                </p>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/80 mb-2 uppercase tracking-wider">
                Avatar URL (Alternative to file upload)
              </label>
              <input
                type="url"
                name="avatarUrl"
                value={agentData.avatarUrl}
                onChange={handleInputChange}
                className="w-full bg-black/20 border border-gray-800/30 px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#ff5800] transition-all duration-300 text-sm"
                placeholder="https://example.com/avatar.png"
              />
            </div>
          </div>


          {/* Action Buttons */}
          <div className="flex items-center gap-3 sm:gap-4 pt-6 sm:pt-8">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 text-[#ff5800] hover:text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 transition-all duration-300 relative overflow-hidden group border border-[#ff5800]/30 hover:border-[#ff5800] hover:shadow-[0_0_20px_rgba(255,88,0,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading && (
                <div className="relative w-4 h-4">
                  <div className="absolute inset-0 border-2 border-[#ff5800]/20 rounded-full"></div>
                  <div className="absolute inset-0 border-2 border-transparent border-t-[#ff5800] rounded-full animate-spin"></div>
                </div>
              )}
              <span className="relative z-10 tracking-wider group-hover:scale-105 transition-transform duration-300 text-sm">
                {isLoading ? 'Creating Agent...' : 'Create Agent'}
              </span>
              {!isLoading && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff5800]/10 via-[#ff5800]/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-[#ff5800] to-[#ff8c00] transition-all duration-300"></div>
                </>
              )}
            </button>
            <Link
              href="/app"
              className={`px-4 sm:px-6 py-2 sm:py-3 border border-gray-800/30 text-white/70 hover:border-white/40 hover:text-white transition-all duration-300 text-sm ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 