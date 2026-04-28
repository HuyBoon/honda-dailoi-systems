import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { AdminLayout } from '../layouts/AdminLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Dashboard } from '../pages/Dashboard';

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
            element: <div style={{ padding: '2rem', color: 'white' }}><h2>Users Page (Placeholder)</h2></div>,
          },
          {
            path: 'inventory',
            element: <div style={{ padding: '2rem', color: 'white' }}><h2>Inventory Page (Placeholder)</h2></div>,
          },
          {
            path: 'settings',
            element: <div style={{ padding: '2rem', color: 'white' }}><h2>Settings Page (Placeholder)</h2></div>,
          },
        ],
      },
    ],
  },
]);
