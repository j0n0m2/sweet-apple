import ModalBackgroundAnimation from '@/sections/main/animations/modalBackgroundAnimation';
import ScanResultModalAnimation from '@/sections/main/animations/ScanResultModalAnimation';

interface Props {
  src: string | null;
  handleModal: (state: boolean) => void;
  modalOpen: boolean;
  imageKey: string;
}

const ScanResultModal = ({ src, handleModal, modalOpen, imageKey }: Props) => {
  return (
    <>
      {src && (
        <ScanResultModalAnimation
          handleModal={handleModal}
          modalOpen={modalOpen}
          imageKey={imageKey}
        >
          <img src={src} alt="Captured face" className="w-60 grayscale" />
          
        </ScanResultModalAnimation>
      )}

      <ModalBackgroundAnimation
        handleModal={handleModal}
        modalOpen={modalOpen}
      />
    </>
  );
};

export default ScanResultModal;
