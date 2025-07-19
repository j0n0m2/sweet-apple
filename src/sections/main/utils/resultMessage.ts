import SCAN_RESULT from '@/sections/main/constants/scanResultMessage';

export default function resultMessage(sugarContent: number | null) {
  if (sugarContent === null)
    return {
      title: '오류가 발생했습니다. 검사를 다시 해주세요.',
      message: [
        {
          subhead: '에러',
          content: '측정값이 없습니다. 다시 시도해주세요.',
        },
      ],
    };
  if (sugarContent < 40) return SCAN_RESULT[0];
  if (sugarContent < 70) return SCAN_RESULT[1];
  return SCAN_RESULT[2];
}
