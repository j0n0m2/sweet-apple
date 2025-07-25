import { useMarketItems } from '@/sections/market/hooks/useMarketItems';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { formattedDate } from '@/sections/market/utils/formatTime';

const MarketList = () => {
  const { data: apples } = useMarketItems();
  return (
    <div className="h-[78dvh] overflow-y-scroll">
      <ul className="flex flex-wrap gap-4 py-4 sm:gap-4 sm:py-8">
        {apples.map((item, index) => (
          <li
            key={index}
            className="flex w-full max-w-[8em] flex-col items-center rounded-lg border bg-white p-2 sm:max-w-[7em] sm:p-3"
          >
            <div className="w-full max-w-[8em]">
              <img
                src={item.imgURL}
                alt={item.name}
                className="w-full object-contain"
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
    </div>
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
