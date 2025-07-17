import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  handleModal: (state: boolean) => void;
  modalOpen: boolean;
}

const ModalBackgroundAnimation = ({ handleModal, modalOpen }: Props) => {
  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => handleModal(false)}
          className="bg-opacity-50 fixed top-0 left-0 z-40 h-full w-full bg-[rgba(0,0,0,0.5)]"
        />
      )}
    </AnimatePresence>
  );
};

export default ModalBackgroundAnimation;
