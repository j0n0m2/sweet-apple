import type { Part } from '@/sections/main/model/type';

// 눈, 입 각 파트 default 위치 및 default 크기 설정
export const initialParts: Part[] = [
  { name: 'leftEye', posX: 120, posY: 250, width: 210, height: 60 },
  { name: 'rightEye', posX: 390, posY: 250, width: 210, height: 60 },
  { name: 'mouth', posX: 290, posY: 400, width: 150, height: 60 },
];
