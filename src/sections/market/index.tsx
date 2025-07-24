import { useMarketItems } from '@/sections/market/hooks/useMarketItems';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { formattedDate } from '@/sections/market/utils/formatTime';

const MarketList = () => {
  const { data: apples } = useMarketItems();
  return (
    <ul className="flex h-[78dvh] flex-wrap gap-4 overflow-y-scroll py-4 sm:max-h-[800px] sm:gap-4 sm:py-8">
      {apples.map((item, index) => (
        <li
          key={index}
          className="flex h-auto w-full max-w-[8em] flex-col items-center rounded-lg border bg-white p-2 sm:max-w-[7em] sm:p-3"
        >
          <div className="w-full max-w-[8em]">
            <img
              src={item.imgURL}
              alt={item.name}
              className="h-auto w-full object-contain"
            />
          </div>
          <p className="w-full overflow-hidden text-center text-[17px] overflow-ellipsis whitespace-nowrap sm:text-[24px]">
            {item.name}
          </p>
          <p className="text-[16px]">당도 {item.sugarContent}%</p>
          <p className="text-[14px]">{formattedDate(item.writeTime)}</p>
        </li>
      ))}
    </ul>
  );
};

const Market = () => {
  return (
    <>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <MarketList />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};
export default Market;
