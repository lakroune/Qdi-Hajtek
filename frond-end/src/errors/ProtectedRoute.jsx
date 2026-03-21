import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ roles }) => {
    const token = Cookies.get('ACCESS_TOKEN');
    const userData = Cookies.get('USER_DATA');
    const user = userData ? JSON.parse(userData) : null;

    if (!token) {
        return <Navigate to="/auth/login" replace />;
    }
    const userRoleNames = user?.roles?.map(role => role.name) || [];

    if (roles) {
        const hasAccess = roles.some(role => userRoleNames.includes(role));

        if (!hasAccess) {
            return <Navigate to="/unauthorized" replace />;
        }
    }

    return <Outlet />;
};

export default ProtectedRoute;