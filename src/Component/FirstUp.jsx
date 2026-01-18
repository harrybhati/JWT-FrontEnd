import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function FirstUp() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();

  async function FormSub(data) {
    try {
      const API_URL = import.meta.env.VITE_API_URL; // ✅ use env variable
      const resp = await axios.post(`${API_URL}/signup`, data, { withCredentials: true });

      // Redirect based on role
      if (resp.data.user.role === "admin") {
        navigate("/adm");
      } else {
        navigate("/normal");
      }

      reset(); // ✅ clear form after success
    } catch (err) {
      if (err.response?.status === 400) {
        alert("User already exists");
      } else {
        alert(err.response?.data?.message || "Signup failed");
      }
      console.error(err);
    }
  }

  const styles = {
    form: {
      background: "#fff",
      padding: "2rem",
      borderRadius: "12px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
      width: "100%",
      maxWidth: "400px",
      margin: "2rem auto",
      fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
    },
    label: { display: "block", marginBottom: "6px", fontWeight: "600", color: "#333" },
    input: { width: "100%", padding: "10px 12px", marginBottom: "1rem", border: "1px solid #ccc", borderRadius: "6px", fontSize: "14px" },
    select: { width: "100%", padding: "10px 12px", marginBottom: "1rem", border: "1px solid #ccc", borderRadius: "6px", fontSize: "14px", backgroundColor: "#fff", cursor: "pointer" },
    error: { color: "#e63946", fontSize: "13px", marginTop: "-8px", marginBottom: "12px" },
    button: { width: "100%", padding: "12px", background: "#2575fc", color: "#fff", fontSize: "16px", fontWeight: "600", border: "none", borderRadius: "6px", cursor: "pointer" },
    link: { display: "block", marginTop: "1rem", textAlign: "center", color: "#2575fc", textDecoration: "none", fontWeight: "600" }
  };

  return (
    <form onSubmit={handleSubmit(FormSub)} style={styles.form}>
      <label style={styles.label}>Welcome SignUp Form</label>

      <label style={styles.label}>Name</label>
      <input type="text" {...register("name", { required: true })} placeholder="Enter Name" style={styles.input} />
      {errors.name && <p style={styles.error}>Name is required</p>}

      <label style={styles.label}>Email</label>
      <input type="email" {...register("email", { required: true })} placeholder="Enter Email" style={styles.input} />
      {errors.email && <p style={styles.error}>Email is required</p>}

      <label style={styles.label}>Number</label>
      <input type="tel" {...register("number", { required: true })} placeholder="Enter Number" style={styles.input} />
      {errors.number && <p style={styles.error}>Number is required</p>}

      <label style={styles.label}>Role</label>
      <select {...register("role", { required: true })} style={styles.select}>
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="normal">Normal</option>
      </select>
      {errors.role && <p style={styles.error}>Role is required</p>}

      <label style={styles.label}>Password</label>
      <input type="password" {...register("password", { required: true })} placeholder="Enter Password" style={styles.input} />
      {errors.password && <p style={styles.error}>Password is required</p>}

      <button type="submit" style={styles.button}>Submit</button>

      <p>Already Registered?</p>
      <Link to="/login" style={styles.link}>Go to Login</Link>
    </form>
  );
}

export default FirstUp;