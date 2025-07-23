import { useRef, useState } from 'react';
import ScanResultModalAnimation from '@/sections/main/animations/ScanResultModalAnimation';
import ModalBackgroundAnimation from '@/sections/main/animations/ModalBackgroundAnimation';
import { downloadImage } from '@/sections/main/utils/downloadImage';
import { getScanResult } from '@/sections/main/utils/getScanResult';
import { useMenu } from '@/store/menuStore';
import { useModal } from '@/sections/main/store/modalStore';
import { useUploadApple } from '@/sections/main/hooks/useUploadApple';
import { useCapturedImage } from '@/sections/main/store/capturedImageStore';

interface Props {
  imageKey: string | null;
  sugarContent: number | null;
}

const ScanResultModal = ({ sugarContent, imageKey }: Props) => {
  const { capturedImage, setCapturedImage } = useCapturedImage();
  const { mutate, isPending } = useUploadApple();
  const { closeModal } = useModal();
  const { setMenuIndex } = useMenu();
  const [appleName, setAppleName] = useState<string>('');

  const captureRef = useRef<HTMLDivElement>(null);
  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!captureRef.current) return;

    //지정한 영역을 JPEG 이미지로 렌더링.
    downloadImage(captureRef.current, 'scan-result.jpeg');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!appleName) {
      alert('사과 이름을 입력해주세요.');
      return;
    }
    if (!capturedImage || sugarContent === null) {
      alert('이미지 데이터가 없습니다.');
      return;
    }

    mutate(
      { dataUrl: capturedImage, appleName, sugarContent },
      {
        onSuccess: () => {
          alert('마켓에 등록되었습니다!');
          closeModal();
          setAppleName('');
          setMenuIndex(1);
          setCapturedImage(null);
        },
        onError: (error) => {
          alert('업로드 실패: ' + error.message);
        },
      }
    );
  };

  return (
    <>
      {capturedImage && (
        <ScanResultModalAnimation imageKey={imageKey}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
            className="absolute top-1 right-3 cursor-pointer text-[24px]"
          >
            X
          </button>
          <div
            ref={captureRef}
            className="flex flex-col gap-2 bg-white p-2 sm:p-4"
          >
            <h1 className="text-center text-[24px] font-bold sm:text-[32px]">
              검사 결과
            </h1>
            <hr />

            <h2 className="text-center italic">
              {getScanResult(sugarContent).title}
            </h2>

            <div>
              <hr />
              <img
                src={capturedImage}
                alt="Captured face"
                className="grayscale"
              />
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
                      {getScanResult(sugarContent).message.map(
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
            <form
              className="flex flex-col items-end gap-4 p-4 pt-0"
              onSubmit={handleSubmit}
            >
              <p className="text-[14px] text-gray-400">
                *사과 이름을 적고 마켓에 올려보세요
              </p>
              <label htmlFor="서명">
                <input
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onChange={(e) => {
                    setAppleName(e.target.value);
                  }}
                  value={appleName}
                  type="text"
                  className="border-b-1 pb-2 text-right placeholder:text-right placeholder:text-gray-500"
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
                  className="flex-1 cursor-pointer rounded-lg bg-gray-400 py-2 text-gray-800"
                >
                  결과 다운로드
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="flex-2 cursor-pointer rounded-lg border-1 bg-white py-2 text-gray-800"
                >
                  {isPending ? '업로드 중...' : '마켓에 올리기'}
                </button>
              </div>
            </form>
          </div>
        </ScanResultModalAnimation>
      )}

      <ModalBackgroundAnimation />
    </>
  );
};

export default ScanResultModal;
