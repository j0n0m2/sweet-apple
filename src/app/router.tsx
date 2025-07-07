import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home/index';
import About from '@/pages/About/index';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
]);
