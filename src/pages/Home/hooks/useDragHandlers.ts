import { useEffect } from 'react';
import type { Part } from '@/pages/home/model/type';

export const useDragHandlers = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  dragState: React.MutableRefObject<{
    dragPart: null | Part;
    offsetX: number;
    offsetY: number;
  }>,
  partsRef: React.MutableRefObject<Part[]>
) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

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
        if (e.key === '+' || e.key === '=') {
          dragState.current.dragPart.width += 10;
          dragState.current.dragPart.height += 5;
        } else if (e.key === '-') {
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

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [canvasRef, dragState, partsRef]);
};
