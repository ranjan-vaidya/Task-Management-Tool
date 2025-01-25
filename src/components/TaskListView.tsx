import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TaskModal from "./TaskModal";
import { useAuth } from "../hooks/useAuth";
import { fetchTasks } from "../hooks/firebaseFunctions";

interface Task {
  id: string;
  title: string;
  dueDate: string;
  completed: "TO-DO" | "IN-PROGRESS" | "COMPLETED";
  category: "Work" | "Personal";
}

const TaskListView: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, loading, signInWithGoogle, signOutUser } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [reload, setReload] = useState<Boolean>(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    "TO-DO": true,
    "IN-PROGRESS": false,
    COMPLETED: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const getTask = async () => {
    const res = await fetchTasks();
    setTasks(res);
    setReload(false);
  };

  useEffect(() => {
    if (reload) {
      getTask();
    }
  }, [reload, user?.uid]);

  const TaskGroup: React.FC<{
    title: string;
    completed: keyof typeof expandedSections;
    tasks: Task[];
    bgColor: string;
  }> = ({ title, completed, tasks, bgColor }) => (
    <div className="mb-6">
      <div
        className={`flex items-center justify-between p-3 ${bgColor} rounded-lg ${
          !expandedSections[completed] ? "rounded-b-lg" : "rounded-b-none"
        } cursor-pointer transition-colors hover:bg-opacity-90`}
        onClick={() => toggleSection(completed)}
      >
        <h3 className="font-semibold flex items-center">
          {title} ({tasks.length})
        </h3>
        <button
          className="focus:outline-none transform transition-transform duration-200"
          style={{
            transform: expandedSections[completed]
              ? "rotate(0deg)"
              : "rotate(-90deg)",
          }}
        >
          <span className="text-gray-600">▼</span>
        </button>
      </div>
      {expandedSections[completed] && (
        <div className="bg-white rounded-b-lg shadow-sm">
          {tasks.map((task) => (
            <div key={task.id} className="border-b last:border-b-0 p-4">
              <div className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-gray-300" />
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{task.title}</span>
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        ⋮
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-xs text-gray-500">
                      {task.dueDate}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        task.completed === "TO-DO"
                          ? "bg-gray-100"
                          : task.completed === "IN-PROGRESS"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {task.completed}
                    </span>
                    <span className="text-xs text-gray-600">
                      {task.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-6 gap-4 mb-4">
          <div className="col-span-2">
            <h1 className="text-xl font-bold">TaskBuddy</h1>
          </div>
          <div className="col-span-2 col-start-5 flex justify-end">
            <div>
              <img
                src={user?.photoURL || ""}
                alt="user"
                className="h-8 w-8 rounded-full"
              />
            </div>
            <div className="ms-3">{user?.displayName}</div>
          </div>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <button
                onClick={() => navigate("/list")}
                className={`px-3 py-1 rounded-md ${
                  location.pathname === "/list"
                    ? "bg-purple-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                List
              </button>
              <button
                onClick={() => navigate("/board")}
                className={`px-3 py-1 rounded-md ${
                  location.pathname === "/board"
                    ? "bg-purple-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Board
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              ADD TASK
            </button>
          </div>
        </div>

        <TaskGroup
          title="Todo"
          completed="TO-DO"
          tasks={tasks.filter((task) => task.completed === "TO-DO")}
          bgColor="bg-pink-100"
        />
        <TaskGroup
          title="In-Progress"
          completed="IN-PROGRESS"
          tasks={tasks.filter((task) => task.completed === "IN-PROGRESS")}
          bgColor="bg-blue-100"
        />
        <TaskGroup
          title="Completed"
          completed="COMPLETED"
          tasks={tasks.filter((task) => task.completed === "COMPLETED")}
          bgColor="bg-green-100"
        />
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        setReload={setReload}
      />
    </div>
  );
};

export default TaskListView;
