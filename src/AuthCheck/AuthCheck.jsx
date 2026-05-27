import { Navigate, useLocation } from "react-router";

const AuthCheck = ({ children, requiredRole }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const role = localStorage.getItem("role");
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  if (role === "admin" && location.pathname === "/") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (role === "user" && location.pathname.startsWith("/admin")) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthCheck;