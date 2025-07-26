import React, { useState, useEffect } from "react";
import CustomTable from "../CustomTable";
import { UseAppContext } from "../../service/context";

const AdminStudent = () => {
  const { User } = UseAppContext();
  const headers = ["Name", "Gender", "Email", "Department"];
  const [students, setStudents] = useState([]);
  
  useEffect(() => {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('studentVoiceUsers') || '[]');
    
    // Filter to get only students
    let studentUsers = users.filter(user => user.role === 'student');
    
    // For institution-specific admin, filter by institutionId
    if (User && User.role === 'admin' && User.institutionId) {
      studentUsers = studentUsers.filter(
        student => student.institutionId === User.institutionId
      );
    }
    
    // Format for display
    const formattedStudents = studentUsers.map(user => ({
      id: user.id,
      name: user.name || 'N/A',
      gender: 'Not specified', // Add this field to registration if needed
      email: user.email,
      department: user.department || 'Computer Science' // Add this field to registration if needed
    }));
    
    setStudents(formattedStudents);
  }, [User]);
  
  // If no students, use sample data
  const data = students.length > 0 ? students : [
    {
      id: 1,
      name: "John Doe",
      age: 20,
      gender: "Male",
      email: "john.doe@example.com",
      phone: "+1234567890",
      department: "Computer Science",
      gpa: 3.8,
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 22,
      gender: "Female",
      email: "jane.smith@example.com",
      phone: "+1234567891",
      department: "Mechanical Engineering",
      gpa: 3.6,
    },
    {
      id: 3,
      name: "David Johnson",
      age: 21,
      gender: "Male",
      email: "david.johnson@example.com",
      phone: "+1234567892",
      department: "Business Administration",
      gpa: 3.9,
    },
    {
      id: 4,
      name: "Emily Davis",
      age: 23,
      gender: "Female",
      email: "emily.davis@example.com",
      phone: "+1234567893",
      department: "Electrical Engineering",
      gpa: 3.7,
    },
    {
      id: 5,
      name: "Michael Brown",
      age: 19,
      gender: "Male",
      email: "michael.brown@example.com",
      phone: "+1234567894",
      department: "Mathematics",
      gpa: 3.5,
    },
  ];

  return (
    <CustomTable
      headers={headers}
      data={data}
      navigateTo="/admin/dashoard/view/students"
      title="All Students"
      viewAllText="View all"
    />
  );
};

export default AdminStudent;
