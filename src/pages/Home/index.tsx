import Background from '@/pages/home/ui/Background';
import Header from '@/pages/home/ui/Header';
import FaceCanvas from '@/pages/home/FaceCanvas';

const Home = () => {
  return (
    <div className="relative h-screen w-full">
      <Background />
      <Header />
      <FaceCanvas />
    </div>
  );
};

export default Home;
