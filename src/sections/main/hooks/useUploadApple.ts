import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadAppleImageAndMeta } from '@/sections/main/service/uploadAppleService';

interface UploadParams {
  dataUrl: string;
  appleName: string;
  sugarContent: number;
}

export const useUploadApple = () => {
  const queryClient = useQueryClient();
  return useMutation<string, Error, UploadParams>({
    mutationFn: uploadAppleImageAndMeta,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['marketItems'] });
    },
    onError: (error) => {
      console.error('Upload failed:', error.message);
    },
  });
};
