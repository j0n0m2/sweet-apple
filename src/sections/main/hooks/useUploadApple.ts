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
      // 업로드 성공 시, 마켓 데이터 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ['marketItems'] });
    },
    onError: (error) => {
      console.error('Upload failed:', error.message);
      // 필요하면 에러 처리 UI 띄우는 로직 추가 가능
    },
  });
};
