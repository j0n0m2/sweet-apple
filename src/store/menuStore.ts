import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MenuState {
  isMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;

  menuIndex: number;
  setMenuIndex: (index: number) => void;
}

const useMenuStore = create<MenuState>()(
  persist(
    (set) => ({
      isMenuOpen: true,
      openMenu: () => set({ isMenuOpen: true }),
      closeMenu: () => set({ isMenuOpen: false }),

      menuIndex: 0,
      setMenuIndex: (index) => set({ menuIndex: index }),
    }),
    {
      name: 'menu-storage',
    }
  )
);

export const useMenu = () => {
  const isMenuOpen = useMenuStore((s) => s.isMenuOpen);
  const openMenu = useMenuStore((s) => s.openMenu);
  const closeMenu = useMenuStore((s) => s.closeMenu);

  const menuIndex = useMenuStore((s) => s.menuIndex);
  const setMenuIndex = useMenuStore((s) => s.setMenuIndex);

  return { isMenuOpen, openMenu, closeMenu, menuIndex, setMenuIndex };
};
