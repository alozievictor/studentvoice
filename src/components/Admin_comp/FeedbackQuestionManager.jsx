import React, { useState, useEffect } from "react";
import Layout from "../../pages/Admin/Layout";
import CustomTable from "../CustomTable";
import Modal from "../Modal";
import { toast } from "react-toastify";
import { Star, Clock, BookOpen, UserCheck } from "lucide-react";
import { UseAppContext } from "../../service/context";

const FeedbackQuestionManager = () => {
  const { User } = UseAppContext();
  const [isCreateModal, setIsCreateModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [questionnaires, setQuestionnaires] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentQuestionnaire, setCurrentQuestionnaire] = useState(null);

  // Form state for creating/editing questionnaires
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Instructor",
    estimatedTime: "10 mins",
    questions: [
      {
        id: Date.now(),
        type: "rating",
        text: "How would you rate this?",
        options: [1, 2, 3, 4, 5]
      }
    ]
  });

  const headers = ["Title", "Category", "Questions", "Responses"];

  const iconMap = {
    Instructor: <UserCheck className="w-6 h-6 text-blue-600" />,
    Course: <BookOpen className="w-6 h-6 text-green-600" />,
    General: <Star className="w-6 h-6 text-yellow-600" />,
    Infrastructure: <Clock className="w-6 h-6 text-purple-600" />
  };

  useEffect(() => {
    loadQuestionnaires();
  }, []);

  const loadQuestionnaires = () => {
    // Get questionnaires from localStorage
    const storedQuestionnaires = JSON.parse(localStorage.getItem('studentVoiceQuestionnaires') || '[]');
    const feedbacks = JSON.parse(localStorage.getItem('studentVoiceFeedbacks') || '[]');
    
    // Count responses for each questionnaire
    const questionnairesWithCounts = storedQuestionnaires.map(q => {
      const responseCount = feedbacks.filter(f => f.questionnaireId === q.id).length;
      return {
        ...q,
        responseCount
      };
    });
    
    setQuestionnaires(questionnairesWithCounts);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      questions: updatedQuestions
    }));
  };

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      type: "rating",
      text: "",
      options: [1, 2, 3, 4, 5]
    };
    
    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
  };

  const removeQuestion = (index) => {
    if (formData.questions.length <= 1) {
      toast.error("At least one question is required");
      return;
    }
    
    const updatedQuestions = formData.questions.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      questions: updatedQuestions
    }));
  };

  const handleCloseModals = () => {
    setIsCreateModal(false);
    setIsEditModal(false);
    setIsDeleteModal(false);
    setCurrentQuestionnaire(null);
    setFormData({
      title: "",
      description: "",
      category: "Instructor",
      estimatedTime: "10 mins",
      questions: [
        {
          id: Date.now(),
          type: "rating",
          text: "How would you rate this?",
          options: [1, 2, 3, 4, 5]
        }
      ]
    });
  };

  const handleEdit = (row) => {
    const questionnaire = questionnaires.find(q => q.id.toString() === row.id.toString());
    if (!questionnaire) return;
    
    setCurrentQuestionnaire(questionnaire);
    setFormData({
      title: questionnaire.title,
      description: questionnaire.description,
      category: questionnaire.category,
      estimatedTime: questionnaire.estimatedTime,
      questions: questionnaire.questions
    });
    setIsEditModal(true);
  };

  const handleDelete = (row) => {
    const questionnaire = questionnaires.find(q => q.id.toString() === row.id.toString());
    if (!questionnaire) return;
    
    setCurrentQuestionnaire(questionnaire);
    setIsDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!currentQuestionnaire) return;
    
    setIsSubmitting(true);
    
    try {
      // Get existing questionnaires
      const storedQuestionnaires = JSON.parse(localStorage.getItem('studentVoiceQuestionnaires') || '[]');
      
      // Filter out the questionnaire to delete
      const updatedQuestionnaires = storedQuestionnaires.filter(
        q => q.id !== currentQuestionnaire.id
      );
      
      // Save back to localStorage
      localStorage.setItem('studentVoiceQuestionnaires', JSON.stringify(updatedQuestionnaires));
      
      toast.success("Feedback questionnaire deleted successfully");
      loadQuestionnaires();
      handleCloseModals();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete questionnaire");
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return false;
    }
    if (!formData.description.trim()) {
      toast.error("Description is required");
      return false;
    }
    if (!formData.category) {
      toast.error("Category is required");
      return false;
    }
    
    // Validate each question
    for (const question of formData.questions) {
      if (!question.text.trim()) {
        toast.error("Question text cannot be empty");
        return false;
      }
      if (question.type === "rating" && question.options.length < 2) {
        toast.error("Rating questions must have at least 2 options");
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      try {
        // Get existing questionnaires
        const storedQuestionnaires = JSON.parse(localStorage.getItem('studentVoiceQuestionnaires') || '[]');
        
        if (isEditModal && currentQuestionnaire) {
          // Update existing questionnaire
          const updatedQuestionnaires = storedQuestionnaires.map(q => 
            q.id === currentQuestionnaire.id 
              ? { 
                  ...q, 
                  title: formData.title,
                  description: formData.description,
                  category: formData.category,
                  estimatedTime: formData.estimatedTime,
                  questions: formData.questions,
                  updatedAt: new Date().toISOString()
                }
              : q
          );
          
          localStorage.setItem('studentVoiceQuestionnaires', JSON.stringify(updatedQuestionnaires));
          toast.success("Feedback questionnaire updated successfully");
        } else {
          // Create new questionnaire
          const newQuestionnaire = {
            id: Date.now().toString(),
            title: formData.title,
            description: formData.description,
            category: formData.category,
            estimatedTime: formData.estimatedTime,
            questions: formData.questions,
            createdBy: User?.id || 'admin',
            createdAt: new Date().toISOString(),
            icon: formData.category // This will be mapped to the actual icon component when rendering
          };
          
          storedQuestionnaires.push(newQuestionnaire);
          localStorage.setItem('studentVoiceQuestionnaires', JSON.stringify(storedQuestionnaires));
          toast.success("Feedback questionnaire created successfully");
        }
        
        loadQuestionnaires();
        handleCloseModals();
      } catch (error) {
        console.error("Submission error:", error);
        toast.error("Failed to save questionnaire");
      } finally {
        setIsSubmitting(false);
      }
    }, 1000);
  };

  // Format questionnaires for display in table
  const tableData = questionnaires.map(q => ({
    id: q.id,
    title: q.title,
    category: q.category,
    questions: `${q.questions.length} question${q.questions.length !== 1 ? 's' : ''}`,
    responses: q.responseCount || 0
  }));

  const categories = ["Instructor", "Course", "General", "Infrastructure"];

  return (
    <div className="w-full">
      <Layout>
        <div className="w-full mb-5 mt-32">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Feedback Questionnaires</h1>
            <button
              onClick={() => setIsCreateModal(true)}
              className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
            >
              Create New Questionnaire
            </button>
          </div>

          <div className="w-full mt-8">
            <CustomTable
              headers={headers}
              data={tableData}
              title="All Questionnaires"
              onEdit={handleEdit}
              onDelete={handleDelete}
              view={true}
              viewPath="/admin/questions"
            />
          </div>
        </div>
      </Layout>

      {/* Create/Edit Questionnaire Modal */}
      <Modal isOpen={isCreateModal || isEditModal} onClose={handleCloseModals}>
        <h2 className="text-lg font-semibold mb-4">
          {isEditModal ? "Edit Questionnaire" : "Create New Questionnaire"}
        </h2>
        <div className="py-6">
          <div className="grid gap-4 w-full">
            <div className="grid gap-1">
              <label className="text-zinc-950 font-normal">
                Title
              </label>
              <input
                className="h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium"
                placeholder="Enter questionnaire title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-1">
              <label className="text-zinc-950 font-normal">
                Description
              </label>
              <textarea
                className="h-24 w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium"
                placeholder="Enter description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-1">
                <label className="text-zinc-950 font-normal">
                  Category
                </label>
                <select
                  className="h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-1">
                <label className="text-zinc-950 font-normal">
                  Estimated Time
                </label>
                <input
                  className="h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium"
                  placeholder="e.g. 10 mins"
                  type="text"
                  name="estimatedTime"
                  value={formData.estimatedTime}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mt-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-lg">Questions</h3>
                <button
                  type="button"
                  onClick={addQuestion}
                  className="text-blue-700 border border-blue-700 px-3 py-1 rounded hover:bg-blue-50"
                >
                  + Add Question
                </button>
              </div>

              {formData.questions.map((question, index) => (
                <div key={question.id} className="border rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">Question {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeQuestion(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid gap-3 mt-3">
                    <div>
                      <label className="block text-sm mb-1">Question Type</label>
                      <select
                        className="w-full border rounded px-3 py-2"
                        value={question.type}
                        onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
                      >
                        <option value="rating">Rating</option>
                        <option value="text">Text Response</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Question Text</label>
                      <textarea
                        className="w-full border rounded px-3 py-2"
                        rows="2"
                        value={question.text}
                        onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
                        placeholder="Enter your question here"
                      />
                    </div>
                    {question.type === 'rating' && (
                      <div>
                        <label className="block text-sm mb-1">Rating Options</label>
                        <div className="flex space-x-2">
                          {question.options.map((option, i) => (
                            <span key={i} className="bg-gray-100 rounded px-3 py-1">{option}</span>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Default 1-5 scale</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end items-center w-full mt-7">
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={handleCloseModals}
                className="font-normal text-sm border border-gray-400 text-gray-600 hover:text-gray-700 rounded px-6 py-2.5"
                disabled={isSubmitting}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className="text-white font-normal text-sm bg-blue-700 rounded px-6 py-2.5 hover:bg-blue-800 flex items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                    Saving...
                  </>
                ) : isEditModal ? "Update Questionnaire" : "Create Questionnaire"}
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModal} onClose={handleCloseModals}>
        <div className="py-6">
          <h3 className="text-xl font-semibold">Delete Questionnaire</h3>
          <p className="my-4">
            Are you sure you want to delete "{currentQuestionnaire?.title}"? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={handleCloseModals}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                  Deleting...
                </>
              ) : "Delete"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FeedbackQuestionManager;
