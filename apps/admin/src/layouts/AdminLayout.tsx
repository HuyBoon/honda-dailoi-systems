import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar/Sidebar';
import './AdminLayout.css';

export const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-main">
        <div className="admin-content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
