import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Login from './components/Auth/Login';
import CreateTest from './components/Teacher/CreateTest';
import ManageTests from './components/Teacher/ManageTests';
import EvaluateSubmissions from './components/Teacher/EvaluateSubmissions';
import ViewTests from './components/Student/ViewTests';
import TakeTest from './components/Student/TakeTest';
import SignupForm from './components/Auth/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"  element={ <Home/>} />
        <Route path="/login" element={ <Login/>} />
        <Route path="/signup" element={ <SignupForm/>} />
        <Route path="/teacher"  element={ <TeacherDashboard/>} />
        <Route path="/teacher/create-test" element={ <CreateTest/>} />
        <Route path="/teacher/manage-tests" element={ <ManageTests/>} />
        <Route path="/teacher/evaluate" element={ <EvaluateSubmissions/>} />
        <Route path="/student"  element={ <StudentDashboard/>} />
        <Route path="/student/view-tests" element={ <ViewTests/>} />
        <Route path="/student/take-test/:id" element={ <TakeTest/>} />
      </Routes>
    </Router>
  );
}

export default App;
