
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MikrotikCredentials {
  routerIp: string;
  port: string;
  username: string;
  password: string;
}

interface MikrotikState {
  isConnected: boolean;
  credentials: MikrotikCredentials | null;
  setConnectionStatus: (status: boolean) => void;
  setCredentials: (credentials: MikrotikCredentials) => void;
  logout: () => void;
}

export const useMikrotikStore = create<MikrotikState>()(
  persist(
    (set) => ({
      isConnected: false,
      credentials: null,
      setConnectionStatus: (status) => set({ isConnected }),
      setCredentials: (credentials) => set({ credentials }),
      logout: () => set({ isConnected: false, credentials: null }),
    }),
    {
      name: 'mikrotik-storage',
    }
  )
);
