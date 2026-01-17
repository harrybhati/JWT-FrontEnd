import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function PublicRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:5000/checkauth", {
          withCredentials: true,
        });
        setIsAuth(true);   // logged in
      } catch (err) {
        setIsAuth(false);  // not logged in
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <h2>Checking authentication...</h2>;

  // ❌ Already logged in → block login/signup
  if (isAuth) {
    return <Navigate to="/normal" replace />;
  }

  // ✅ Not logged in → show page
  return children;
}

export default PublicRoute;
