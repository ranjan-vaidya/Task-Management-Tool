import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TaskModal from './TaskModal';

interface Task {
  id: string;
  title: string;
  dueDate: string;
  status: 'TO-DO' | 'IN-PROGRESS' | 'COMPLETED';
  category: 'Work' | 'Personal';
}

const TaskListView: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Interview with Design Team', dueDate: 'Today', status: 'TO-DO', category: 'Work' },
    { id: '2', title: 'Team Meeting', dueDate: '30 Dec, 2024', status: 'TO-DO', category: 'Personal' },
    { id: '3', title: 'Design a Dashboard page along with wireframes', dueDate: '31 Dec, 2024', status: 'TO-DO', category: 'Work' },
    { id: '4', title: 'Morning Workout', dueDate: 'Today', status: 'IN-PROGRESS', category: 'Work' },
    { id: '5', title: 'Code Review', dueDate: 'Today', status: 'IN-PROGRESS', category: 'Personal' },
    { id: '6', title: 'Update Task Tracker', dueDate: '25 Dec, 2024', status: 'IN-PROGRESS', category: 'Work' },
    { id: '7', title: 'Submit Project Proposal', dueDate: 'Today', status: 'COMPLETED', category: 'Work' },
    { id: '8', title: 'Birthday Gift Shopping', dueDate: 'Today', status: 'COMPLETED', category: 'Personal' },
    { id: '9', title: 'Client Presentation', dueDate: '25 Dec, 2024', status: 'COMPLETED', category: 'Work' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    'TO-DO': true,
    'IN-PROGRESS': true,
    'COMPLETED': true,
  });

  const handleAddTask = (newTask: Omit<Task, 'id'>) => {
    setTasks([
      ...tasks,
      {
        id: Date.now().toString(),
        ...newTask,
      },
    ]);
    setIsModalOpen(false);
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const TaskGroup: React.FC<{
    title: string;
    status: keyof typeof expandedSections;
    tasks: Task[];
    bgColor: string;
  }> = ({ title, status, tasks, bgColor }) => (
    <div className="mb-6">
      <div 
        className={`flex items-center justify-between p-3 ${bgColor} rounded-lg ${!expandedSections[status] ? 'rounded-b-lg' : 'rounded-b-none'} cursor-pointer transition-colors hover:bg-opacity-90`}
        onClick={() => toggleSection(status)}
      >
        <h3 className="font-semibold flex items-center">
          {title} ({tasks.length})
        </h3>
        <button className="focus:outline-none transform transition-transform duration-200" style={{ transform: expandedSections[status] ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
          <span className="text-gray-600">▼</span>
        </button>
      </div>
      {expandedSections[status] && (
        <div className="bg-white rounded-b-lg shadow-sm">
          {tasks.map((task) => (
            <div key={task.id} className="border-b last:border-b-0 p-4">
              <div className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-gray-300" />
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{task.title}</span>
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-gray-600">⋮</button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-xs text-gray-500">{task.dueDate}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      task.status === 'TO-DO' ? 'bg-gray-100' :
                      task.status === 'IN-PROGRESS' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.status}
                    </span>
                    <span className="text-xs text-gray-600">{task.category}</span>
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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">TaskBuddy</h1>
            <div className="flex space-x-2">
              <button 
                onClick={() => navigate('/list')}
                className={`px-3 py-1 rounded-md ${location.pathname === '/list' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                List
              </button>
              <button 
                onClick={() => navigate('/board')}
                className={`px-3 py-1 rounded-md ${location.pathname === '/board' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
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

        <div className="flex space-x-4 mb-6">
          <select className="border rounded-md px-3 py-2 bg-white">
            <option>Category</option>
            <option>Work</option>
            <option>Personal</option>
          </select>
          <select className="border rounded-md px-3 py-2 bg-white">
            <option>Due Date</option>
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>

        <TaskGroup
          title="Todo"
          status="TO-DO"
          tasks={tasks.filter((task) => task.status === 'TO-DO')}
          bgColor="bg-pink-100"
        />
        <TaskGroup
          title="In-Progress"
          status="IN-PROGRESS"
          tasks={tasks.filter((task) => task.status === 'IN-PROGRESS')}
          bgColor="bg-blue-100"
        />
        <TaskGroup
          title="Completed"
          status="COMPLETED"
          tasks={tasks.filter((task) => task.status === 'COMPLETED')}
          bgColor="bg-green-100"
        />
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTask}
      />
    </div>
  );
};

export default TaskListView;