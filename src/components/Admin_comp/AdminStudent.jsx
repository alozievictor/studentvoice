import React from "react";
import CustomTable from "../CustomTable";

const AdminStudent = () => {
  const headers = ["Name", "Gender", "Email", "Department"];
  const data = [
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
