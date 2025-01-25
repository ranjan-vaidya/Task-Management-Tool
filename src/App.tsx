import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TaskListView from './components/TaskListView';
import TaskBoardView from './components/TaskBoardView';
import LoginPage from './components/LoginPage';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/list" element={<TaskListView />} />
        <Route path="/board" element={<TaskBoardView />} />
        {/* <Route path="/" element={<Navigate to="/list" replace />} /> */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />



      </Routes>
    </Router>
  );
}

export default App;