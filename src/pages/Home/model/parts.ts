import type { Part } from '@/pages/home/model/type';

// 눈, 입 각 파트 default 위치 및 default 크기 설정
export const initialParts: Part[] = [
  { name: 'leftEye', posX: 90, posY: 250, width: 180, height: 50 },
  { name: 'rightEye', posX: 320, posY: 250, width: 180, height: 50 },
  { name: 'mouth', posX: 240, posY: 380, width: 120, height: 50 },
];
