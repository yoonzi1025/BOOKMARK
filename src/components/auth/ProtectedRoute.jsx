import { useContext } from "react";
import { AuthContext } from "../../context/auth/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, authLoding } = useContext(AuthContext);
  const location = useLocation();

  if (authLoding) {
    return null;
  }

  // 로그인 안되어 있는 경우
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 로그이 되있는 경우
  return children;
};

export default ProtectedRoute;
