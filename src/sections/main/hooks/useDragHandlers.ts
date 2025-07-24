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

    // 좌표 공통 추출 (PointerEvent | Touch)
    const getCoords = (e: PointerEvent | Touch) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    };

    const startDrag = (x: number, y: number) => {
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

    const moveDrag = (x: number, y: number) => {
      if (dragState.current.dragPart) {
        dragState.current.dragPart.posX =
          (x - dragState.current.offsetX) / canvas.width;
        dragState.current.dragPart.posY =
          (y - dragState.current.offsetY) / canvas.height;

        drawParts();
      }
    };

    const endDrag = () => {
      dragState.current.dragPart = null;
    };

    // 포인터 이벤트 핸들러
    const handlePointerDown = (e: PointerEvent) => {
      e.preventDefault();
      const { x, y } = getCoords(e);
      startDrag(x, y);
    };
    const handlePointerMove = (e: PointerEvent) => {
      e.preventDefault();
      const { x, y } = getCoords(e);
      moveDrag(x, y);
    };
    const handlePointerUp = (e: PointerEvent) => {
      e.preventDefault();
      endDrag();
    };

    // 터치 이벤트 핸들러
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      if (!touch) return;
      const { x, y } = getCoords(touch);
      startDrag(x, y);
    };
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      if (!touch) return;
      const { x, y } = getCoords(touch);
      moveDrag(x, y);
    };
    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      endDrag();
    };

    // 이벤트 리스너 등록
    canvas.addEventListener('pointerdown', handlePointerDown, {
      passive: false,
    });
    window.addEventListener('pointermove', handlePointerMove, {
      passive: false,
    });
    window.addEventListener('pointerup', handlePointerUp, { passive: false });

    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);

      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [canvasRef, dragState, partsRef, drawParts]);
}
