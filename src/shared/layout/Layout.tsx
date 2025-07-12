import NavigationBar from '../components/NavigationBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Outlet />
      {/* <NavigationBar /> */}
    </>
  );
};
export default Layout;
