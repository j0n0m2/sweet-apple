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
          <div className="flex flex-col gap-2">
            <h1 className="text-center text-[32px] font-bold">
              사과 검사 결과
            </h1>

            <div>
              <hr />
              <img src={src} alt="Captured face" className="grayscale" />
              <hr />
            </div>
          </div>

          <table className="w-full">
            <tr className="border-1">
              <th className="bg-gray-300 text-center font-bold">사과정보</th>
            </tr>
            <tr className="border-1">
              <td className="p-1 text-[19px] font-bold">
                당도 : {sugarContent}%
              </td>
            </tr>
            <tr className="border-1"></tr>
            <tr className="border-1">
              <th className="bg-gray-300 text-center font-bold">효능</th>
            </tr>
            <tr className="border-1">
              <td className="p-1">
                <h2>{resultMessage(sugarContent).title}</h2>
                <p>{resultMessage(sugarContent).message}</p>
              </td>
            </tr>
          </table>

          <div>
            <form action="submit" className="flex flex-col items-end gap-2">
              <p className="text-gray-400">
                사과 이름을 적고 마켓에 올려보세요
              </p>
              <label htmlFor="서명">
                사과 이름
                <input
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  type="text"
                  className="border-1 p-1"
                  placeholder="사과 이름을 작성해주세요"
                ></input>
              </label>
              <div className="flex w-full justify-between gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  type="button"
                  className="flex-1 cursor-pointer rounded-lg bg-gray-400 px-4 py-2 text-gray-800"
                >
                  다운로드
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleModal(false);
                  }}
                  className="flex-3 cursor-pointer rounded-lg border-1 bg-white px-4 py-2 text-gray-800"
                >
                  마켓에 올리기
                </button>
              </div>
            </form>
          </div>
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
