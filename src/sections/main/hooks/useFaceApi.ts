import { useEffect } from 'react';
import * as faceapi from 'face-api.js';

// face api model load 및 비디오 캠 활성화
export const useFaceApi = (videoRef: React.RefObject<HTMLVideoElement>) => {
  useEffect(() => {
    if (!videoRef.current) return;

    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
      faceapi.nets.faceExpressionNet.loadFromUri('./models'),
    ]).then(() => {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: 'user' } })
        .then((stream) => {
          videoRef.current!.srcObject = stream;
        })
        .catch(console.error);
    });
  }, [videoRef]);
};
