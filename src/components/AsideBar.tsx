import Market from '@/sections/market';
import { useState } from 'react';
import { MENU_ITEMS } from '@/constants/menuItems';
import { MENU_HOW_TEXT, MENU_ABOUT_TEXT } from '@/constants/text';

const items = [MENU_HOW_TEXT, <Market />, MENU_ABOUT_TEXT];

const AsideBar = () => {
  const [menu, setMenu] = useState(0);

  const handleMenuClick = (index: number) => {
    setMenu(index);
  };

  return (
    <div className="z-20 h-full w-full flex-1 border-l border-[#003661] bg-[linear-gradient(270deg,_#ffffff60_0%,_#ffffff_100%)] text-[#003661]">
      <div>
        <ul className="flex">
          {MENU_ITEMS.map((name, index) => {
            const liClasses = [
              'flex-1',
              'cursor-pointer',
              'border-b',
              'border-[#003661]',
              'p-4',
              'text-center',
              'text-[32px]',
            ];

            if (index === 1) {
              liClasses.push('border-x');
            }

            if (index === menu) {
              liClasses.push('border-b-0');
            } else {
              liClasses.push('border-b', 'bg-[#c0e3ff]', 'text-[#2c6fa6]');
            }

            return (
              <li
                key={name}
                className={liClasses.join(' ')}
                onClick={() => handleMenuClick(index)}
              >
                {name}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="p-8 text-[24px] whitespace-pre-line">{items[menu]}</div>
    </div>
  );
};

export default AsideBar;
