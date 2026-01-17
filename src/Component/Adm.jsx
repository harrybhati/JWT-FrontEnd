  import axios from "axios";
  import { useNavigate } from "react-router-dom";
  function Adm(){
    const navigate=useNavigate();


    async function LogOut(){
        try{
            const resp=await axios.post("http://localhost:5000/logout",{},{withCredentials:true});
            console.log("Logout response:", resp.data,resp.status);
            if(resp.status===200){
                navigate("/login");
            }
            
        }catch(err){
            console.error("Logout error:", err);
        }

    }

    return (
        <>
        
        <h1> Welcome to Admin  Page </h1>
        <h1>Jai Shree Ram</h1>



        <button onClick={LogOut}>Logout</button>
        
        
        </>
    )
}
export default Adm;