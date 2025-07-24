import { useEffect } from 'react';
import type { Part } from '@/sections/main/model/type';

export function useDragHandlers(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  dragState: React.MutableRefObject<{
    dragPart: null | Part;
    offsetX: number;
    offsetY: number;
  }>,
  partsRef: React.MutableRefObject<Part[]>,
  drawParts: () => void
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const getCoords = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleDown = (e: PointerEvent) => {
      const { x, y } = getCoords(e);

      for (const part of partsRef.current) {
        const absPosX = part.posX * canvas.width;
        const absPosY = part.posY * canvas.height;
        const absWidth = part.width * canvas.width;
        const absHeight = part.height * canvas.height;

        if (
          x >= absPosX &&
          x <= absPosX + absWidth &&
          y >= absPosY &&
          y <= absPosY + absHeight
        ) {
          dragState.current.dragPart = part;
          dragState.current.offsetX = x - absPosX;
          dragState.current.offsetY = y - absPosY;
          break;
        }
      }
    };

    const handleMove = (e: PointerEvent) => {
      if (dragState.current.dragPart) {
        e.preventDefault();
        const { x, y } = getCoords(e);

        dragState.current.dragPart.posX =
          (x - dragState.current.offsetX) / canvas.width;
        dragState.current.dragPart.posY =
          (y - dragState.current.offsetY) / canvas.height;

        drawParts();
      }
    };

    const handleUp = () => {
      dragState.current.dragPart = null;
    };
    canvas.addEventListener('pointerdown', (e) => {
      console.log('pointerdown', e);
    });
    canvas.addEventListener('pointerdown', handleDown);
    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);

    return () => {
      canvas.removeEventListener('pointerdown', handleDown);
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
  }, [canvasRef, dragState, partsRef, drawParts]);
}
