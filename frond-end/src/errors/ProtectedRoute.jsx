import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ roles }) => {
    const token = Cookies.get('ACCESS_TOKEN');
    const userData = Cookies.get('USER_DATA');
    const user = userData ? JSON.parse(userData) : null;

    if (roles && roles.includes('guest')) {
        if (token) {
            return <Navigate to="/" replace />;
        }
        return <Outlet />;
    }

    if (!token ) {
        return <Navigate to="/auth/login" replace />;
    }

    if (roles) {
        const hasAccess = roles.includes(user?.role);

        if (!hasAccess) {
            return <Navigate to="/" replace />;
        }
    }
    return <Outlet />;
};

export default ProtectedRoute;