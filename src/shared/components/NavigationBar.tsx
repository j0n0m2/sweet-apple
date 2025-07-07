import { useNavigate, useLocation } from 'react-router-dom';
import { menuItems } from '@/shared/model/menuItems';

const NavigationBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="fixed right-5 bottom-5">
      <ul className="flex flex-col gap-2">
        {Object.entries(menuItems).map(([key, value]) => {
          const isActive = pathname === value;

          return (
            <li
              onClick={() => navigate(value)}
              key={key}
              className={`block cursor-pointer rounded-full px-3 py-1 text-center text-[19px] transition ${
                isActive
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:bg-black hover:text-white'
              }`}
            >
              {key}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavigationBar;
