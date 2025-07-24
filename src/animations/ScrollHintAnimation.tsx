import { AnimatePresence, motion } from 'framer-motion';

const ScrollHintAnimation = () => {
  return (
    <AnimatePresence>
      <motion.div
        key="scroll-hint"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 0.8, ease: 'easeIn' },
        }}
        exit={{
          opacity: 0,
          transition: { duration: 0.1, ease: 'easeIn' },
        }}
        className="pointer-events-none fixed bottom-4 left-1/2 z-70 flex h-24 w-[90dvw] -translate-x-1/2 items-end justify-center bg-gradient-to-t from-white to-transparent"
      >
        <div className="mb-1 animate-bounce text-[24px] text-black">↓</div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ScrollHintAnimation;
