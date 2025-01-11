import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const token = localStorage.getItem('authToken');
    return token ? children : <Navigate to="/admin/login" replace />;
}

export default ProtectedRoute;
