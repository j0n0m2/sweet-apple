import { create } from 'zustand';

interface ModalState {
  modalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  modalOpen: false,
  openModal: () => set({ modalOpen: true }),
  closeModal: () => set({ modalOpen: false }),
  toggleModal: () => set((state) => ({ modalOpen: !state.modalOpen })),
}));

export const useModal = () => {
  const modalOpen = useModalStore((s) => s.modalOpen);
  const openModal = useModalStore((s) => s.openModal);
  const closeModal = useModalStore((s) => s.closeModal);
  const toggleModal = useModalStore((s) => s.toggleModal);

  return { modalOpen, openModal, closeModal, toggleModal };
};
