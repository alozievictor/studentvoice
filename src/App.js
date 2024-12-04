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
import AllFeedback from "./components/Admin_comp/AllFeedback";
import ViewFeedbacks from "./pages/Admin/ViewFeedbacks";
import FeedbackQuestionnaires from "./pages/Student/Feedbacks";
import FeedbackDetails from "./pages/Student/FeedbackDetails";

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
              <ProtectedRoute>
                <Admin_Index />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashoard/view/students"
            element={
              <ProtectedRoute>
                <AdminViewStudent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashoard/view/feedbacks"
            element={
              <ProtectedRoute>
                <AllFeedback />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashoard/view/feedbacks/details/:id"
            element={
              <ProtectedRoute>
                <ViewFeedbacks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/questions"
            element={
              <ProtectedRoute>
                <FeedbackQuestionnaires />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/questions/details/:id"
            element={
              <ProtectedRoute>
                <FeedbackDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
