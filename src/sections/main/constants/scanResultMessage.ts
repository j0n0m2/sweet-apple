interface ScanResult {
  title: string;
  message: { subhead: string; content: string }[];
}
const SCAN_RESULT: ScanResult[] = [
  {
    title: '쓴 맛이 더 강한 사과!',
    message: [
      {
        subhead: '스트레스 호르몬 증가',
        content:
          '코르티솔 같은 스트레스 호르몬 분비가 늘어나 불안과 긴장이 높아질 수 있습니다.',
      },
      {
        subhead: '주름 형성 촉진',
        content:
          '특정 부위에 지속적인 주름을 만들고 깊게 하여 노화를 앞당길 수 있습니다.',
      },
    ],
  },
  {
    title: '적당히 달아요.',
    message: [
      {
        subhead: '얼굴 탄력 감소',
        content:
          '얼굴 근육의 긴장도가 낮아져 피부가 처지고 탄력이 감소할 수 있습니다.',
      },
      {
        subhead: '살짝 웃어볼까요?',
        content: '',
      },
    ],
  },
  {
    title: '당신의 미소는 제철입니다',
    message: [
      {
        subhead: '스트레스 호르몬 감소',
        content: '스트레스 호르몬 코르티솔 수치를 낮추어 긴장을 완화시킵니다.',
      },
      {
        subhead: '운동 효율 증가',
        content:
          '단순히 미소를 머금고 운동하는 것만으로도 수행 능력을 높입니다.',
      },
    ],
  },
];

export default SCAN_RESULT;
