import { create } from 'zustand';

interface MenuState {
  menuIndex: number;
  setMenuIndex: (index: number) => void;
}

const useMenuStore = create<MenuState>((set) => ({
  menuIndex: 0,
  setMenuIndex: (index) => set({ menuIndex: index }),
}));

export const useMenu = () => {
  const menuIndex = useMenuStore((s) => s.menuIndex);
  const setMenuIndex = useMenuStore((s) => s.setMenuIndex);

  return { menuIndex, setMenuIndex };
};
