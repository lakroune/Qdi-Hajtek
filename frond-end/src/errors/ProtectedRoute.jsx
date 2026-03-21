import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = () => {
    const token = Cookies.get('ACCESS_TOKEN');

    if (!token) {
        return <Navigate to="/auth/login" replace />;
    }
    return <Outlet />;
};

export default ProtectedRoute;