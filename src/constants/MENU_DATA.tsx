import Market from '@/sections/market';

interface MenuItem {
  name: string;
  content: string | React.ReactElement;
}

const MENU_DATA: MenuItem[] = [
  {
    name: 'How',
    content: (
      <>
        <p>당신의 미소는 얼마나 달콤할까요? 한 번 확인해보세요!</p>
        <ul className="mt-2 list-inside list-disc">
          <li>웹캠을 켜주세요.</li>
          <li>카메라 권한을 허용해주세요.</li>
          <li>주변이 밝은 곳에서 진행해주세요.</li>
          <li>눈과 입을 이리저리 움직여보세요.</li>
          <li>활짝 웃어보거나 잔뜩 찡그려보세요!</li>
        </ul>
      </>
    ),
  },
  { name: 'Market', content: <Market /> },
  {
    name: 'About',
    content: `<How Sweet My Apple>는 미소를 지었을 때 얻을 수 있는 것에 대해서 이야기 합니다. \n 단순히 남들에게 잘보이기 위해서 웃는 비즈니스 스마일 또는 부정적인 감정을 덮어버리는 차원의 미소가 아닌 '나'를 위한 작은 습관을 만들어나가기 위함입니다. \n 오늘 하루도 웃어내며 우리의 뇌를 속여봅시다. 당신의 하루를 응원합니다.`,
  },
];

export default MENU_DATA;
