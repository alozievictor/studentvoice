import React, { useState, useEffect } from "react";
import CustomTable from "../CustomTable";
import { UseAppContext } from "../../service/context";

const FeedbackTable = () => {
  const { User } = UseAppContext();
  const headers = ["Name", "Student", "Date", "Department"];
  const [feedbacks, setFeedbacks] = useState([]);
  
  useEffect(() => {
    // Get feedbacks and users from localStorage
    const storedFeedbacks = JSON.parse(localStorage.getItem('studentVoiceFeedbacks') || '[]');
    const users = JSON.parse(localStorage.getItem('studentVoiceUsers') || '[]');
    
    let filteredFeedbacks = [...storedFeedbacks];
    
    // For institution-specific admin, filter feedbacks by institutionId
    if (User && User.role === 'admin' && User.institutionId) {
      // Get students of this institution
      const institutionStudents = users.filter(
        user => user.role === 'student' && user.institutionId === User.institutionId
      );
      
      // Get student IDs for filtering feedbacks
      const institutionStudentIds = institutionStudents.map(student => student.id);
      
      // Filter feedbacks by student ID
      filteredFeedbacks = storedFeedbacks.filter(
        feedback => institutionStudentIds.includes(feedback.userId)
      );
    }
    
    // Format for display (get latest 5 feedbacks)
    const formattedFeedbacks = filteredFeedbacks
      .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
      .slice(0, 5)
      .map(feedback => ({
        id: feedback.id,
        name: feedback.questionnaireTitle,
        student: feedback.userName,
        date: new Date(feedback.submittedAt).toLocaleDateString(),
        department: feedback.department
      }));
    
    setFeedbacks(formattedFeedbacks);
  }, [User]);
  
  // If no feedbacks, use sample data
  const FeedsBack = feedbacks.length > 0 ? feedbacks : [
    {
      id: 1,
      name: "Lecturer evaluation",
      student: "John Doe",
      date: "10/09/2024",
      department: "Computer Science",
    },
    {
      id: 2,
      name: "Lecturer evaluation",
      student: "Jane Smith",
      date: "10/09/2024",
      department: "Computer Science",
    },
    {
      id: 3,
      name: "Course Content Assessment",
      student: "Alice Johnson",
      date: "10/09/2024",
      department: "Computer Science",
    }
  ];

  return (
    <CustomTable
      headers={headers}
      data={FeedsBack}
      navigateTo="/admin/dashoard/view/feedbacks"
      title="Feedbacks"
      viewAllText="View all"
    />
  );
};

export default FeedbackTable;
