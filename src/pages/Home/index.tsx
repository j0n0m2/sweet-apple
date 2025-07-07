import Background from '@/pages/Home/ui/Background';
import Header from '@/pages/Home/ui/Header';
import FaceCanvas from '@/pages/Home/FaceCanvas';
import NavigationBar from '@/shared/components/NavigationBar';

const Home = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Background />
      <Header />
      <FaceCanvas />
      <NavigationBar />
    </div>
  );
};

export default Home;
