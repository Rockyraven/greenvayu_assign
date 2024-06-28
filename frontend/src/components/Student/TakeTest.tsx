import React, { useState } from 'react';
import { submitTest } from '../../services/api';

interface TakeTestProps {
  test: any; // Adjust type according to your test data structure
}

const TakeTest: React.FC<TakeTestProps> = ({ test }) => {
  const [answers, setAnswers] = useState<string[]>(test.questions.map(() => ''));

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
    //   await submitTest(test.id, answers);
      // Notify success or redirect
    } catch (error) {
      console.error('Error submitting test:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Take Test: {test.title}</h2>
      <form onSubmit={handleSubmit}>
        {test.questions.map((question: any, index: number) => (
          <div key={index} className="mb-4">
            <label className="block text-sm font-semibold mb-2">{question.text}</label>
            {question.type === 'multiple_choice' ? (
              <select
                className="border px-4 py-2 w-full"
                value={answers[index]}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
              >
                {question.options.map((option: string, idx: number) => (
                  <option key={idx} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                className="border px-4 py-2 w-full"
                value={answers[index]}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
              />
            )}
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit Test</button>
      </form>
    </div>
  );
};

export default TakeTest;
