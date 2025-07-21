import { AnimatePresence, motion } from 'framer-motion';
import { useModal } from '../store/modalStore';

interface Props {
  imageKey: string | null;
  children?: React.ReactNode;
}

const ScanResultModalAnimation = ({ imageKey, children }: Props) => {
  const { modalOpen, toggleModal } = useModal();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        // 이미지 키가 새로 들어오면 모달이 화면 밖으로 나갔다가 다시 들어오도록 key로 설정
        key={imageKey}
        onClick={() => toggleModal()}
        initial={{ top: '150vh', y: '-50%' }}
        animate={{
          top: modalOpen ? '50vh' : '130vh',
          y: '-50%',
        }}
        exit={{ top: '150vh', y: '-50%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 50 }}
        className="fixed left-1/2 z-50 flex w-100 -translate-x-1/2 cursor-pointer flex-col justify-between border-2 border-black bg-white"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default ScanResultModalAnimation;
