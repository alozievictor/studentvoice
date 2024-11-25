import React from "react";
import Layout from "../../pages/Admin/Layout";
import DashCard from "./DashCard";
import CustomTable from "../CustomTable";

const AdminViewStudent = () => {
  const headers = ["Name", "Gender", "Email", "Phone", "Age", "Department"];
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

  const handleEdit = (row) => {
    console.log("Edit student:", row);
  };

  const handleDelete = (row) => {
    console.log("Delete student:", row);
    alert(`Are you sure you want to delete ${row.name}?`);
  };

  return (
    <div className="w-full">
      <Layout>
        <div className=" w-full mb-5 mt-32">
          <DashCard title="Total Student" digit="275" />

          <div className="w-full mt-8">
            <CustomTable
              headers={headers}
              data={data}
              title="All Students"
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AdminViewStudent;
