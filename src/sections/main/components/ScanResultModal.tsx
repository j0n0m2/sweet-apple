import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  src: string | null;
  handleModal: (state: boolean) => void;
  modalOpen: boolean;
  imageKey: string;
}

const ScanResultModal = ({ src, handleModal, modalOpen, imageKey }: Props) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {src && (
          <motion.div
            key={imageKey}
            onClick={() => handleModal(!modalOpen)}
            initial={{ top: '150vh', y: '-50%' }}
            animate={{
              top: modalOpen ? '50vh' : '130vh',
              y: '-50%',
            }}
            exit={{ top: '150vh', y: '-50%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 50 }}
            className="fixed left-1/2 z-50 h-200 w-100 -translate-x-1/2 cursor-pointer border-2 border-black bg-white p-4"
          >
            <img src={src} alt="Captured face" className="w-60 grayscale" />
          </motion.div>
        )}
      </AnimatePresence>

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
    </>
  );
};

export default ScanResultModal;
