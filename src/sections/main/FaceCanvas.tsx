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
import { useCapturedImage } from '@/sections/main/store/capturedImageStore';
import clsx from 'clsx';
import { useMediaQuery } from 'react-responsive';
import { useMenu } from '@/store/menuStore';
import AlignJustify from '@/icons/align-justify';

const FaceCanvas = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const { openMenu } = useMenu();

  const [imageKey, setImageKey] = useState<string | null>(null);
  const [sugarContent, setSugarContent] = useState<number | null>(null);
  const { capturedImage, setCapturedImage } = useCapturedImage();

  const videoRef = useRef<HTMLVideoElement>(null!);
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const lastLandmarksRef = useRef<faceapi.FaceLandmarks68 | null>(null);
  const partsRef = useRef<Part[]>(initialParts);
  const dragState = useRef<{
    dragPart: null | Part;
    offsetX: number;
    offsetY: number;
  }>({ dragPart: null, offsetX: 0, offsetY: 0 });

  const imageNumberRef = useRef(IMAGE_RANGE.middle);
  const lastImageNumberRef = useRef(IMAGE_RANGE.middle);

  const containerSize = useRef<number>(750);

  // face api model load 및 캠 활성화
  useFaceApi(videoRef);
  useDragHandlers(canvasRef, dragState, partsRef, () => {
    const ctx = canvasRef.current!.getContext('2d')!;
    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

    if (lastLandmarksRef.current) {
      drawParts(ctx, lastLandmarksRef.current, videoRef.current!);
    }
  });

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
    if (!imageContainerRef.current) return;
    // 이미지 깜빡거림을 최소화하기 위해 이미지 미리 로드 후 클래스 부여
    // 기존 이미지 제거
    imageContainerRef.current.innerHTML = '';

    // active 클래스가 부여된 img 요소만 보이게 됨
    for (let i = IMAGE_RANGE.first; i <= IMAGE_RANGE.last; i++) {
      const img = document.createElement('img');
      img.src = `/img/${i}.webp`;
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
    const ratioX = video.videoWidth / containerSize.current;
    const ratioY = video.videoHeight / containerSize.current;

    partsRef.current.forEach((part) => {
      let points: faceapi.Point[] = [];
      if (part.name === 'leftEye') points = landmarks.getLeftEye();
      else if (part.name === 'rightEye') points = landmarks.getRightEye();
      else if (part.name === 'mouth') points = landmarks.getMouth();

      const minX = Math.min(...points.map((pt) => pt.x)) - 10;
      const maxX = Math.max(...points.map((pt) => pt.x)) + 10;
      const minY = Math.min(...points.map((pt) => pt.y));
      const maxY = Math.max(...points.map((pt) => pt.y));

      const partWidth = maxX - minX;
      const partHeight = maxY - minY;

      const absPosX = part.posX * containerSize.current;
      const absPosY = part.posY * containerSize.current;
      const absWidth = part.width * containerSize.current;
      const absHeight = part.height * containerSize.current;

      const tmp = document.createElement('canvas');
      tmp.width = absWidth;
      tmp.height = absHeight;

      const tmpCtx = tmp.getContext('2d', { willReadFrequently: true })!;

      tmpCtx.clearRect(0, 0, tmp.width, tmp.height);
      tmpCtx.save();
      tmpCtx.beginPath();

      points.forEach((pt, i) => {
        const x = (pt.x - minX) * (absWidth / partWidth);
        const y = (pt.y - minY) * (absHeight / partHeight);
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
        minX * ratioX,
        minY * ratioY,
        partWidth * ratioX,
        partHeight * ratioY,
        0,
        0,
        absWidth,
        absHeight
      );

      tmpCtx.restore();

      ctx.drawImage(tmp, absPosX, absPosY);
    });
  };

  // 사과 크기에 맞게 캔버스 크기 조정
  useEffect(() => {
    const updateSize = () => {
      const size = Math.min(window.innerWidth * 0.9, 750);
      containerSize.current = size;
      if (canvasRef.current) {
        canvasRef.current.width = size;
        canvasRef.current.height = size;
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    preloadImages();

    const video = videoRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const displaySize = {
      width: containerSize.current,
      height: containerSize.current,
    };

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

          lastLandmarksRef.current = det.landmarks;
          drawParts(ctx, det.landmarks, video);
        });
      }, 100);

      return () => clearInterval(interval);
    });
  }, [containerSize.current]);

  return (
    <>
      <video
        ref={videoRef}
        className="absolute z-[-1] opacity-0"
        playsInline
        autoPlay
        muted
      />
      <div
        ref={imageContainerRef}
        className="pointer-events-none absolute top-[12%] left-1/2 aspect-square w-[115vw] max-w-[750px] -translate-x-1/2 overflow-hidden sm:top-[15%]"
      ></div>

      {/* 배경 원 */}
      <BackgroundCircle />

      <div className="flex h-full flex-col justify-between p-4 sm:p-10">
        <div className="flex w-full justify-between">
          <Header />
          <button
            onClick={() => openMenu()}
            type="button"
            className="text-[#003661] sm:hidden"
          >
            <AlignJustify />
          </button>
        </div>
        <button
          type="button"
          onClick={handleCapture}
          className={clsx(
            'rounded-2xl border-black bg-white py-4 text-[19px] font-bold transition-transform duration-500 ease-in-out hover:bg-blue-300 hover:text-white sm:h-32 sm:w-32 sm:text-2xl',
            isMobile && capturedImage ? '-translate-y-20' : 'translate-y-0'
          )}
        >
          <p className="hidden justify-center sm:flex">
            Scan <br />
            Apple
          </p>
          <p className="sm:hidden">Scan Apple</p>
        </button>

        <ScanResultModal sugarContent={sugarContent} imageKey={imageKey} />

        <canvas
          ref={canvasRef}
          style={{ touchAction: 'none' }}
          className="absolute top-[12%] left-1/2 z-10 aspect-square w-[115vw] max-w-[750px] -translate-x-1/2 sm:top-[15%]"
        ></canvas>
      </div>
    </>
  );
};

export default FaceCanvas;
