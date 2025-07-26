import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import DashCard from "../../components/Admin_comp/DashCard";
import AdminStudent from "../../components/Admin_comp/AdminStudent";
import TimeLineChart from "../../components/Admin_comp/TimeLineChart";
import Modal from "../../components/Modal";
import FeedbackTable from "../../components/Admin_comp/FeedbackTable";
import { UseAppContext } from "../../service/context";
import { useNavigate } from "react-router-dom";

const Admin_Index = () => {
  const { User } = UseAppContext();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [studentCount, setStudentCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [institutionCount, setInstitutionCount] = useState(0);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if(isModalOpen2) {
      setIsModalOpen2(false);
      return;
    }
    return;
  };
  
  useEffect(() => {
    // Get counts from localStorage
    const users = JSON.parse(localStorage.getItem('studentVoiceUsers') || '[]');
    const feedbacks = JSON.parse(localStorage.getItem('studentVoiceFeedbacks') || '[]');
    const institutions = JSON.parse(localStorage.getItem('studentVoiceInstitutions') || '[]');
    
    // Count students (users with role='student')
    const students = users.filter(user => user.role === 'student');
    setStudentCount(students.length);
    
    // Count all feedbacks
    setFeedbackCount(feedbacks.length);
    
    // Count institutions
    setInstitutionCount(institutions.length);
    
    // For institution-specific admin, filter counts by institutionId
    if (User && User.role === 'admin' && User.institutionId) {
      const institutionStudents = users.filter(
        user => user.role === 'student' && user.institutionId === User.institutionId
      );
      setStudentCount(institutionStudents.length);
      
      // Get feedbacks for this institution's students
      const institutionStudentIds = institutionStudents.map(student => student.id);
      const institutionFeedbacks = feedbacks.filter(
        feedback => institutionStudentIds.includes(feedback.userId)
      );
      setFeedbackCount(institutionFeedbacks.length);
    }
  }, [User]);

  const TimeData = [
    { x: "2022-01-01", y: 0 },
    { x: "2022-02-02", y: 20 },
    { x: "2022-03-03", y: 30 },
    { x: "2022-04-04", y: 40 },
    { x: "2022-05-05", y: 70 },
    { x: "2022-06-06", y: 90 },
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

  return (
    <div>
      <Layout>
        <div className="w-full text-blavk font-3xl mt-32">
          <div className="lg:flex justify-between items-center">
            <div className="grid gap-1">
              <p className="text-black text-sm font-normal">Admin Dashboard</p>
              <h2 className="text-xl text-black font-medium">
                Welcome to Admin_Name
              </h2>
            </div>
            <div className="flex items-center space-x-5 pt-10 lg:pt-0">
              {/* <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="font-normal text-sm border border-gray-400 text-gray-600 rounded px-5 py-2.5"
              >
                Add Student
              </button> */}
              {/* <button
                type="button"
                onClick={()=> setIsModalOpen2(true)}
                className="text-white font-normal text-sm bg-blue-700 rounded px-5 py-2.5 hover:bg-blue-800 mx-2"
              >
                Create Feedback
              </button> */}
              <button
                type="button"
                onClick={() => navigate('/admin/questions')}
                className="text-white font-normal text-sm bg-green-700 rounded px-5 py-2.5 hover:bg-green-800"
              >
                Manage Questionnaires
              </button>
            </div>
          </div>

          <div className="w-full my-8 grid lg:grid-cols-2 xl:grid-cols-3 gap-5">
            <DashCard title="Total Institutions" digit={institutionCount} />
            <DashCard title="Total Students" digit={studentCount} />
            <DashCard title="Total Feedbacks" digit={feedbackCount} />
          </div>
        </div>
        <div className="w-full grid lg:grid-cols-5 gap-4 my-6 py-5">
          <div className="full lg:col-span-3">
            <AdminStudent />
          </div>
          <div className="full lg:col-span-2">
            <FeedbackTable />
          </div>
        </div>
        <div className="w-full bg-white p-4 grid gap-3 border shadow-sm rounded-md mt-3">
        <p className="font-[Urbanist] font-bold text-black text-base mt-2">
          Performance Rating
        </p>
        <div className="w-full my-3">
          <TimeLineChart data={TimeData} />
        </div>
      </div>
      </Layout>

      <Modal isOpen={isModalOpen2} onClose={handleCloseModal}>
        <h2 className="text-lg font-semibold mb-4">Create New Feedback</h2>
        <form className="py-6">
          <div className="grid xl:grid-cols-2 gap-4 w-full">
            <div className="grid gap-1">
              <label class="text-zinc-950 font-normal" for="firstname">
                Topic
              </label>
              <input
                class="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-950 placeholder:text-zinc-500 focus:outline-0"
                id=""
                placeholder="Enter topic"
                type="text"
                autocapitalize=""
                autocomplete="topic"
                autocorrect="off"
                name=""
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

          </div>
          <div className="flex justify-end items-center w-full mt-7 rounded-md p-2">
            <div className={`flex items-center justify-between lg:w-[35%]`}>
              <button
                type="button"
                className={`font-normal text-sm border border-gray-400 text-gray-600 hover:text-gray-700 rounded px-10 py-2.5`}
              >
                Cancel
              </button>

              <button
                type="button"
                className={`text-white font-normal text-sm bg-blue-700 rounded px-5 py-2.5 hover:bg-blue-800`}
              >
                Create Feedback
              </button>
            </div>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-lg font-semibold mb-4">Add New Student</h2>
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

export default Admin_Index;
