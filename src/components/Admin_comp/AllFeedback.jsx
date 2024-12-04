import React from "react";
import Layout from "../../pages/Admin/Layout";
import DashCard from "./DashCard";
import CustomTable from "../CustomTable";
import Modal from "../Modal";
import { toast } from "react-toastify";

const AllFeedback = () => {
  const headers = ["Name", "Date", "Department"];
  const FeedsBack = [
    {
      id: 1,
      name: "Lectuerer evaluation",
      date: "10/09/2024",
      department: "Computer Science",
    },
    {
      id: 2,
      name: "Lectuerer evaluation",
      date: "10/09/2024",
      department: "Computer Science",
    },
    {
      id: 3,
      name: "Lectuerer evaluation",
      date: "10/09/2024",
      department: "Computer Science",
    },
    {
      id: 4,
      name: "Lectuerer evaluation",
      date: "10/09/2024",
      department: "Computer Science",
    },
    {
      id: 5,
      name: "Lectuerer evaluation",
      date: "10/09/2024",
      department: "Nursing",
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
    toast.success("Successfully Deleted");
  };

  return (
    <div className="w-full">
      <Layout>
        <div className="w-full mb-5 mt-32">
          <div className="w-full my-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <DashCard title="Total Feedback" digit="50" />
            <DashCard title="Overdue Feedback" digit="15" />
            <DashCard title="Pending Feedback" digit="35" />
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
