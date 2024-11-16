
import { Route, Routes } from "react-router-dom";
import HomePage from "./Componets/HomePage";
import Register from "./Componets/Registration/Register";
import { Delete } from "./Componets/MessageCard/Delete";

function App() {
  return (
    <div>
      <Routes>

            <Route path="/" element={<HomePage/>}>  </Route>
                        
            <Route path="/register" element={<Register/>}>  </Route>
            <Route path="/Delete" element={<Delete/>}>  </Route>

      </Routes>
    </div>
  );
}

export default App;
