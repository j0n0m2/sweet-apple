import clsx from 'clsx';
import MENU_DATA from '@/constants/MENU_DATA';
import { useMenu } from '@/store/menuStore';

const MobileAsideBar = () => {
  const { menuIndex, setMenuIndex } = useMenu();
  const { isMenuOpen, closeMenu } = useMenu();
  return (
    isMenuOpen && (
      <div className="fixed z-60 flex h-full w-full flex-1 flex-col border-[#003661] bg-[linear-gradient(0deg,_#ffffff90_0%,_#ffffff_70%)] text-[#003661] backdrop-blur sm:hidden">
        <div className="flex justify-end text-[30px]">
          <button className="mr-4" onClick={() => closeMenu()}>
            X
          </button>
        </div>
        <ul className="flex border-t-1">
          {MENU_DATA.map(({ name }, index) => (
            <li
              key={name}
              className={clsx(
                'flex-1 cursor-pointer border-b border-[#003661] p-3 text-center text-[24px]',
                index === 1 && 'border-x',
                index === menuIndex
                  ? 'border-b-0'
                  : 'bg-[#c0e3ff] text-[#2c6fa6]'
              )}
              onClick={() => setMenuIndex(index)}
            >
              {name}
            </li>
          ))}
        </ul>
        <div className="flex-1 overflow-hidden p-5 text-[19px]">
          {MENU_DATA[menuIndex].content}
        </div>
      </div>
    )
  );
};

export default MobileAsideBar;
