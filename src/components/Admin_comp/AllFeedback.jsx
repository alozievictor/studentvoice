import React, { useState, useEffect } from "react";
import Layout from "../../pages/Admin/Layout";
import DashCard from "./DashCard";
import CustomTable from "../CustomTable";
import Modal from "../Modal";
import { toast } from "react-toastify";

const AllFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [totalFeedbacks, setTotalFeedbacks] = useState(0);
  const [pendingFeedbacks, setPendingFeedbacks] = useState(0);
  const [overdueFeedbacks, setOverdueFeedbacks] = useState(0);
  const headers = ["Name", "Student", "Date", "Department"];
  
  useEffect(() => {
    // Get feedbacks from localStorage
    const storedFeedbacks = JSON.parse(localStorage.getItem('studentVoiceFeedbacks') || '[]');
    
    // Count total feedbacks
    setTotalFeedbacks(storedFeedbacks.length);
    
    // For demonstration purposes, we'll consider feedbacks older than 7 days as overdue
    // and those without responses as pending
    const now = new Date();
    const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
    
    const overdueCount = storedFeedbacks.filter(feedback => {
      const feedbackDate = new Date(feedback.submittedAt);
      return feedbackDate < sevenDaysAgo;
    }).length;
    
    setOverdueFeedbacks(overdueCount);
    
    // For this demo, we'll set pending as 30% of total feedbacks
    setPendingFeedbacks(Math.floor(storedFeedbacks.length * 0.3));
    
    // Format for display
    const formattedFeedbacks = storedFeedbacks.map(feedback => ({
      id: feedback.id,
      name: feedback.questionnaireTitle,
      student: feedback.userName,
      date: new Date(feedback.submittedAt).toLocaleDateString(),
      department: feedback.department
    }));
    
    setFeedbacks(formattedFeedbacks);
  }, []);
  
  // If no feedbacks, use sample data
  const FeedsBack = feedbacks.length > 0 ? feedbacks : [
    {
      id: "1",
      name: "Lecturer evaluation",
      student: "John Doe",
      date: "10/09/2024",
      department: "Computer Science",
    },
    {
      id: "2",
      name: "Lecturer evaluation",
      student: "Jane Smith",
      date: "10/09/2024",
      department: "Computer Science",
    },
    {
      id: "3",
      name: "Course Content Assessment",
      student: "Alice Johnson",
      date: "10/09/2024",
      department: "Computer Science",
    }
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
    toast.success("Successfully Deleted");
  };

  return (
    <div className="w-full">
      <Layout>
        <div className="w-full mb-5 mt-32">
          <div className="w-full my-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <DashCard title="Total Feedback" digit={totalFeedbacks} />
            <DashCard title="Overdue Feedback" digit={overdueFeedbacks} />
            <DashCard title="Pending Feedback" digit={pendingFeedbacks} />
          </div>

          <div className="w-full mt-8">
            <CustomTable
              headers={headers}
              data={FeedsBack}
              title="All Feedback"
              onEdit={handleEdit}
              onDelete={handleDelete}
              view={true}
            />
          </div>
        </div>
      </Layout>

      <Modal isOpen={isEditModal} onClose={handleCloseModal}>
        <h2 className="text-lg font-semibold mb-4">Edit Feedback</h2>
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
                onClick={handleCloseModal}
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
    </div>
  );
};

export default AllFeedback;
