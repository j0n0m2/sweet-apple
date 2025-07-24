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
          <li>카메라 권한을 허용해 주세요.</li>
          <li>주변이 밝은 곳에서 진행해 주세요.</li>
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
      <div className="flex h-full flex-col gap-3 overflow-y-scroll">
        <ul className="flex flex-1 flex-col gap-3 text-[17px] sm:text-[19px]">
          <li>
            &lt; How Sweet My Apple &gt;는 표정이 신체와 정서에 미치는 영향,
            그리고 미소가 가져오는 긍정적인 변화를 이야기합니다.
          </li>
          <li>
            표정은 스트레스 회복과 운동 시 필요한 신체적, 심리적 에너지에도 큰
            영향을 미칩니다. 표정을 조금만 바꿔도 내 안에서 작은 변화가
            시작된다는 사실, 흥미롭지 않나요?
          </li>
          <li>
            혼자 있을 때, 생각이 많아질 때, 운동할 때 얼굴에 은은한 미소를
            지어보세요. 누군가에게 잘 보이기 위한 비즈니스 스마일이나, 부정적인
            감정을 억누르는 미소가 아니라, 오롯이 '나'를 위한 작은 습관을
            만들어봅시다.
          </li>
          <li>오늘도 웃음으로 나를 돌보며 작은 변화를 만들어가봅시다.</li>
        </ul>
        <hr />
        <p className="font-bold">참고 문헌</p>
        <ul className="flex flex-col gap-2 p-1 text-[20px] sm:gap-3">
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
