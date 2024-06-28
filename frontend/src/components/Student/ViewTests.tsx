import React, { useEffect, useState } from 'react';
import { getTests } from '../../services/api';
import TakeTest from './TakeTest'; // Assuming TakeTest component is in the same directory

const ViewTests: React.FC = () => {
  const [tests, setTests] = useState<any[]>([]);
  const [selectedTest, setSelectedTest] = useState<any | null>(null);

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

  const handleTestClick = (test: any) => {
    setSelectedTest(test);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">View Tests</h2>
      {selectedTest ? (
        <TakeTest test={selectedTest} />
      ) : (
        <div className="space-y-4">
          {tests.map((test: any) => (
            <div key={test.id} className="p-4 bg-white shadow rounded cursor-pointer" onClick={() => handleTestClick(test)}>
              <h3 className="text-xl">{test.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewTests;
