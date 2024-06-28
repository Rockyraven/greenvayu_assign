import React, { useEffect, useState } from 'react';
import { getSubmissions, evaluateSubmission } from '../../services/api';

const EvaluateSubmissions: React.FC = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await getSubmissions('test_id'); // Replace 'test_id' with the actual test ID
        setSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchSubmissions();
  }, []);

  const handleEvaluate = async (submissionId: string, evaluation: any) => {
    try {
      await evaluateSubmission(submissionId, evaluation);
      // Notify success or update state
    } catch (error) {
      console.error('Error evaluating submission:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Evaluate Submissions</h2>
      <div className="space-y-4">
        {submissions.map((submission: any) => (
          <div key={submission.id} className="p-4 bg-white shadow rounded">
            <h3 className="text-xl">Submission by {submission.student_name}</h3>
            {/* Add additional evaluation functionality here */}
            <button onClick={() => handleEvaluate(submission.id, { score: 10 })} className="bg-green-500 text-white py-2 px-4 rounded">Evaluate</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvaluateSubmissions;
