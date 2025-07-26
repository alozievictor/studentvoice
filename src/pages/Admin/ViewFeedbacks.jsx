import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout";

// Custom scrollbar styles
const customScrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #eee;
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #eee;
  }
`;

// Add style to the document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = customScrollbarStyles;
  document.head.appendChild(styleSheet);
}

const ViewFeedbacks = () => {
  const { id } = useParams();
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  
  useEffect(() => {
    // Get feedbacks from localStorage
    const storedFeedbacks = JSON.parse(localStorage.getItem('studentVoiceFeedbacks') || '[]');
    
    // Format for display
    const formattedFeedbacks = storedFeedbacks.map(feedback => ({
      id: feedback.id,
      type: feedback.questionnaireTitle,
      date: new Date(feedback.submittedAt).toLocaleDateString(),
      message: Object.entries(feedback.responses)
        .map(([questionId, response]) => `Q${questionId}: ${response}`)
        .join('\n'),
      student: feedback.userName,
      department: feedback.department
    }));
    
    setFeedbacks(formattedFeedbacks);
    
    // If we have an ID from URL params, select that feedback
    if (id && formattedFeedbacks.length > 0) {
      const feedback = formattedFeedbacks.find(f => f.id === id);
      if (feedback) {
        setSelectedFeedback(feedback);
      }
    }
  }, [id]);

  // Fallback to sample data if no feedbacks in localStorage
  const FeedbackData = feedbacks.length > 0 ? feedbacks : [
    {
      id: "1",
      type: "Lecturer Feedback",
      date: "30-11-2024",
      message: "He is a very good lecturer that knows what he's doing",
      student: "John Doe",
      department: "Computer Science"
    },
    {
      id: "2",
      type: "Course Feedback",
      date: "29-11-2024", 
      message: "The course content is comprehensive and engaging",
      student: "Jane Smith",
      department: "Computer Science"
    },
    {
      id: "3",
      type: "Course Feedback",
      date: "29-11-2024", 
      message: "The course content is comprehensive and engaging",
      student: "Alice Johnson",
      department: "Computer Science"
    },
    {
      id: 4,
      type: "Course Feedback",
      date: "29-11-2024", 
      message: "The course content is comprehensive and engaging",
    },
    {
      id: 5,
      type: "Course Feedback",
      date: "29-11-2024", 
      message: "The course content is comprehensive and engaging",
    },
    {
      id: 6,
      type: "Course Feedback",
      date: "29-11-2024", 
      message: "The course content is comprehensive and engaging",
    },
  ];

  const handleFeedbackSelect = (feedback) => {
    setSelectedFeedback(feedback);
  };

  return (
    <div className="w-full">
      <Layout>
        <div className="w-full mb-5 mt-32 grid lg:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-6 col-span-1 max-h-[87%] overflow-y-auto custom-scrollbar">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Feedback List</h2>
            </div> 
            <div className="h-full pr-2 ">
              <div className="grid gap-3">
                {FeedbackData.map((data) => (
                  <FeedbackBtn 
                    key={data.id} 
                    data={data} 
                    isSelected={selectedFeedback?.id === data.id}
                    onSelect={() => handleFeedbackSelect(data)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg max-h-[87%] p-6 col-span-2">
            {selectedFeedback ? (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">Feedback Details</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-2">
                    <span className="font-semibold">Type:</span> {selectedFeedback.type}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    <span className="font-semibold">Date:</span> {selectedFeedback.date}
                  </p>
                  <p className="text-base text-gray-700 mt-4">
                    {selectedFeedback.message}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center text-center h-full text-gray-500">
                Select a feedback to view details
              </div>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

const FeedbackBtn = ({ data, isSelected, onSelect }) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full cursor-pointer border-b border-gray-300 p-4 text-left transition-colors duration-200 
        ${isSelected 
          ? 'bg-blue-50 border-l-4 border-l-blue-500 text-blue-700 font-semibold' 
          : 'hover:bg-gray-100'}`}
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{data.type}</span>
        <span className="text-xs text-gray-500">{data.date}</span>
      </div>
      <p className="text-gray-600 text-sm mt-2 truncate">
        {data.message}
      </p>
    </button>
  );
};

export default ViewFeedbacks;