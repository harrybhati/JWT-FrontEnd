import {BrowserRouter,Routes,Route} from "react-router-dom" ;
import FirstUp from "./Component/FirstUp.jsx";
import LogIn from "./Component/LogIn.jsx";;
import Protected from "./Component/Protected.jsx";
import Normal from "./Component/Normal.jsx";
import Adm from "./Component/Adm.jsx";
import PublicRoute from "./Component/PublicRoute.jsx";

function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>

      <Route path="/" element={ <PublicRoute> <FirstUp/></PublicRoute>}/>  
      <Route path="/login" element={ <PublicRoute> <LogIn/></PublicRoute> }/>  
      <Route path="/adm" element={<Protected role="admin"><Adm/></Protected>}/>  
      <Route path="/normal" element={<Protected role="normal"><Normal/></Protected>}/>
      <Route path="*" element={<h1>404 Not Found</h1>}/>

    </Routes>
    
    
    </BrowserRouter>
     
      
    </>
  )
}

export default App
