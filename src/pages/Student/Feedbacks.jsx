import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Admin/Layout';
import { Star, Clock, BookOpen, UserCheck, CheckCircle } from 'lucide-react';
import { UseAppContext } from "../../service/context";

const QuestionnaireCard = ({ questionnaire, hasSubmitted }) => {
  const iconMap = {
    Instructor: <UserCheck className="w-10 h-10 text-blue-600" />,
    Course: <BookOpen className="w-10 h-10 text-green-600" />,
    General: <Star className="w-10 h-10 text-yellow-600" />,
    Infrastructure: <Clock className="w-10 h-10 text-purple-600" />
  };

  const icon = iconMap[questionnaire.category] || iconMap.General;

  return (
    <div className={`bg-white shadow-md rounded-lg p-6 border ${hasSubmitted ? 'border-green-200 bg-green-50' : 'border-gray-100 hover:border-blue-200'} group relative`}>
      <div className="flex items-center mb-4">
        <div className="mr-4">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
            {questionnaire.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{questionnaire.category}</p>
        </div>
      </div>
      <p className="text-gray-600 mb-4">{questionnaire.description}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-2" />
          <span>{questionnaire.estimatedTime}</span>
        </div>
        
        {hasSubmitted ? (
          <div className="flex items-center text-green-600">
            <CheckCircle className="w-5 h-5 mr-1" />
            <span>Completed</span>
          </div>
        ) : (
          <Link 
            to={`/student/questions/details/${questionnaire.id}`}
            className="text-blue-600 group-hover:underline"
          >
            Start Feedback
          </Link>
        )}
      </div>
      
      {hasSubmitted && (
        <div className="absolute top-2 right-2">
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Completed</span>
        </div>
      )}
    </div>
  );
};

const Feedbacks = () => {
  const { User } = UseAppContext();
  const [questionnaires, setQuestionnaires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedQuestionnaires, setCompletedQuestionnaires] = useState([]);

  useEffect(() => {
    // Load questionnaires and user submissions
    const storedQuestionnaires = JSON.parse(localStorage.getItem('studentVoiceQuestionnaires') || '[]');
    const feedbacks = JSON.parse(localStorage.getItem('studentVoiceFeedbacks') || '[]');
    
    // Get questionnaire IDs that the current user has submitted
    const userFeedbacks = feedbacks.filter(feedback => feedback.userId === User?.id);
    const completedIds = userFeedbacks.map(feedback => feedback.questionnaireId.toString());
    
    setQuestionnaires(storedQuestionnaires);
    setCompletedQuestionnaires(completedIds);
    setLoading(false);
  }, [User]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <div className="w-full">
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Feedback Questionnaires
          </h1>

          {questionnaires.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No feedback questionnaires available at this time.</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Available Questionnaires</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {questionnaires.filter(q => !completedQuestionnaires.includes(q.id.toString())).map((questionnaire) => (
                    <QuestionnaireCard 
                      key={questionnaire.id} 
                      questionnaire={questionnaire} 
                      hasSubmitted={false}
                    />
                  ))}
                  
                  {questionnaires.filter(q => !completedQuestionnaires.includes(q.id.toString())).length === 0 && (
                    <div className="col-span-3 text-center py-5">
                      <p className="text-gray-500">You have completed all available questionnaires!</p>
                    </div>
                  )}
                </div>
              </div>
              
              {completedQuestionnaires.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-xl font-semibold mb-3">Completed Questionnaires</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {questionnaires.filter(q => completedQuestionnaires.includes(q.id.toString())).map((questionnaire) => (
                      <QuestionnaireCard 
                        key={questionnaire.id} 
                        questionnaire={questionnaire} 
                        hasSubmitted={true}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default Feedbacks;
