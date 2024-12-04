import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Admin/Layout';
import { Star, Clock, BookOpen, UserCheck } from 'lucide-react';

const QuestionnaireData = [
  {
    id: 1,
    title: 'Lecturer Evaluation',
    description: 'Provide feedback on your lecturer\'s teaching performance',
    icon: <UserCheck className="w-10 h-10 text-blue-600" />,
    category: 'Instructor',
    estimatedTime: '10 mins',
  },
  {
    id: 2,
    title: 'Course Content Assessment',
    description: 'Share your thoughts on the course material and structure',
    icon: <BookOpen className="w-10 h-10 text-green-600" />,
    category: 'Course',
    estimatedTime: '15 mins',
  },
  {
    id: 3,
    title: 'Overall Learning Experience',
    description: 'Rate your overall satisfaction with the learning experience',
    icon: <Star className="w-10 h-10 text-yellow-600" />,
    category: 'General',
    estimatedTime: '5 mins',
  },
  {
    id: 4,
    title: 'Course Facilities Feedback',
    description: 'Evaluate the learning environment and facilities',
    icon: <Clock className="w-10 h-10 text-purple-600" />,
    category: 'Infrastructure',
    estimatedTime: '8 mins',
  }
];

const QuestionnaireCard = ({ questionnaire }) => {
  return (
    <Link 
      to={`/student/questions/details/${questionnaire.id}`} 
      className="block"
    >
      <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-100 hover:border-blue-200 group">
        <div className="flex items-center mb-4">
          <div className="mr-4">
            {questionnaire.icon}
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
          <span className="text-blue-600 group-hover:underline">
            Start Feedback
          </span>
        </div>
      </div>
    </Link>
  );
};

const FeedbackQuestionnaires = () => {
  return (
    <div className="w-full">
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Feedback Questionnaires
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {QuestionnaireData.map((questionnaire) => (
              <QuestionnaireCard 
                key={questionnaire.id} 
                questionnaire={questionnaire} 
              />
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default FeedbackQuestionnaires;

