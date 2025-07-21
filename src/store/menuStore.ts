import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MenuState {
  menuIndex: number;
  setMenuIndex: (index: number) => void;
}

const useMenuStore = create<MenuState>()(
  persist(
    (set) => ({
      menuIndex: 0,
      setMenuIndex: (index) => set({ menuIndex: index }),
    }),
    {
      name: 'menu-storage',
    }
  )
);

export const useMenu = () => {
  const menuIndex = useMenuStore((s) => s.menuIndex);
  const setMenuIndex = useMenuStore((s) => s.setMenuIndex);

  return { menuIndex, setMenuIndex };
};
