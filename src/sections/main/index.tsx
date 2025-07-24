import FaceCanvas from '@/sections/main/FaceCanvas';
import Background from '@/sections/main/ui/Background';

const MainContent = () => {
  return (
    <>
      <Background />
      <div className="relative flex-2">
        <FaceCanvas />
      </div>
    </>
  );
};

export default MainContent;
