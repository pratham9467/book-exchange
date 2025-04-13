import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import OwnerDashboard from "./pages/OwnerDashboard";
import SeekerDashboard from "./pages/SeekerDashboard";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        <Route path="/seeker-dashboard" element={<SeekerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
