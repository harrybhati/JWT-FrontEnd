import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function PublicRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL; // ✅ use env variable
        const resp = await axios.get(`${API_URL}/checkAuth`, {
          withCredentials: true,
        });

        setIsAuth(true);
        setRole(resp.data.user.role); // ✅ store role from backend
      } catch (err) {
        setIsAuth(false);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <h2>Checking authentication...</h2>;

  // ❌ Already logged in → block login/signup
  if (isAuth) {
    if (role === "admin") {
      return <Navigate to="/adm" replace />;
    }
    return <Navigate to="/normal" replace />;
  }

  // ✅ Not logged in → show page
  return children;
}

export default PublicRoute;