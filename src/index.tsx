import AsideBar from '@/components/AsideBar';
import MainContent from './sections/main';

const Index = () => {
  return (
    <div className="flex h-screen w-full">
      <MainContent />
      <AsideBar />
    </div>
  );
};

export default Index;
