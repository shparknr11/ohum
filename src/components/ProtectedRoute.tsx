import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface IProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
