import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { UseAppContext } from "./service/context";
import Landingpage from "./pages/Landingpage";
import Login from "./pages/Login";
import Regester from "./pages/Regester";
import RegSch from "./pages/RegSch";
import Admin_Index from "./pages/Admin/Admin_Index";
import AdminViewStudent from "./components/Admin_comp/AdminViewStudent";

function App() {


  function ProtectedRoute({ children }) {
    const { User } = UseAppContext();
    if (!User) {
      return <Navigate to="login" />;
    }
    return children;
  }

  return (
    <div className="App">
     <Router>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Regester />} />
          <Route path="/Register/institution" element={<RegSch />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute >
                <Admin_Index />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashoard/view/students"
            element={
              <ProtectedRoute >
                <AdminViewStudent />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/user/profile"
            element={
              <ProtectedRoute >
                <Profile />
              </ProtectedRoute>
            }
          /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
