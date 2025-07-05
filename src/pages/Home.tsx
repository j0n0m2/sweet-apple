import { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

const Home = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);

  const dragState = useRef<{
    dragPart: null | Part;
    offsetX: number;
    offsetY: number;
  }>({ dragPart: null, offsetX: 0, offsetY: 0 });

  interface Part {
    name: "leftEye" | "rightEye" | "mouth";
    posX: number;
    posY: number;
    width: number;
    height: number;
  }

  const partsRef = useRef<Part[]>([
    { name: "leftEye", posX: 50, posY: 200, width: 180, height: 50 },
    { name: "rightEye", posX: 320, posY: 200, width: 180, height: 50 },
    { name: "mouth", posX: 220, posY: 300, width: 120, height: 50 },
  ]);

  const imageNumberRef = useRef(1);
  const lastImageNumberRef = useRef(-1);

  useEffect(() => {
    const video = videoRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("./models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
      faceapi.nets.faceExpressionNet.loadFromUri("./models"),
    ]).then(startVideo);

    function startVideo() {
      navigator.mediaDevices
        .getUserMedia({ video: {} })
        .then((stream) => {
          if (video) video.srcObject = stream;
        })
        .catch((err) => console.error(err));
    }

    const imageContainer = imageContainerRef.current!;
    for (let i = 1; i <= 21; i++) {
      const img = document.createElement("img");
      img.src = `/img/${i}.png`;
      img.id = `img${i}`;
      img.className = "absolute top-0 left-0 w-full h-full opacity-0 z-[1]";
      imageContainer.appendChild(img);
    }

    const firstImage = document.getElementById("img1");
    if (firstImage) firstImage.classList.add("opacity-100", "z-[2]");

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      partsRef.current.forEach((part) => {
        if (
          x >= part.posX &&
          x <= part.posX + part.width &&
          y >= part.posY &&
          y <= part.posY + part.height
        ) {
          dragState.current.dragPart = part;
          dragState.current.offsetX = x - part.posX;
          dragState.current.offsetY = y - part.posY;
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (dragState.current.dragPart) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        dragState.current.dragPart.posX = x - dragState.current.offsetX;
        dragState.current.dragPart.posY = y - dragState.current.offsetY;
      }
    };

    const handleMouseUp = () => {
      dragState.current.dragPart = null;
    };

    const handleWheel = (e: WheelEvent) => {
      if (dragState.current.dragPart) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -5 : 5;
        dragState.current.dragPart.width = Math.max(
          10,
          dragState.current.dragPart.width + delta
        );
        dragState.current.dragPart.height = Math.max(
          10,
          dragState.current.dragPart.height + delta
        );
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (dragState.current.dragPart) {
        if (e.key === "+" || e.key === "=") {
          dragState.current.dragPart.width += 10;
          dragState.current.dragPart.height += 5;
        } else if (e.key === "-") {
          dragState.current.dragPart.width = Math.max(
            10,
            dragState.current.dragPart.width - 5
          );
          dragState.current.dragPart.height = Math.max(
            10,
            dragState.current.dragPart.height - 5
          );
        }
      }
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("wheel", handleWheel);
    window.addEventListener("keydown", handleKeyDown);

    video.addEventListener("play", () => {
      const displaySize = { width: video.width, height: video.height };

      const interval = setInterval(async () => {
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
          const { happy, sad, angry } = detection.expressions;

          const threshold = 0.5;
          const threshold2 = 0.03;

          if (happy > threshold) imageNumberRef.current++;
          if (sad > threshold2 || angry > threshold2) imageNumberRef.current--;

          imageNumberRef.current = Math.max(
            1,
            Math.min(21, imageNumberRef.current)
          );

          if (imageNumberRef.current !== lastImageNumberRef.current) {
            const newImage = document.getElementById(
              `img${imageNumberRef.current}`
            );
            const lastImage =
              lastImageNumberRef.current !== -1
                ? document.getElementById(`img${lastImageNumberRef.current}`)
                : null;

            if (lastImage) lastImage.classList.remove("opacity-100", "z-[2]");
            newImage?.classList.add("opacity-100", "z-[2]");
            lastImageNumberRef.current = imageNumberRef.current;
          }

          const landmarks = detection.landmarks;
          const scaleX = video.videoWidth / video.width;
          const scaleY = video.videoHeight / video.height;

          partsRef.current.forEach((part) => {
            let points: faceapi.Point[] = [];
            if (part.name === "leftEye") points = landmarks.getLeftEye();
            else if (part.name === "rightEye") points = landmarks.getRightEye();
            else if (part.name === "mouth") points = landmarks.getMouth();

            const minX = Math.min(...points.map((pt) => pt.x)) * scaleX - 10;
            const maxX = Math.max(...points.map((pt) => pt.x)) * scaleX + 10;
            const minY = Math.min(...points.map((pt) => pt.y)) * scaleY;
            const maxY = Math.max(...points.map((pt) => pt.y)) * scaleY;

            const partWidth = maxX - minX;
            const partHeight = maxY - minY;

            const tmp = document.createElement("canvas");
            tmp.width = part.width;
            tmp.height = part.height;
            const tmpCtx = tmp.getContext("2d")!;

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

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute w-full h-full z-[-3] bg-[radial-gradient(circle,#ffffff_0%,#a4d6ff_100%)]" />
      <div className="absolute w-full h-full z-[-2] bg-gradient-to-b from-transparent to-[#70bfff]" />
      <div className="absolute w-[40vw] h-[40vw] rounded-full bg-white z-[-1] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 blur-[20px]" />

      <div className="font-['Inter'] font-black text-[220px] text-center text-white [text-shadow:_-3px_-3px_0_black,_3px_-3px_0_black,_-3px_3px_0_black,_3px_3px_0_black]">
        How <b className="italic">Sweet</b>
      </div>

      <video
        ref={videoRef}
        className="absolute opacity-0 z-[-1]"
        width={1}
        height={1}
        autoPlay
        muted
      />

      <div className="absolute bottom-[3%] left-1/2 -translate-x-1/2 rounded-[100%] w-[70%] z-0 font-['Inter'] font-black text-[220px] text-center text-white [text-shadow:_-3px_-3px_0_black,_3px_-3px_0_black,_-3px_3px_0_black,_3px_3px_0_black] bg-[#11ff00]">
        My <b className="italic">Apple</b>
      </div>

      <div
        ref={imageContainerRef}
        className="absolute w-[600px] h-[600px] overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      ></div>

      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      ></canvas>

      <div>
        <a href="/about" className="text-white">
          About
        </a>
      </div>
    </div>
  );
};

export default Home;
