import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }

    if (!user) {
        // Redirect to login page but save the attempted location
        return <Navigate to="/Login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
