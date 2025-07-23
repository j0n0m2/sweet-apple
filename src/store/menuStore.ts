import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MenuState {
  isOpen: boolean;
  open: () => void;
  close: () => void;

  menuIndex: number;
  setMenuIndex: (index: number) => void;
}

const useMenuStore = create<MenuState>()(
  persist(
    (set) => ({
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),

      menuIndex: 0,
      setMenuIndex: (index) => set({ menuIndex: index }),
    }),
    {
      name: 'menu-storage',
    }
  )
);

export const useMenu = () => {
  const isOpen = useMenuStore((s) => s.isOpen);
  const open = useMenuStore((s) => s.open);
  const close = useMenuStore((s) => s.close);

  const menuIndex = useMenuStore((s) => s.menuIndex);
  const setMenuIndex = useMenuStore((s) => s.setMenuIndex);

  return { isOpen, open, close, menuIndex, setMenuIndex };
};
