
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MikrotikCredentials {
  routerIp: string;
  port: string;
  username: string;
  password: string;
  macAddress?: string;
}

interface MikrotikState {
  isConnected: boolean;
  credentials: MikrotikCredentials | null;
  authMethod: 'credentials' | 'mac';
  setConnectionStatus: (status: boolean) => void;
  setCredentials: (credentials: MikrotikCredentials) => void;
  setAuthMethod: (method: 'credentials' | 'mac') => void;
  logout: () => void;
}

export const useMikrotikStore = create<MikrotikState>()(
  persist(
    (set) => ({
      isConnected: false,
      credentials: null,
      authMethod: 'credentials',
      setConnectionStatus: (status) => set({ isConnected: status }),
      setCredentials: (credentials) => set({ credentials }),
      setAuthMethod: (method) => set({ authMethod: method }),
      logout: () => set({ isConnected: false, credentials: null }),
    }),
    {
      name: 'mikrotik-storage',
    }
  )
);
