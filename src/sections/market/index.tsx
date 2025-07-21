import { useMarketItems } from '@/sections/market/hooks/useMarketItems';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { formattedDate } from '@/sections/market/utils/formatTime';

const MarketList = () => {
  const { data: apples } = useMarketItems();
  return (
    <ul className="flex max-h-[800px] flex-wrap gap-8 overflow-y-scroll py-8">
      {apples.map((item, index) => (
        <li
          key={index}
          className="flex h-auto w-full max-w-[8em] flex-col items-center rounded-lg border p-4"
        >
          <div className="w-full max-w-[8em]">
            <img
              src={item.imgURL}
              alt={item.name}
              className="h-auto w-full object-contain"
            />
          </div>
          <p>{item.name}</p>
          <p className="text-[14px]">{formattedDate(item.writeTime)}</p>
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
