import AsideBar from '@/components/AsideBar';
import MainContent from './sections/main';
import MobileAsideBar from './components/MobileAsideBar';

const Index = () => {
  return (
    <div className="flex h-[100dvh] w-full flex-col sm:flex-row">
      <MainContent />
      <AsideBar />
      <MobileAsideBar />
    </div>
  );
};

export default Index;
