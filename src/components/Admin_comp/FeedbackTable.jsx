import React from "react";
import CustomTable from "../CustomTable";

const FeedbackTable = () => {
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
