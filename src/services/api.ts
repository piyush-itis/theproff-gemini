// API service for backend integration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface Agent {
  id: string;
  creator: string;
  systemPrompt: string;
  tools: string;
  crackTool: string;
  prizePool: number;
  currentEarnings?: number;
  isCracked: boolean;
  crackedBy?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
  totalAttempts?: number;
  successfulCracks?: number;
  messages?: Message[];
}

export interface Message {
  id: string;
  agentId: string;
  sender: string;
  content: string;
  toolUsed?: string;
  createdAt: string;
}

export interface Tool {
  name: string;
  description: string;
}

export interface AgentCreateRequest {
  creator: string;
  systemPrompt: string;
  tools: Tool[];
  crackTool: string;
  prizePool: number;
  avatarUrl?: string;
}

export interface ChatMessage {
  sender: string;
  content: string;
}

export interface ChatResponse {
  tool_call?: string;
  response: string;
  cracked: boolean;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Agent endpoints
  async getAgents(sort: 'latest' | 'biggest' | 'cracked' = 'latest', limit: number = 50): Promise<Agent[]> {
    return this.request<Agent[]>(`/agents?sort=${sort}&limit=${limit}`);
  }

  async getAgent(agentId: string): Promise<Agent> {
    return this.request<Agent>(`/agents/${agentId}`);
  }

  async createAgent(agent: AgentCreateRequest): Promise<Agent> {
    return this.request<Agent>('/agents', {
      method: 'POST',
      body: JSON.stringify(agent),
    });
  }

  // Chat endpoints
  async sendMessage(agentId: string, message: ChatMessage): Promise<ChatResponse> {
    return this.request<ChatResponse>(`/chat/${agentId}`, {
      method: 'POST',
      body: JSON.stringify(message),
    });
  }

  // Health check
  async healthCheck(): Promise<{ status: string }> {
    return this.request<{ status: string }>('/health');
  }
}

export const apiService = new ApiService();// Frontend change 7
// Frontend change 7
