import { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import type { Part } from '@/sections/main/model/type';
import { useFaceApi } from '@/sections/main/hooks/useFaceApi';
import { initialParts } from '@/sections/main/model/parts';
import { useDragHandlers } from '@/sections/main/hooks/useDragHandlers';
import { IMAGE_RANGE } from '@/sections/main/constants/imageRange';
import { THRESHOLD } from '@/sections/main/constants/emotionsThreshold';
import BackgroundCircle from '@/sections/main/ui/BackgroundCircle';
import ScanResultModal from './components/ScanResultModal';
import Header from './ui/Header';

const FaceCanvas = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [imageKey, setImageKey] = useState<string>('');
  const [openScanResultModal, isOpenScanResultModal] = useState<boolean>(false);

  const handleCapture = () => {
    const canvas = canvasRef.current;

    // 현재 사과 이미지 저장
    const activeImage =
      imageContainerRef.current?.querySelector('img.opacity-100');

    // 캡쳐한 이미지를 저장하기 위한 임시 캔버스 생성
    const tmp = document.createElement('canvas');
    tmp.width = canvas.width;
    tmp.height = canvas.height;
    const tmpCtx = tmp.getContext('2d')!;

    // 저장해둔 사과 이미지 그리기
    tmpCtx.drawImage(
      activeImage as HTMLImageElement,
      0,
      0,
      tmp.width,
      tmp.height
    );

    // 표정 캔버스 합치기
    tmpCtx.drawImage(canvas, 0, 0);

    // 저장
    const imageDataUrl = tmp.toDataURL('image/webp');
    setCapturedImage(imageDataUrl);

    // 이미지 키 설정
    setImageKey(Date.now().toString());
  };

  const videoRef = useRef<HTMLVideoElement>(null!);
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const partsRef = useRef<Part[]>(initialParts);
  const dragState = useRef<{
    dragPart: null | Part;
    offsetX: number;
    offsetY: number;
  }>({ dragPart: null, offsetX: 0, offsetY: 0 });

  const imageNumberRef = useRef(1);
  const lastImageNumberRef = useRef(-1);

  // face api model load 및 캠 활성화
  useFaceApi(videoRef);
  useDragHandlers(canvasRef, dragState, partsRef);

  useEffect(() => {
    const video = videoRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const displaySize = { width: video.width, height: video.height };

    // 이미지 깜빡거림을 최소화하기 위해 이미지 미리 로드 후 클래스 부여
    // active 클래스가 부여된 img 요소만 보이게 됨
    for (let i = IMAGE_RANGE.first; i <= IMAGE_RANGE.last; i++) {
      const img = document.createElement('img');
      img.src = `/img/${i}.png`;
      img.id = `img${i}`;
      img.className = 'absolute top-0 left-0 w-full h-full opacity-0 z-[1]';
      imageContainerRef.current!.appendChild(img);
    }

    // 기본 이미지 설정
    const firstImg = document.getElementById(`img${IMAGE_RANGE.first}`);
    firstImg?.classList.add('opacity-100', 'z-[2]');
    lastImageNumberRef.current = IMAGE_RANGE.first;
    imageNumberRef.current = IMAGE_RANGE.first;

    video.addEventListener('play', () => {
      const interval = setInterval(async () => {
        // 비디오가 멈춰 있거나 종료된 상태라면(= 다른 메뉴로 이동한 상태) 얼굴 인식 함수 종료
        if (video.paused || video.ended) return;

        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions();

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        resizedDetections.forEach((detection) => {
          const { happy, angry, fearful, disgusted } = detection.expressions;

          // 특정 감정이 설정한 한계점을 넘으면 보여질 이미지 번호를 조정
          // 미소를 지어야 감지되는 행복함은 상태가 좋은 사과의 이미지를 보여줌
          if (happy > THRESHOLD.happy) imageNumberRef.current++;
          if (
            // 역겨움, 두려움, 화남 등 표정이 일그려야 감지되는 감정들은 썩은 사과의 이미지를 보여줌
            disgusted > THRESHOLD.disgusted ||
            fearful > THRESHOLD.fearful ||
            angry > THRESHOLD.angry
          )
            imageNumberRef.current--;

          imageNumberRef.current = Math.max(
            IMAGE_RANGE.first,
            Math.min(IMAGE_RANGE.last, imageNumberRef.current)
          );

          if (imageNumberRef.current !== lastImageNumberRef.current) {
            const newImage = document.getElementById(
              `img${imageNumberRef.current}`
            );
            const lastImage =
              lastImageNumberRef.current !== -1
                ? document.getElementById(`img${lastImageNumberRef.current}`)
                : null;

            if (lastImage) lastImage.classList.remove('opacity-100', 'z-[2]');
            newImage?.classList.add('opacity-100', 'z-[2]');
            lastImageNumberRef.current = imageNumberRef.current;
          }

          const landmarks = detection.landmarks;
          const scaleX = video.videoWidth / video.width;
          const scaleY = video.videoHeight / video.height;

          partsRef.current.forEach((part) => {
            let points: faceapi.Point[] = [];
            if (part.name === 'leftEye') points = landmarks.getLeftEye();
            else if (part.name === 'rightEye') points = landmarks.getRightEye();
            else if (part.name === 'mouth') points = landmarks.getMouth();

            const minX = Math.min(...points.map((pt) => pt.x)) * scaleX - 10;
            const maxX = Math.max(...points.map((pt) => pt.x)) * scaleX + 10;
            const minY = Math.min(...points.map((pt) => pt.y)) * scaleY;
            const maxY = Math.max(...points.map((pt) => pt.y)) * scaleY;

            const partWidth = maxX - minX;
            const partHeight = maxY - minY;

            const tmp = document.createElement('canvas');
            const tmpCtx = tmp.getContext('2d')!;

            tmp.width = part.width;
            tmp.height = part.height;

            tmpCtx.clearRect(0, 0, tmp.width, tmp.height);
            tmpCtx.save();
            tmpCtx.beginPath();

            points.forEach((pt, i) => {
              const x = (pt.x * scaleX - minX) * (part.width / partWidth);
              const y = (pt.y * scaleY - minY) * (part.height / partHeight);
              if (i === 0) tmpCtx.moveTo(x, y);
              else tmpCtx.lineTo(x, y);
            });

            tmpCtx.closePath();
            tmpCtx.clip();

            tmpCtx.drawImage(
              video,
              minX,
              minY,
              partWidth,
              partHeight,
              0,
              0,
              tmp.width,
              tmp.height
            );

            tmpCtx.restore();
            ctx.drawImage(tmp, part.posX, part.posY);
          });
        });
      }, 100);

      return () => clearInterval(interval);
    });
  }, []);
  return (
    <>
      <video
        ref={videoRef}
        className="opacity-0"
        width={1}
        height={1}
        autoPlay
        muted
      />
      <div
        ref={imageContainerRef}
        className="absolute top-[15%] left-1/2 h-[750px] w-[750px] -translate-x-1/2 overflow-hidden"
      ></div>

      <canvas
        ref={canvasRef}
        width={750}
        height={750}
        className="absolute top-[15%] left-1/2 z-10 -translate-x-1/2"
      ></canvas>

      {/* 배경 원 */}
      <BackgroundCircle />

      <div className="flex h-full flex-col justify-between p-10">
        <Header />
        <button
          onClick={handleCapture}
          className="h-32 w-32 cursor-pointer rounded-2xl border-black bg-white px-4 py-2 text-[24px] font-bold hover:bg-blue-300 hover:text-white"
        >
          Scan <br /> Apple
        </button>
      </div>

      <ScanResultModal
        imageKey={imageKey}
        src={capturedImage}
        handleModal={isOpenScanResultModal}
        modalOpen={openScanResultModal}
      />
    </>
  );
};

export default FaceCanvas;
