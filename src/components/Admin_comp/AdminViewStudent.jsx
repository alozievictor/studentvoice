import React, { useState, useEffect } from "react";
import Layout from "../../pages/Admin/Layout";
import DashCard from "./DashCard";
import CustomTable from "../CustomTable";
import Modal from "../Modal";
import { toast } from "react-toastify";
import { UseAppContext } from "../../service/context";

const AdminViewStudent = () => {
  const { User } = UseAppContext();
  const [studentCount, setStudentCount] = useState(0);
  const headers = ["Name", "Gender", "Email", "Phone", "Age", "Department"];
  
  useEffect(() => {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('studentVoiceUsers') || '[]');
    
    // Count students (users with role='student')
    const students = users.filter(user => user.role === 'student');
    setStudentCount(students.length);
    
    // For institution-specific admin, filter by institutionId
    if (User && User.role === 'admin' && User.institutionId) {
      const institutionStudents = users.filter(
        user => user.role === 'student' && user.institutionId === User.institutionId
      );
      setStudentCount(institutionStudents.length);
    }
  }, [User]);
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
  const Department = [
    {
      id: 1,
      name: "Computer Science",
    },
    {
      id: 2,
      name: "Mass Communication",
    },
    {
      id: 3,
      name: "Electrical Engineering",
    },
    {
      id: 4,
      name: "Business Administration",
    },
  ];
  const [isEditModal, setIsEditModal] = React.useState(false);

  const handleCloseModal = () => {
    setIsEditModal(false);
    return;
  };

  const handleEdit = (row) => {
    console.log("Edit student:", row);
    setIsEditModal(true);
  };

  const handleDelete = (row) => {
    toast.success("Successfully Deleted")
  };

  return (
    <div className="w-full">
      <Layout>
        <div className=" w-full mb-5 mt-32">
          <DashCard title="Total Students" digit={studentCount} />

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

      <Modal isOpen={isEditModal} onClose={handleCloseModal}>
        <h2 className="text-lg font-semibold mb-4">Edit Student Details</h2>
        <form className="py-6">
          <div className="grid xl:grid-cols-2 gap-4 w-full">
            <div className="grid gap-1">
              <label class="text-zinc-950 font-normal" for="firstname">
                FirstName
              </label>
              <input
                class="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-950 placeholder:text-zinc-500 focus:outline-0"
                id="email"
                placeholder="Enter fullname"
                type="text"
                autocapitalize=""
                autocomplete="email"
                autocorrect="off"
                name="email"
              />
            </div>
            <div className="grid gap-1">
              <label class="text-zinc-950 font-normal" for="lastname">
                LastName
              </label>
              <input
                class="Input-sty"
                id=""
                placeholder="Enter lastname"
                type="text"
                autocapitalize=""
                autocomplete=""
                autocorrect="off"
                name="lastname"
              />
            </div>
            <div className="grid gap-1">
              <label class="text-zinc-950 font-normal" for="email">
                Email
              </label>
              <input
                class="Input-sty"
                id="email"
                placeholder="Enter email address"
                type="email"
                autocapitalize="none"
                autocomplete="email"
                autocorrect="off"
                name="email"
              />
            </div>
            <div className="grid gap-1">
              <label class="text-zinc-950 font-normal" for="email">
                Phone
              </label>
              <input
                class="Input-sty"
                id="phane"
                placeholder="Enter mobile number"
                type="tel"
                autocapitalize="none"
                autocomplete=""
                autocorrect=""
                name="phone"
              />
            </div>
            <div className="grid gap-1">
              <label class="text-zinc-950 font-normal" for="email">
                Gender
              </label>
              <input
                class="Input-sty"
                id="gender"
                placeholder="Enter gender"
                type="gender"
                autocapitalize="none"
                autocomplete="gender"
                autocorrect="off"
                name="gender"
              />
            </div>
            <div className="grid gap-1">
              <label class="text-zinc-950 font-normal" for="email">
                Department
              </label>
              <select id="department" name="department" className="Input-sty">
                <option value="">--Select Department--</option>
                {Department.map((department) => (
                  <option key={department.id} value={department.name}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-1">
              <label class="text-zinc-950 font-normal" for="email">
                Country
              </label>
              <input
                class="Input-sty"
                id="country"
                placeholder="Enter country"
                type="text"
                autocapitalize="none"
                autocomplete=""
                autocorrect="off"
                name="country"
              />
            </div>
            <div className="grid gap-1">
              <label class="text-zinc-950 font-normal" for="email">
                State
              </label>
              <input
                class="Input-sty"
                id="state"
                placeholder="Enter state"
                type="text"
                autocapitalize="none"
                autocomplete=""
                autocorrect="off"
                name="state"
              />
            </div>
          </div>
          <div className="flex justify-end items-center w-full mt-7 rounded-md p-2">
            <div className={`flex items-center justify-between lg:w-[35%]`}>
              <button
                type="button"
                onClick={handleCloseModal}
                className={`font-normal text-sm border border-gray-400 text-gray-600 hover:text-gray-700 rounded px-10 py-2.5`}
              >
                Cancel
              </button>

              <button
                type="button"
                className={`text-white font-normal text-sm bg-blue-700 rounded px-7 py-2.5 hover:bg-blue-800`}
              >
                Add Student
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminViewStudent;
