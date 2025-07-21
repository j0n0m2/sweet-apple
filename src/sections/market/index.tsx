import { useMarketItems } from '@/sections/market/hooks/useMarketItems';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { formattedDate } from '@/sections/market/utils/formatTime';

const MarketList = () => {
  const { data: apples } = useMarketItems();
  return (
    <ul className="flex max-h-[800px] flex-wrap gap-24 overflow-y-scroll py-8">
      {apples.map((item, index) => (
        <li key={index} className="rounded-lg border-1 p-4">
          <img src={item.imgURL} alt={item.name} />
          <div>Name: {item.name}</div>
          <div>time: {formattedDate(item.writeTime)}</div>
        </li>
      ))}
    </ul>
  );
};

const Market = () => {
  return (
    <div>
      <h1>사과 나눔합니다</h1>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <MarketList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
export default Market;
