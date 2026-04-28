import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { AdminLayout } from '../layouts/AdminLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Categories } from '../pages/Categories';
import { Inventory } from '../pages/Inventory';
import { Dashboard } from '../pages/Dashboard';
import { Vehicles } from '../pages/Vehicles';
import { Transactions } from '../pages/Transactions';
import { NotFound } from '../pages/NotFound';

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ]
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: 'users',
            element: <div style={{ padding: '2rem', color: 'white' }}><h2>Staff Page (Placeholder)</h2></div>,
          },
          {
            path: 'inventory',
            element: <Inventory />,
          },
          {
            path: 'categories',
            element: <Categories />,
          },
          {
            path: 'vehicles',
            element: <Vehicles />,
          },
          {
            path: 'transactions',
            element: <Transactions />,
          },
          {
            path: 'settings',
            element: <div style={{ padding: '2rem', color: 'white' }}><h2>Settings Page (Placeholder)</h2></div>,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  }
]);
