import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppState {
  // Theme state
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
  toggleTheme: () => void;

  // Profile state
  userName: string;
  setUserName: (name: string) => void;
  userImageIndex: number;
  setUserImageIndex: (index: number) => void;
  toggleUserImage: () => void;

  // Index state
  isSectionListEnabled: boolean;
  toggleSectionList: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Theme state
      isDark: false,
      setIsDark: (isDark) => set({ isDark }),
      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),

      // Profile state
      userName: '',
      setUserName: (userName) => set({ userName }),
      userImageIndex: 0,
      setUserImageIndex: (userImageIndex) => set({ userImageIndex }),
      toggleUserImage: () => set((state) => ({ userImageIndex: state.userImageIndex === 0 ? 1 : 0 })),

      // Index state
      isSectionListEnabled: false,
      toggleSectionList: () => set((state) => ({ isSectionListEnabled: !state.isSectionListEnabled })),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
