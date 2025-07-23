import type { Part } from '@/sections/main/model/type';

// 눈, 입 각 파트 default 위치 및 default 크기 설정
export const initialParts: Part[] = [
  { name: 'leftEye', posX: 0.16, posY: 0.33, width: 0.28, height: 0.08 },
  { name: 'rightEye', posX: 0.52, posY: 0.33, width: 0.28, height: 0.08 },
  { name: 'mouth', posX: 0.39, posY: 0.53, width: 0.2, height: 0.08 },
];
