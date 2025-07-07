import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/shared/layout/Layout';
import Home from '@/pages/home';
import About from '@/pages/about';
import Market from '@/pages/market';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'market',
        element: <Market />,
      },
    ],
  },
]);
