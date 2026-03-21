import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (!token) {
        return <Navigate to="/auth/login" />;
    }
    return <Outlet />;
};

export default ProtectedRoute;