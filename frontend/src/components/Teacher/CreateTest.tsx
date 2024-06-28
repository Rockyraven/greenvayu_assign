import React, { useState } from 'react';
import { createTest } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const CreateTest: React.FC = () => {
    const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ type: '', text: '', options: [], answer: '' }]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { type: '', text: '', options: [], answer: '' }]);
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (index: number, field: string, value: any) => {
    const newQuestions = questions.map((question, i) => (
      i === index ? { ...question, [field]: value } : question
    ));
    setQuestions(newQuestions);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createTest({ title, questions });
      navigate('/teacher');
      // Redirect or notify success
    } catch (error) {
      console.error('Error creating test:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Create Test</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-semibold mb-2">Test Title</label>
          <input
            type="text"
            id="title"
            className="border px-4 py-2 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-semibold">Question {index + 1}</label>
              <button type="button" className="text-red-500" onClick={() => handleRemoveQuestion(index)}>Remove</button>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold">Type</label>
              <select
                className="border px-4 py-2 w-full"
                value={question.type}
                onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="multiple_choice">Multiple Choice</option>
                <option value="short_answer">Short Answer</option>
                <option value="long_essay">Long Essay</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold">Question Text</label>
              <input
                type="text"
                className="border px-4 py-2 w-full"
                value={question.text}
                onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
              />
            </div>
            {question.type === 'multiple_choice' && (
              <div className="mb-2">
                <label className="block text-sm font-semibold">Options (comma separated)</label>
                <input
                  type="text"
                  className="border px-4 py-2 w-full"
                  value={question.options.join(',')}
                  onChange={(e) => handleQuestionChange(index, 'options', e.target.value.split(','))}
                />
              </div>
            )}
            <div className="mb-2">
              <label className="block text-sm font-semibold">Answer</label>
              <input
                type="text"
                className="border px-4 py-2 w-full"
                value={question.answer}
                onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
              />
            </div>
          </div>
        ))}
        <button type="button" className="bg-gray-500 text-white py-2 px-4 mb-4 rounded" onClick={handleAddQuestion}>Add Question</button>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Create Test</button>
      </form>
    </div>
  );
};

export default CreateTest;
