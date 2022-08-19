import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = ({
    user,
    redirectPath = '/',
}) => {
    if (!user.userId) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute