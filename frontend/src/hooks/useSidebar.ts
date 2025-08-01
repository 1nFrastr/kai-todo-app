import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SidebarState {
  isExpanded: boolean;
  toggleSidebar: () => void;
  setSidebarExpanded: (expanded: boolean) => void;
}

export const useSidebar = create<SidebarState>()(
  persist(
    (set) => ({
      isExpanded: true,
      toggleSidebar: () => set((state) => ({ isExpanded: !state.isExpanded })),
      setSidebarExpanded: (expanded: boolean) => set({ isExpanded: expanded }),
    }),
    {
      name: 'sidebar-state', // key in localStorage
    }
  )
);
