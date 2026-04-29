import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { AdminLayout } from '../layouts/AdminLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Categories } from '../pages/categories/index';
import { Inventory } from '../pages/inventory/index';
import { Dashboard } from '../pages/Dashboard';
import { Vehicles } from '../pages/vehicles/index';
import { Transactions } from '../pages/transactions/index';
import { Users } from '../pages/users/index';
import { Settings } from '../pages/settings/index';
import { Orders } from '../pages/orders/index';
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
            element: <Users />,
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
            path: 'orders',
            element: <Orders />,
          },
          {
            path: 'settings',
            element: <Settings />,
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
