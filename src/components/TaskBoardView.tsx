import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TaskModal from "./TaskModal";
import { useAuth } from "../hooks/useAuth";
import { fetchTasks } from "../hooks/firebaseFunctions";
import Header from "./Header";

interface Task {
  id: string;
  title: string;
  dueDate: string;
  status: "TO-DO" | "IN-PROGRESS" | "COMPLETED";
  category: "Work" | "Personal";
}

const TaskBoardView: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
    const [reload, setReload] = useState<Boolean>(true);
    const storedUserString = localStorage.getItem("user");
  if (storedUserString) {
    var storedUser = JSON.parse(storedUserString);
    console.log("Stored User:", storedUser);
  } else {
    console.log("No user found in localStorage");
  }

  const getTask = async () => {
      const res = await fetchTasks();
      setTasks(res);
      setReload(false);
    };



  useEffect(() => {
      if (reload) {
        getTask();
      }
      setTimeout(() => {
        setReload(true);
        // onClose();
      }, 3000);
    }, [reload, storedUser]);


  const TaskColumn: React.FC<{
    title: string;
    tasks: Task[];
    bgColor: string;
  }> = ({ title, tasks, bgColor }) => (
    <div className="flex-1 min-w-[300px] bg-gray-100 rounded-lg p-4">
      <div
        className={`${bgColor} text-sm font-medium px-3 py-1 rounded-md inline-block mb-4`}
      >
        {title} ({tasks.length})
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-sm">{task.title}</h3>
              <button className="text-gray-400 hover:text-gray-600">⋮</button>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                <span>{task.category}</span>
                <span>•</span>
                <span>{task.dueDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Header />

        

        <div className="flex space-x-6 overflow-x-auto pb-6">
          <TaskColumn
            title="TO-DO"
            tasks={tasks.filter((task) => task.completed === "TO-DO")}
            bgColor="bg-pink-100 text-pink-800"
          />
          <TaskColumn
            title="IN-PROGRESS"
            tasks={tasks.filter((task) => task.completed === "IN-PROGRESS")}
            bgColor="bg-blue-100 text-blue-800"
          />
          <TaskColumn
            title="COMPLETED"
            tasks={tasks.filter((task) => task.completed === "COMPLETED")}
            bgColor="bg-green-100 text-green-800"
          />
        </div>
      </div>

      {/* <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTask}
      /> */}
    </div>
  );
};

export default TaskBoardView;
