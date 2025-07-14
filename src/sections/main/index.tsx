import FaceCanvas from '@/sections/main/FaceCanvas';
import Background from '@/sections/main/ui/Background';
import Header from '@/sections/main/ui/Header';

const MainContent = () => {
  return (
    <>
      <Background />
      <div className="relative flex-2">
        <Header />
        <FaceCanvas />
      </div>
    </>
  );
};

export default MainContent;
