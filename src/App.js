import React, { useEffect } from "react";
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
import FeedbackQuestionManager from "./components/Admin_comp/FeedbackQuestionManager";
import ViewFeedbacks from "./pages/Admin/ViewFeedbacks";
import Feedbacks from "./pages/Student/Feedbacks";
import FeedbackDetails from "./pages/Student/FeedbackDetails";

function App() {
  useEffect(() => {
    // Initialize localStorage with default values if they don't exist
    if (!localStorage.getItem('studentVoiceUsers')) {
      const defaultUsers = [
        {
          id: 'admin-1',
          name: 'Admin User',
          email: 'admin@example.com',
          password: 'admin123',
          role: 'admin'
        },
        {
          id: 'student-1',
          name: 'Student User',
          email: 'student@example.com',
          password: 'student123',
          role: 'student'
        }
      ];
      localStorage.setItem('studentVoiceUsers', JSON.stringify(defaultUsers));
    }
    
    if (!localStorage.getItem('studentVoiceFeedbacks')) {
      localStorage.setItem('studentVoiceFeedbacks', JSON.stringify([]));
    }
    
    if (!localStorage.getItem('studentVoiceInstitutions')) {
      localStorage.setItem('studentVoiceInstitutions', JSON.stringify([]));
    }
    
    // Initialize questionnaires if they don't exist
    if (!localStorage.getItem('studentVoiceQuestionnaires')) {
      const defaultQuestionnaires = [
        {
          id: '1',
          title: 'Lecturer Evaluation',
          description: 'Provide feedback on your lecturer\'s teaching performance',
          category: 'Instructor',
          estimatedTime: '10 mins',
          createdBy: 'admin-1',
          createdAt: new Date().toISOString(),
          questions: [
            {
              id: 1,
              type: 'rating',
              text: 'How effectively did the lecturer explain complex concepts?',
              options: [1, 2, 3, 4, 5]
            },
            {
              id: 2,
              type: 'text',
              text: 'What was the most valuable aspect of this course?'
            }
          ]
        },
        {
          id: '2',
          title: 'Course Content Assessment',
          description: 'Share your thoughts on the course material and structure',
          category: 'Course',
          estimatedTime: '15 mins',
          createdBy: 'admin-1',
          createdAt: new Date().toISOString(),
          questions: [
            {
              id: 1,
              type: 'rating',
              text: 'How would you rate the course materials?',
              options: [1, 2, 3, 4, 5]
            },
            {
              id: 2,
              type: 'text',
              text: 'What aspects of the course content could be improved?'
            }
          ]
        }
      ];
      localStorage.setItem('studentVoiceQuestionnaires', JSON.stringify(defaultQuestionnaires));
    }
  }, []);

  function ProtectedRoute({ children, requiredRole }) {
    const { User } = UseAppContext();
    
    if (!User) {
      return <Navigate to="/login" />;
    }
    
    // If role is specified and user doesn't have that role, redirect
    if (requiredRole && User.role !== requiredRole) {
      return User.role === 'admin' 
        ? <Navigate to="/admin/dashboard" />
        : <Navigate to="/student/questions" />;
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
              <ProtectedRoute requiredRole="admin">
                <Admin_Index />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashoard/view/students"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminViewStudent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashoard/view/feedbacks"
            element={
              <ProtectedRoute requiredRole="admin">
                <AllFeedback />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashoard/view/feedbacks/details/:id"
            element={
              <ProtectedRoute requiredRole="admin">
                <ViewFeedbacks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/questions"
            element={
              <ProtectedRoute requiredRole="admin">
                <FeedbackQuestionManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/questions"
            element={
              <ProtectedRoute requiredRole="student">
                <Feedbacks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/questions/details/:id"
            element={
              <ProtectedRoute requiredRole="student">
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
