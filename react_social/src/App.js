
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Route, Routes,Navigate
} from "react-router-dom";
import { Person } from "@mui/icons-material";
import PersonIcon from '@mui/icons-material/Person';
import Profile from "./pages/profile/Profile";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <div >
      <Router>
        <Routes>

          <Route exact path="/" element={user ? <Home /> : <Register />} />
          <Route exact path="/profile/:username" element={<Profile />} />
          <Route exact path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route exact path="/register" element={user ? <Navigate to="/" /> : <Register />} />
          {/* <Home /> */}
          {/* <Profile />   */}
          {/* <Login/> */}
          {/* <Register/> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
