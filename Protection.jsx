// Protection.jsx
import React, { useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";

const Protection = ({ children }) => {
  const userTokenString = localStorage.getItem("userToken");
  const userToken = userTokenString ? JSON.parse(userTokenString) : null;
  const accessToken = userToken?.token;
  const isAuthenticated = !!accessToken;
  const userRole = userToken?.user?.role;

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) return;

    // Automatically redirect user based on their role
    if (userRole === "hospital" && !location.pathname.startsWith("/dashboard")) {
      navigate("/dashboard", { replace: true });
    } else if (userRole === "doctor" && !location.pathname.startsWith("/doctor")) {
      navigate("/doctor", { replace: true });
    } else if (userRole === "superadmin" && !location.pathname.startsWith("/super")) {
      navigate("/super", { replace: true });
    } else if (userRole === "patient" && !location.pathname.startsWith("/patient")) {
      navigate("/patient", { replace: true });
    }
  }, [isAuthenticated, userRole, navigate, location]);

  if (!isAuthenticated) {
    return <Navigate to="/welcome" replace />;
  }

  return children;
};

export default Protection;
