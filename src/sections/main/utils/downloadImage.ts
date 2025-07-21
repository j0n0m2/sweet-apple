import { toJpeg } from 'html-to-image';

export async function downloadImage(element: HTMLElement, filename: string) {
  if (!element) return;

  // 지정한 영역을 JPEG 이미지로 렌더링
  const dataUrl = await toJpeg(element, {
    skipFonts: true,
    backgroundColor: '#ffffff',
    quality: 0.95,
    pixelRatio: 2,
  });

  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  link.click();
}
