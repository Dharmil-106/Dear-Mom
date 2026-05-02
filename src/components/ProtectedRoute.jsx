import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRole }) => {
  const role = localStorage.getItem('dearMomRole');
  
  if (!role) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRole && role !== allowedRole) {
    return <Navigate to={`/${role}/dashboard`} replace />;
  }
  
  return children;
};

export default ProtectedRoute;
