import React, { useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
// import 

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
//   const history = useHistory();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/user/signin', { email, password });
      const { token, data } = response.data;
      
      // Save token in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('role', data.role);

      if (data.role === 'teacher') {
        navigate('/teacher');
      } else {
        navigate('/student');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl mb-6">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold mb-2">Email</label>
          <input
            type="email"
            id="email"
            className="border px-4 py-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-10">
          <label htmlFor="password" className="block text-sm font-semibold mb-2">Password</label>
          <input
            type="password"
            id="password"
            className="border px-4 py-2 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 w-full rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
