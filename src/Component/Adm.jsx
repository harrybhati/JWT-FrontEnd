import axios from "axios";
import { useNavigate } from "react-router-dom";

function Adm() {
  const navigate = useNavigate();

  async function LogOut() {
    try {
      const API_URL = import.meta.env.VITE_API_URL; // ✅ use env variable
      const resp = await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });

      console.log("Logout response:", resp.data, resp.status);

      if (resp.status === 200) {
        navigate("/login"); // ✅ redirect after logout
      }
    } catch (err) {
      alert("Logout failed. Please try again."); // ✅ user-friendly error
      console.error("Logout error:", err);
    }
  }

  return (
    <>
      <h1>Welcome to Admin Page</h1>
      <h1>Jai Shree Ram</h1>

      <button onClick={LogOut}>Logout</button>
    </>
  );
}

export default Adm;