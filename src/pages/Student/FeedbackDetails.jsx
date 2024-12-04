import React, { useState } from "react";
import { Star, Clock, BookOpen, UserCheck } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../Admin/Layout";

const QuestionnaireData = [
  {
    id: 1,
    title: "Lecturer Evaluation",
    description: "Provide feedback on your lecturer's teaching performance",
    icon: <UserCheck className="w-10 h-10 text-blue-600" />,
    category: "Instructor",
    estimatedTime: "10 mins",
  },
  {
    id: 2,
    title: "Course Content Assessment",
    description: "Share your thoughts on the course material and structure",
    icon: <BookOpen className="w-10 h-10 text-green-600" />,
    category: "Course",
    estimatedTime: "15 mins",
  },
  {
    id: 3,
    title: "Overall Learning Experience",
    description: "Rate your overall satisfaction with the learning experience",
    icon: <Star className="w-10 h-10 text-yellow-600" />,
    category: "General",
    estimatedTime: "5 mins",
  },
  {
    id: 4,
    title: "Course Facilities Feedback",
    description: "Evaluate the learning environment and facilities",
    icon: <Clock className="w-10 h-10 text-purple-600" />,
    category: "Infrastructure",
    estimatedTime: "8 mins",
  },
];

const FeedbackDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const questionnaireId = parseInt(id);
  const questionnaire = QuestionnaireData.find((q) => q.id === questionnaireId);

  const [responses, setResponses] = useState({});

  const handleResponseChange = (questionId, value) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted responses:", responses);
  };

  const sampleQuestions = [
    {
      id: 1,
      type: "rating",
      text: "How effectively did the lecturer explain complex concepts?",
      options: [1, 2, 3, 4, 5],
    },
    {
      id: 2,
      type: "text",
      text: "What was the most valuable aspect of this course?",
    },
  ];

  if (!questionnaire) {
    return <div>Questionnaire not found</div>;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-32">
        <div className="w-full lg:w-[50%] mx-auto">
          <h1 className="text-2xl font-bold mb-6">{questionnaire.title}</h1>
          <form onSubmit={handleSubmit} className="space-y-2">
            {sampleQuestions.map((question) => (
              <div
                key={question.id}
                className="rounded-lg p-6"
              >
                <p className="text-lg mb-4">{question.text}</p>
                {question.type === "rating" && (
                  <div className="flex space-x-2">
                    {question.options.map((rating) => (
                      <label key={rating} className="inline-flex items-center">
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={rating}
                          onChange={() =>
                            handleResponseChange(question.id, rating)
                          }
                          className="form-radio p-2"
                        />
                        <span className="ml-2 text-base font-medium">{rating}</span>
                      </label>
                    ))}
                  </div>
                )}
                {question.type === "text" && (
                  <textarea
                    rows="4"
                    className="w-full border rounded-lg p-2"
                    onChange={(e) =>
                      handleResponseChange(question.id, e.target.value)
                    }
                  />
                )}
              </div>
            ))}
            <button
              type="submit"
              className="text-white flex justify-self-center mt-4 font-normal text-sm bg-blue-700 rounded px-8 py-3 hover:bg-blue-800"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default FeedbackDetails;
