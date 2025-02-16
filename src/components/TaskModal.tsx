import React from "react";
import { addTask } from "../hooks/firebaseFunctions"; // Make sure to import the function
import { toast } from "react-toastify";
import { useUserStore } from "../store/userData";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  setReload,
}) => {
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    category: "Work" as const,
    dueDate: "",
    completed: "TO-DO" as const,
  });
  const { user } = useUserStore();

  if (!isOpen) return null;

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const res = await addTask(formData, user); // Call addTaskForUser here to add the task
      
  //     setFormData({
  //       title: "",
  //       description: "",
  //       category: "Work",
  //       dueDate: "",
  //       completed: "TO-DO",
  //     });
  //     if (res) {
  //       toast.success("Task is added!");
  //       setReload(true);
  //     }
  //     onClose(); // Close modal after submitting
      
  //   } catch (error) {
  //     console.error("Error creating task:", error);
  //   }
  // };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await addTask(formData, user); // Call addTaskForUser here to add the task
  
      setFormData({
        title: "",
        description: "",
        category: "Work",
        dueDate: "",
        completed: "TO-DO",
      });
  
      if (res) {
        toast.success("Task is added!");
  
        // Add a 3-second timeout before setting reload or closing the modal
        setTimeout(() => {
          setReload(true);
          onClose(); // Close modal after timeout
        }, 3000);
      } else {
        onClose(); // Close modal immediately if no response
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };
  




  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Create Task</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <input
              type="text"
              placeholder="Task title"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          <div>
            <textarea
              placeholder="Description"
              rows={4}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <div className="flex justify-end">
              <div className="flex space-x-2 text-sm text-gray-500">
                <button type="button" className="p-1 hover:bg-gray-100 rounded">
                  B
                </button>
                <button type="button" className="p-1 hover:bg-gray-100 rounded">
                  I
                </button>
                <button type="button" className="p-1 hover:bg-gray-100 rounded">
                  •
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Task Category*
              </label>
              <div className="flex space-x-2">
                <button
                  type="button"
                  className={`px-4 py-2 rounded-md ${
                    formData.category === "Work"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => setFormData({ ...formData, category: "Work" })}
                >
                  Work
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-md ${
                    formData.category === "Personal"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, category: "Personal" })
                  }
                >
                  Personal
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due on*
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Task Status*
              </label>
              <select
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={formData.completed}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    completed: e.target.value as typeof formData.completed,
                  })
                }
                required
              >
                <option value="TO-DO">TO-DO</option>
                <option value="IN-PROGRESS">IN-PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>
            </div>
          </div>

          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Attachment
            </label>
            <div className="border-2 border-dashed rounded-md p-4 text-center">
              <p className="text-sm text-gray-500">
                Drop your files here or{" "}
                <button
                  type="button"
                  className="text-purple-600 hover:text-purple-500"
                >
                  Upload
                </button>
              </p>
            </div>
          </div> */}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              CREATE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
