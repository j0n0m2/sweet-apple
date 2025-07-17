import ModalBackgroundAnimation from '@/sections/main/animations/modalBackgroundAnimation';
import ScanResultModalAnimation from '@/sections/main/animations/ScanResultModalAnimation';
import SCAN_RESULT from '../constants/scanResultMessage';

interface Props {
  src: string | null;
  handleModal: (state: boolean) => void;
  modalOpen: boolean;
  imageKey: string | null;
  sugarContent: number | null;
}

const resultMessage = (sugarContent: number | null) => {
  if (sugarContent === null)
    return {
      title: '오류가 발생했습니다. 당도 측정을 다시 해주세요.',
      message: '',
    };
  if (sugarContent < 40) return SCAN_RESULT[0];
  if (sugarContent < 70) return SCAN_RESULT[1];
  return SCAN_RESULT[2];
};

const ScanResultModal = ({
  sugarContent,
  src,
  handleModal,
  modalOpen,
  imageKey,
}: Props) => {
  return (
    <>
      {src && (
        <ScanResultModalAnimation
          handleModal={handleModal}
          modalOpen={modalOpen}
          imageKey={imageKey}
        >
          <div className="py-2 text-center text-[32px] font-bold">
            당도 검사 결과
          </div>
          <hr />
          <img src={src} alt="Captured face" className="grayscale" />
          <div className="text-[32px] font-bold">당도 : {sugarContent}%</div>
          <div>{resultMessage(sugarContent).title}</div>
          <div>효능</div>
          <div>{resultMessage(sugarContent).message}</div>
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
