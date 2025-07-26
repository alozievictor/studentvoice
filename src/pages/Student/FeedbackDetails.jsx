import React, { useState, useEffect } from "react";
import { Star, Clock, BookOpen, UserCheck, ChevronLeft } from "lucide-react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "../Admin/Layout";
import { UseAppContext } from "../../service/context";
import { toast } from "react-toastify";

const FeedbackDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { User } = UseAppContext();
  
  const [questionnaire, setQuestionnaire] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [responses, setResponses] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    // Redirect if not logged in
    if (!User) {
      toast.error("Please login to submit feedback");
      navigate('/login');
      return;
    }
    
    // Load questionnaire
    const storedQuestionnaires = JSON.parse(localStorage.getItem('studentVoiceQuestionnaires') || '[]');
    const foundQuestionnaire = storedQuestionnaires.find(q => q.id.toString() === id);
    
    if (!foundQuestionnaire) {
      toast.error("Questionnaire not found");
      navigate('/student/questions');
      return;
    }
    
    setQuestionnaire(foundQuestionnaire);
    
    // Check if user has already submitted this questionnaire
    const feedbacks = JSON.parse(localStorage.getItem('studentVoiceFeedbacks') || '[]');
    const hasSubmitted = feedbacks.some(
      feedback => feedback.userId === User.id && feedback.questionnaireId.toString() === id
    );
    
    if (hasSubmitted) {
      setAlreadySubmitted(true);
      toast.info("You have already submitted this questionnaire");
    }
    
    setLoading(false);
  }, [id, User, navigate]);

  const handleResponseChange = (questionId, value) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (alreadySubmitted) {
      toast.info("You have already submitted this questionnaire");
      navigate('/student/questions');
      return;
    }
    
    // Check if there are any responses
    if (Object.keys(responses).length === 0) {
      toast.error('Please provide at least one response before submitting');
      return;
    }
    
    // Check if all required questions are answered
    const requiredQuestions = questionnaire.questions;
    const unansweredQuestions = requiredQuestions.filter(q => !responses[q.id]);
    
    if (unansweredQuestions.length > 0) {
      toast.error(`Please answer all questions before submitting`);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate network delay
    setTimeout(() => {
      try {
        // Get existing feedbacks from localStorage or initialize empty array
        const feedbacks = JSON.parse(localStorage.getItem('studentVoiceFeedbacks') || '[]');
        
        // Create new feedback entry
        const newFeedback = {
          id: Date.now().toString(),
          questionnaireId: questionnaire.id,
          questionnaireTitle: questionnaire.title,
          responses: responses,
          userId: User?.id || 'anonymous',
          userName: User?.name || 'Anonymous User',
          submittedAt: new Date().toISOString(),
          department: User?.department || 'Not specified'
        };
        
        // Add to feedbacks array
        feedbacks.push(newFeedback);
        
        // Save back to localStorage
        localStorage.setItem('studentVoiceFeedbacks', JSON.stringify(feedbacks));
        
        toast.success('Feedback submitted successfully!');
        navigate('/student/questions');
      } catch (error) {
        console.error("Feedback submission error:", error);
        toast.error("Submission failed. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }, 1500);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 mt-32">
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!questionnaire) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 mt-32">
          <div className="text-center">
            <p className="text-xl text-gray-600">Questionnaire not found</p>
            <Link to="/student/questions" className="text-blue-600 hover:underline mt-4 inline-block">
              <ChevronLeft className="inline-block mr-1" size={16} />
              Back to questionnaires
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-32">
        <div className="w-full lg:w-[60%] mx-auto">
          <div className="mb-6">
            <Link to="/student/questions" className="text-blue-600 hover:underline inline-flex items-center">
              <ChevronLeft size={16} />
              Back to questionnaires
            </Link>
          </div>
          
          <div className="mb-8">
            <h1 className="text-2xl font-bold">{questionnaire.title}</h1>
            <p className="text-gray-600 mt-2">{questionnaire.description}</p>
            <div className="flex items-center text-sm text-gray-500 mt-2">
              <Clock className="w-4 h-4 mr-2" />
              <span>Estimated time: {questionnaire.estimatedTime}</span>
            </div>
          </div>
          
          {alreadySubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-green-700">You've already submitted this questionnaire</h3>
              <p className="text-gray-600 mt-2">Thank you for your feedback!</p>
              <Link to="/student/questions" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                View Other Questionnaires
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {questionnaire.questions.map((question) => (
                <div
                  key={question.id}
                  className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
                >
                  <p className="text-lg mb-4 font-medium">{question.text}</p>
                  {question.type === "rating" && (
                    <div className="flex flex-wrap gap-4">
                      {question.options.map((rating) => (
                        <label key={rating} className="inline-flex items-center bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 cursor-pointer">
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={rating}
                            onChange={() =>
                              handleResponseChange(question.id, rating)
                            }
                            className="form-radio p-2 text-blue-600"
                          />
                          <span className="ml-2 text-base font-medium">{rating}</span>
                        </label>
                      ))}
                    </div>
                  )}
                  {question.type === "text" && (
                    <textarea
                      rows="4"
                      className="w-full border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Type your response here..."
                      onChange={(e) =>
                        handleResponseChange(question.id, e.target.value)
                      }
                    />
                  )}
                </div>
              ))}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-white flex justify-center items-center font-medium text-base bg-blue-700 rounded-lg px-8 py-3 hover:bg-blue-800 w-full"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                      Submitting...
                    </>
                  ) : 'Submit Feedback'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default FeedbackDetails;
