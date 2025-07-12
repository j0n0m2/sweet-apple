import Background from '@/pages/home/ui/Background';
import Header from '@/pages/home/ui/Header';
import FaceCanvas from '@/pages/home/FaceCanvas';
import AsideBar from './AsideBar';

const Home = () => {
  return (
    <div className="flex h-screen w-full">
      <Background />
      <div className="relative flex-2">
        <Header />
        <FaceCanvas />
      </div>
      <AsideBar />
    </div>
  );
};

export default Home;
