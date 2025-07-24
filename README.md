## ✨ 프로젝트 소개

![image](https://github.com/user-attachments/assets/781f10c1-17d4-4e4a-ad86-179a423ee5ec)

> **미소의 긍정적인 효과를 알리기 위한 프로모션 사이트** <br />

< How Sweet My Apple >는 표정이 신체와 정서에 미치는 영향, 그리고 미소가 가져오는 긍정적인 변화를 이야기합니다. <br/>
표정은 스트레스 회복과 운동 시 필요한 신체적, 심리적 에너지에도 큰 영향을 미칩니다. 표정을 조금만 바꿔도 내 안에서 작은 변화가 시작된다는 사실, 흥미롭지 않나요? <br/>
혼자 있을 때, 생각이 많아질 때, 운동할 때 얼굴에 은은한 미소를 지어보세요. 누군가에게 잘 보이기 위한 비즈니스 스마일이나, 부정적인 감정을 억누르는 미소가 아니라, 오롯이 '나'를 위한 작은 습관을 만들어봅시다.
오늘도 웃음으로 나를 돌보며 작은 변화를 만들어가봅시다.

> [▶︎&nbsp;&nbsp;How Sweet My Apple - 배포 사이트 바로가기&nbsp; 👀](https://sweet-apple-iota.vercel.app/)

&nbsp;

## 🚀 주요 기능

### 1. 표정 인식

- Face-api를 활용하여 사용자의 표정을 인식 (오픈소스 [face-api](https://github.com/justadudewhohacks/face-api.js))

- 인식 값에 따라 보여지는 사과 이미지가 변하도록 설정

<img src="https://github.com/user-attachments/assets/c1d793a3-0a72-45e2-ad4c-fb702f284a96" alt="Image" width="600" />

> 웃으면 사과의 상태가 좋아지고, 찡그리면 사과의 상태가 안좋아집니다.

&nbsp;

### 2. 눈과 입 위치 변경

- 마우스 또는 터치 이벤트를 통해 눈과 입 위치 변경

<img src="https://github.com/user-attachments/assets/ca5585f0-56c3-42ee-bcbd-2f8513a603b5" alt="Image" width="600" />

> 크기를 늘리고 줄이는 기능도 추가할 예정입니다.

&nbsp;

### 3. 당도 확인 검사 결과지 다운로드

- 'Scan Apple' 버튼을 누르면 사과 당도와 효능과 관련된 내용이 담긴 모달 확인 가능
- 사과 이미지가 포함된 검사 결과 모달 내용을 이미지로 다운로드

<img src="https://github.com/user-attachments/assets/6b8bcc7d-61ac-4f17-aade-e4f5edf82784" alt="Image" width="600" />

> 사용자의 사과 이미지, 당도, 효능에 대한 내용이 담긴 모달이 나옵니다.

&nbsp;

### 4. 마켓

- 자신의 사과를 마켓에 공유하고, 다른 사용자 사과 조회 가능

<img src="https://github.com/user-attachments/assets/bd9ff884-4b22-4aba-be68-a7e76e3518da" alt="Image" width="600" />

&nbsp;

## 🔨 기술 스택

|       Type       |                                                                                                                 Tool                                                                                                                 |
| :--------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|     Library      |                  ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black) ![VITE](https://img.shields.io/badge/VITE-646CFF?style=for-the-badge&logo=Vite&logoColor=white)                  |
|     Language     |                                                        ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=black)                                                         |
|     Styling      |                                                         ![TailwindCSS](https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)                                                         |
| State Management | ![TanStack Query](https://img.shields.io/badge/tanstack%20query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white) ![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=zustand&logoColor=white) |
|     Backend      |                                                             ![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)                                                              |
|    Animation     |                                                         ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)                                                          |
|    Formatting    |          ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)          |
| Package Manager  |                                                                     ![Npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)                                                                     |
| Version Control  |           ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)           |

&nbsp;

## 🧱 폴더 구조

```
💚src
 ┣ 📚sections
 ┃ ┣ 📁main --> 메인콘텐츠 (사과 당도 검사, 모달 확인 등)
 ┃ ┗ 📁market -> 마켓 컨텐츠 (다른 사용자가 올린 사과 확인)
 ┣ 📓components > 메뉴 컴포넌트
 ┣ 📓constants
 ┣ 📓icons
 ┣ 📓lib
 ┣ 📓store
 ┣ 📄index.tsx
 ┣ 📄App.tsx
 ┗ 📄main.tsx

```

&nbsp;

## ⏰ 프로젝트 일정

개발 시작 : 2025년 7월 5일 <br/>
1차 정식 배포 : 2025년 7월 24일

&nbsp;

## 🎮 프로젝트 실행 방법

1. `lib/firebase.ts` 파일 설정: firebase API Key를 입력해주세요.
   <br/>- API Key를 입력하지 않으면 [마켓 관련 기능](#4-마켓)을 사용할 수 없습니다.
2. 프로젝트 클론:

   `git clone https://github.com/j0n0m2/sweet-apple.git`

3. 패키지 설치:

   `npm install`

4. 프로젝트 실행:

   `npm run dev`

&nbsp;
