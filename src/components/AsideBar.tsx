import { useState } from 'react';
import clsx from 'clsx';
import MENU_DATA from '@/constants/MENU_DATA';

const AsideBar = () => {
  const [menuIndex, setMenuIndex] = useState(0);

  return (
    <div className="z-20 h-full w-full flex-1 border-l border-[#003661] bg-[linear-gradient(270deg,_#ffffff60_0%,_#ffffff_100%)] text-[#003661]">
      <ul className="flex">
        {MENU_DATA.map(({ name }, index) => (
          <li
            key={name}
            className={clsx(
              'flex-1 cursor-pointer border-b border-[#003661] p-4 text-center text-[32px]',
              index === 1 && 'border-x',
              index === menuIndex
                ? 'border-b-0'
                : 'border-b bg-[#c0e3ff] text-[#2c6fa6]'
            )}
            onClick={() => setMenuIndex(index)}
          >
            {name}
          </li>
        ))}
      </ul>
      <div className="p-8 text-[24px] whitespace-pre-line">
        {MENU_DATA[menuIndex].content}
      </div>
    </div>
  );
};

export default AsideBar;
