import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Online Test Management System</h1>
        <div className="space-x-4">
          <Link to="/login" className="bg-blue-500 text-white py-2 px-4 rounded">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
