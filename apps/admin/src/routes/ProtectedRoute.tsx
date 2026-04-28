import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout } from '../store/slices/authSlice';

export const ProtectedRoute = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !['ADMIN', 'SUPER_ADMIN', 'MANAGER'].includes(user.role)) {
    // If they aren't an admin variant, logout their token and kick them to login
    dispatch(logout());
    return <Navigate to="/login?error=unauthorized" replace />;
  }

  return <Outlet />;
};
