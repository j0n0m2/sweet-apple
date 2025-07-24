import Market from '@/sections/market';

interface MenuItem {
  name: string;
  content: React.ReactElement;
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
          <li>준비가 되었다면 'Scan Apple'을 눌러보세요.</li>
        </ul>
      </>
    ),
  },
  { name: 'Market', content: <Market /> },
  {
    name: 'About',
    content: (
      <div className="flex h-full flex-col gap-3">
        <ul className="flex flex-1 flex-col gap-3">
          <li>
            &lt;How Sweet My Apple &gt;는 우리가 미소를 지었을 때 얻을 수 있는
            것들에 대해서 이야기 합니다.
          </li>
          <li>
            단순히 남들에게 잘보이기 위해서 웃는 비즈니스 스마일, 부정적인
            감정을 덮어버리는 차원의 미소가 아닌 '나'를 위한 작은 습관을
            만들어나가기 위함입니다.
          </li>
          <li>
            오늘 하루도 웃어내며 우리의 뇌를 속여봅시다. 당신의 하루를
            응원합니다.
          </li>
        </ul>
        <hr />
        <p className="font-bold">참고 문헌</p>
        <ul className="flex flex-1 flex-col gap-2 overflow-y-scroll p-1 text-[20px] sm:gap-3">
          <li className="rounded-lg bg-[#dbefff] p-2 hover:bg-[#c0e3ff]">
            <a href="https://news.stanford.edu/2022/10/20/posing-smiles-can-brighten-mood/">
              <p className="text-[18px] font-bold sm:text-[20px]">
                Global collaboration led by Stanford researcher shows that a
                posed smile can improve your mood
              </p>
              <p className="text-[16px]">
                - 스탠포드 공식 저널 사이트 'Stanford News'
              </p>
            </a>
          </li>
          <li className="rounded-lg bg-[#dbefff] p-2 hover:bg-[#c0e3ff]">
            <a href="https://doi.org/10.1016/j.psychsport.2017.09.009">
              <p className="text-[18px] font-bold sm:text-[20px]">
                Noel E. Brick
                <br />
                The effects of facial expression and relaxation cues on movement
                economy, physiological, and perceptual responses during running
              </p>
              <p className="text-[16px]">
                - Psychology of Sport and Exercise, 34, 20-28.
              </p>
            </a>
          </li>
        </ul>
      </div>
    ),
  },
];

export default MENU_DATA;
