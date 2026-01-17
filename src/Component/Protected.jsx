import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Protected({ children, role }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:5000/checkAuth", {
          withCredentials: true,
        });
        // backend returns { message, role }
        setUser({ role: res.data.role });
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // ⏳ Wait until auth is checked
  if (loading) return <h2>Checking authentication...</h2>;

  // ❌ Not logged in → go to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Logged in but wrong role
  if (role && user.role !== role) {
  return (
    <Navigate
      to={user.role === "admin" ? "/adm" : "/normal"}
      replace
    />
  );
}


  // ✅ Authenticated and allowed
  return children;
}

export default Protected;