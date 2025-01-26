import {
  doc,
  collection,
  addDoc,
  getFirestore,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth } from "../firebase";

const db = getFirestore();


const storedUserString = localStorage.getItem("user");
if (storedUserString) {
  var storedUser = JSON.parse(storedUserString);
  console.log("Stored User:", storedUser);
} else {
  console.log("No user found in localStorage");
}

export const addTask = async (taskData: {
  title: string;
  description: string;
  category: string;
  dueDate: string;
  completed: string;
}) => {
  try {
    const userId = auth.currentUser?.uid;
    // console.log(userId)
    if (!userId) throw new Error("User is not logged in");

    // Reference to the tasks collection for the current user
    const tasksRef = collection(doc(db, "users", userId), "tasks");

    // Add a new task
    const taskDoc = await addDoc(tasksRef, taskData);
    console.log("Task added with ID:", taskDoc.id);
  } catch (error) {
    console.error("Error adding task:", error);
  }
};

export const fetchTasks = async () => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("User is not logged in");

    // Reference to the tasks collection for the current user
    const tasksRef = collection(doc(db, "users", userId), "tasks");

    // Fetch all tasks
    const tasksSnapshot = await getDocs(tasksRef);
    const tasks = tasksSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

export const updateTaskForUser = async (
  taskId: string,
  updatedData: object
) => {
  try {
    // Get the current user's ID
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("User is not logged in");

    // Reference to the specific task document
    const taskDocRef = doc(db, "users", userId, "tasks", taskId);

    // Update the task document with the provided data
    await updateDoc(taskDocRef, updatedData);

    console.log("Task updated with ID:", taskId);
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

export const deleteTaskForUser = async (taskId: string) => {
  try {
    // Get the current user's ID
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("User is not logged in");

    // Reference to the specific task document
    const taskDocRef = doc(db, "users", userId, "tasks", taskId);

    // Delete the task document
    await deleteDoc(taskDocRef);

    console.log("Task deleted with ID:", taskId);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};
