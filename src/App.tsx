import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import TaskListView from "./components/TaskListView";
import TaskBoardView from "./components/TaskBoardView";
import LoginPage from "./components/LoginPage";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify"; // Import the ToastContainer
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer /> {/* Place ToastContainer here */}
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
