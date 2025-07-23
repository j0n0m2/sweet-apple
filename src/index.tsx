import AsideBar from '@/components/AsideBar';
import MainContent from './sections/main';
import { useMediaQuery } from 'react-responsive';

const Index = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  return (
    <div className="flex h-[100dvh] w-full flex-col sm:flex-row">
      <MainContent />
      <AsideBar />
    </div>
  );
};

export default Index;
