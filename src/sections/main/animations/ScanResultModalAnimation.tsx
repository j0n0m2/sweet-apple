import { AnimatePresence, motion } from 'framer-motion';
import { useModal } from '../store/modalStore';
import { useMediaQuery } from 'react-responsive';
import clsx from 'clsx';

interface Props {
  imageKey: string | null;
  children?: React.ReactNode;
  ref: React.Ref<HTMLDivElement>;
}

const ScanResultModalAnimation = ({ imageKey, children, ref }: Props) => {
  const { modalOpen, openModal } = useModal();

  // react-responsive 사용해서 모바일 여부 감지
  const isMobile = useMediaQuery({ query: '(max-height: 1000px)' });
  const isMobileSmall = useMediaQuery({ query: '(max-height: 700px)' });

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          // 이미지 키가 새로 들어오면 모달이 화면 밖으로 나갔다가 다시 들어오도록 key로 설정
          key={imageKey}
          initial={{ top: '150dvh', y: '-50%' }}
          onClick={() => openModal()}
          animate={{
            top: modalOpen
              ? '50dvh'
              : isMobileSmall
                ? '135dvh'
                : isMobile
                  ? '138dvh'
                  : '130dvh',
            y: '-50%',
          }}
          exit={{ top: isMobile ? '180dvh' : '200dvh', y: '-50%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 50 }}
          className={clsx(
            'fixed left-1/2 z-50 flex max-h-[95dvh] w-[90vw] -translate-x-1/2 cursor-pointer flex-col justify-between border-2 border-black bg-white sm:w-100',
            modalOpen ? 'overflow-y-scroll' : 'overflow-no-scroll'
          )}
          style={{ willChange: 'top, transform' }}
          ref={ref}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default ScanResultModalAnimation;
