import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  handleModal: (state: boolean) => void;
  modalOpen: boolean;
  imageKey: string | null;
  children?: React.ReactNode;
}

const ScanResultModalAnimation = ({
  handleModal,
  modalOpen,
  imageKey,
  children,
}: Props) => {
  return (
    <AnimatePresence mode="wait">
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
        className="fixed left-1/2 z-50 flex h-200 w-100 -translate-x-1/2 cursor-pointer flex-col justify-between border-2 border-black bg-white"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default ScanResultModalAnimation;
