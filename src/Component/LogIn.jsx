import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function LogIn() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

   async function Hello(data) {
    console.log("Login data:", data);
    try{
      const resp=await axios.post("http://localhost:5000/login",data,{withCredentials:true});
      console.log("Login response:", resp.data);
      if(resp.data.user.role==='admin'){
        navigate("/adm");
      }else{
        navigate("/normal");
      }
    }
    catch(err){
      if(err.response?.status===401){
        alert("Invalid credentials, please try again.");
      }
     
      console.error("Login error:", err);
    
    }
  }

  // Inline styles
  const styles = {
    form: {
      background: "#ffffff",
      padding: "2rem",
      borderRadius: "12px",
      boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
      width: "100%",
      maxWidth: "400px",
      margin: "3rem auto",
      fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
    },
    label: {
      display: "block",
      marginBottom: "6px",
      fontWeight: "600",
      color: "#333",
      fontSize: "14px"
    },
    input: {
      width: "100%",
      padding: "10px 12px",
      marginBottom: "1rem",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "14px",
      transition: "border-color 0.3s ease",
    },
    inputFocus: {
      borderColor: "#2575fc",
      outline: "none"
    },
    error: {
      color: "#e63946",
      fontSize: "13px",
      marginTop: "-8px",
      marginBottom: "12px"
    },
    button: {
      width: "100%",
      padding: "12px",
      background: "linear-gradient(90deg, #2575fc, #6a11cb)",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "600",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "background 0.3s ease"
    },
    buttonHover: {
      background: "linear-gradient(90deg, #6a11cb, #2575fc)"
    }
  };

  return (
    <form onSubmit={handleSubmit(Hello)} style={styles.form}>
      <label style={styles.label}>LogIn Form</label>

      <label style={styles.label}>Email</label>
      <input
        type="email"
        {...register("email", { required: true })}
        placeholder="Enter Email"
        style={styles.input}
      />
      {errors.email && <p style={styles.error}>Email is required</p>}

      <label style={styles.label}>Password</label>
      <input
        type="password"
        {...register("password", { required: true })}
        placeholder="Enter Password"
        style={styles.input}
      />
      {errors.password && <p style={styles.error}>Password is required</p>}

      <button type="submit" style={styles.button}>Submit</button>
      <p>New User ? <Link to="/">Sign Up</Link></p>
    </form>
  );
}

export default LogIn;