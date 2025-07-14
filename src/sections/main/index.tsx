import FaceCanvas from './FaceCanvas';
import Background from './ui/Background';
import Header from './ui/Header';

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