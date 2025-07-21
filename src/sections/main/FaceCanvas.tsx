import { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import type { Part } from '@/sections/main/model/type';
import { useFaceApi } from '@/sections/main/hooks/useFaceApi';
import { initialParts } from '@/sections/main/model/parts';
import { useDragHandlers } from '@/sections/main/hooks/useDragHandlers';
import { IMAGE_RANGE } from '@/sections/main/constants/IMAGE_RANGE';
import { THRESHOLD } from '@/sections/main/constants/emotionsThreshold';
import BackgroundCircle from '@/sections/main/ui/BackgroundCircle';
import ScanResultModal from '@/sections/main/components/ScanResultModal';
import Header from '@/sections/main/ui/Header';

const FaceCanvas = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [imageKey, setImageKey] = useState<string | null>(null);
  const [sugarContent, setSugarContent] = useState<number | null>(null);
  const [openScanResultModal, setOpenScanResultModal] =
    useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null!);
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const partsRef = useRef<Part[]>(initialParts);
  const dragState = useRef<{
    dragPart: null | Part;
    offsetX: number;
    offsetY: number;
  }>({ dragPart: null, offsetX: 0, offsetY: 0 });

  const imageNumberRef = useRef(IMAGE_RANGE.middle);
  const lastImageNumberRef = useRef(IMAGE_RANGE.middle);

  // face api model load 및 캠 활성화
  useFaceApi(videoRef);
  useDragHandlers(canvasRef, dragState, partsRef);

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

    // 현재 이미지 번호에 따라 당도 계산
    const percent = Math.round(
      (imageNumberRef.current / IMAGE_RANGE.last) * 100
    );
    setSugarContent(percent);

    // 이미지 키 설정
    setImageKey(Date.now().toString());
  };

  const preloadImages = () => {
    // 이미지 깜빡거림을 최소화하기 위해 이미지 미리 로드 후 클래스 부여
    // active 클래스가 부여된 img 요소만 보이게 됨
    for (let i = IMAGE_RANGE.first; i <= IMAGE_RANGE.last; i++) {
      const img = document.createElement('img');
      img.src = `/img/${i}.png`;
      img.id = `img${i}`;
      img.className = 'absolute top-0 left-0 w-full h-full opacity-0 z-[1]';
      imageContainerRef.current!.appendChild(img);
    }
    const startImg = document.getElementById(`img${IMAGE_RANGE.middle}`);
    startImg?.classList.add('opacity-100', 'z-[2]');
  };

  const updateAppleImage = (nextNumber: number) => {
    if (nextNumber === lastImageNumberRef.current) return;

    const newImage = document.getElementById(`img${nextNumber}`);
    const lastImage = document.getElementById(
      `img${lastImageNumberRef.current}`
    );

    lastImage?.classList.remove('opacity-100', 'z-[2]');
    newImage?.classList.add('opacity-100', 'z-[2]');
    lastImageNumberRef.current = nextNumber;
  };

  const handleExpression = (
    happy: number,
    angry: number,
    fearful: number,
    disgusted: number
  ) => {
    let delta = 0;

    if (
      happy > disgusted &&
      happy > fearful &&
      happy > angry &&
      happy > THRESHOLD.happy
    ) {
      delta = 1;
    } else if (
      disgusted > THRESHOLD.disgusted ||
      fearful > THRESHOLD.fearful ||
      angry > THRESHOLD.angry
    ) {
      delta = -1;
    }

    // 이미지 범위에서 벗어나는 것을 방지 [ ex) 0 or 22 ]
    const nextNumber = Math.max(
      IMAGE_RANGE.first,
      Math.min(IMAGE_RANGE.last, imageNumberRef.current + delta)
    );

    if (nextNumber !== imageNumberRef.current) {
      updateAppleImage(nextNumber);
      imageNumberRef.current = nextNumber;
    }
  };

  const drawParts = (
    ctx: CanvasRenderingContext2D,
    landmarks: faceapi.FaceLandmarks68,
    video: HTMLVideoElement
  ) => {
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
      tmp.width = part.width;
      tmp.height = part.height;

      const tmpCtx = tmp.getContext('2d')!;

      tmpCtx.clearRect(0, 0, tmp.width, tmp.height);
      tmpCtx.save();
      tmpCtx.beginPath();

      points.forEach((pt, i) => {
        const x = (pt.x * scaleX - minX) * (part.width / partWidth);
        const y = (pt.y * scaleY - minY) * (part.height / partHeight);
        if (i === 0) {
          tmpCtx.moveTo(x, y);
        } else {
          tmpCtx.lineTo(x, y);
        }
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
  };

  useEffect(() => {
    preloadImages();

    const video = videoRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const displaySize = { width: video.width, height: video.height };

    video.addEventListener('play', () => {
      const interval = setInterval(async () => {
        if (video.paused || video.ended) return;

        const detections = await faceapi
          // 비디오 스트림에서 얼굴 감지
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()) // 속도가 빠른 모델 사용
          // 68개의 얼굴 랜드마크 계산
          .withFaceLandmarks()
          // 표정 인식
          .withFaceExpressions();

        // 모델이 찾은 좌표를 캔버스 크기에 맞게 조정
        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        resizedDetections.forEach((det) => {
          const { happy, angry, fearful, disgusted } = det.expressions;

          handleExpression(happy, angry, fearful, disgusted);
          drawParts(ctx, det.landmarks, video);
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
          type="button"
          onClick={handleCapture}
          className="h-32 w-32 cursor-pointer rounded-2xl border-black bg-white px-4 py-2 text-[24px] font-bold hover:bg-blue-300 hover:text-white"
        >
          Scan <br /> Apple
        </button>
      </div>

      <ScanResultModal
        sugarContent={sugarContent}
        imageKey={imageKey}
        src={capturedImage}
        handleModal={setOpenScanResultModal}
        modalOpen={openScanResultModal}
      />
    </>
  );
};

export default FaceCanvas;
