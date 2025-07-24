import { create } from 'zustand';

interface ModalState {
  modalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  modalOpen: false,
  openModal: () => set({ modalOpen: true }),
  closeModal: () => set({ modalOpen: false }),
}));

export const useModal = () => {
  const modalOpen = useModalStore((s) => s.modalOpen);
  const openModal = useModalStore((s) => s.openModal);
  const closeModal = useModalStore((s) => s.closeModal);

  return { modalOpen, openModal, closeModal };
};
