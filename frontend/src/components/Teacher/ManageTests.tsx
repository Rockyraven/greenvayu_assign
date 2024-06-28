import React, { useEffect, useState } from 'react';
import { getTests } from '../../services/api';

const ManageTests: React.FC = () => {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await getTests();
        setTests(response.data);
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };

    fetchTests();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Manage Tests</h2>
      <div className="space-y-4">
        {tests.map((test: any) => (
          <div key={test.id} className="p-4 bg-white shadow rounded">
            <h3 className="text-xl">{test.title}</h3>
            {/* Add additional test management functionality here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageTests;
