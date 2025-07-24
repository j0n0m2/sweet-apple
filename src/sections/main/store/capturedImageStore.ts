import { create } from 'zustand';

interface capturedImageState {
  capturedImage: string | null;
  setCapturedImage: (key: string | null) => void;
}

const useCapturedImageStore = create<capturedImageState>((set) => ({
  capturedImage: null,
  setCapturedImage: (key) => set({ capturedImage: key }),
}));

export const useCapturedImage = () => {
  const capturedImage = useCapturedImageStore((state) => state.capturedImage);
  const setCapturedImage = useCapturedImageStore(
    (state) => state.setCapturedImage
  );

  return { capturedImage, setCapturedImage };
};
