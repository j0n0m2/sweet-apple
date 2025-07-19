import { useRef } from 'react';
import ScanResultModalAnimation from '@/sections/main/animations/ScanResultModalAnimation';
import ModalBackgroundAnimation from '@/sections/main/animations/ModalBackgroundAnimation';
import downloadImage from '@/sections/main/utils/downloadImage';
import resultMessage from '@/sections/main/utils/resultMessage';

interface Props {
  src: string | null;
  handleModal: (state: boolean) => void;
  modalOpen: boolean;
  imageKey: string | null;
  sugarContent: number | null;
}

const ScanResultModal = ({
  sugarContent,
  src,
  handleModal,
  modalOpen,
  imageKey,
}: Props) => {
  const captureRef = useRef<HTMLDivElement>(null);

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!captureRef.current) return;

    //지정한 영역을 JPEG 이미지로 렌더링.
    downloadImage(captureRef.current, 'scan-result.jpeg');
  };

  return (
    <>
      {src && (
        <ScanResultModalAnimation
          handleModal={handleModal}
          modalOpen={modalOpen}
          imageKey={imageKey}
        >
          <div ref={captureRef} className="flex flex-col gap-2 bg-white p-4">
            <h1 className="text-center text-[32px] font-bold">검사 결과</h1>
            <hr />

            <h2 className="text-center italic">
              {resultMessage(sugarContent).title}
            </h2>

            <div>
              <hr />
              <img src={src} alt="Captured face" className="grayscale" />
              <hr />
            </div>

            <table className="w-full">
              <tbody>
                <tr className="border-1">
                  <th className="bg-gray-300 text-center font-bold">
                    사과정보
                  </th>
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
                    <ul className="flex flex-col gap-2">
                      {resultMessage(sugarContent).message.map(
                        (item, index) => (
                          <li key={index}>
                            <h3 className="font-bold">• {item.subhead}</h3>
                            <p className="text-[15px] text-gray-700">
                              {item.content}
                            </p>
                          </li>
                        )
                      )}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <form action="submit" className="flex flex-col items-end gap-2 p-4">
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
                    handleDownload(e);
                  }}
                  type="button"
                  className="flex-1 cursor-pointer rounded-lg bg-gray-400 px-4 py-2 text-gray-800"
                >
                  결과 다운로드
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleModal(false);
                  }}
                  className="flex-2 cursor-pointer rounded-lg border-1 bg-white px-4 py-2 text-gray-800"
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
