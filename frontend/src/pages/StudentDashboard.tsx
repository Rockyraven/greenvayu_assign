import React from 'react';
import { Link } from 'react-router-dom';

const StudentDashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Student Dashboard</h2>
      <div className="space-y-4">
        <Link to="/student/view-tests" className="block bg-blue-500 text-white py-2 px-4 rounded">View Tests</Link>
      </div>
    </div>
  );
};

export default StudentDashboard;
