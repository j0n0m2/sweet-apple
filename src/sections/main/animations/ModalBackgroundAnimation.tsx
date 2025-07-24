import { AnimatePresence, motion } from 'framer-motion';
import { useModal } from '@/sections/main/store/modalStore';

const ModalBackgroundAnimation = () => {
  const { modalOpen, closeModal } = useModal();
  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => closeModal()}
          className="bg-opacity-50 fixed top-0 left-0 z-40 h-full w-full bg-[rgba(0,0,0,0.5)]"
        />
      )}
    </AnimatePresence>
  );
};

export default ModalBackgroundAnimation;
