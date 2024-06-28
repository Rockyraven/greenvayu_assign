import React from 'react';
import { Link } from 'react-router-dom';

const TeacherDashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Teacher Dashboard</h2>
      <div className="space-y-4">
        <Link to="/teacher/create-test" className="block bg-blue-500 text-white py-2 px-4 rounded">Create Test</Link>
        <Link to="/teacher/manage-tests" className="block bg-blue-500 text-white py-2 px-4 rounded">Manage Tests</Link>
        <Link to="/teacher/evaluate" className="block bg-blue-500 text-white py-2 px-4 rounded">Evaluate Submissions</Link>
      </div>
    </div>
  );
};

export default TeacherDashboard;
