import { useNavigate } from 'react-router-dom';
import { menuItems } from '@/shared/model/menuItems';

const NavigationBar = () => {
  const navigate = useNavigate();
  return (
    <nav>
      <ul className="flex flex-col">
        {Object.entries(menuItems).map(([key, value]) => (
          <li
            onClick={() => navigate(value)}
            className="block cursor-pointer text-white"
            key={key}
          >
            {key}
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default NavigationBar;
