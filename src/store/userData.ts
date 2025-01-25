import { create } from "zustand";

// Define the user store type
interface UserStore {
  user: any | null; // Replace `any` with your specific user type if you have one
  setUserOne: (user: any) => void;
  clearUser: () => void;
}

// Create the Zustand store
export const useUserStore = create<UserStore>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"), // Get user from localStorage initially
  setUserOne: (user) => {
    set({ user });
    localStorage.setItem("user", JSON.stringify(user)); // Save user to localStorage
  },
  clearUser: () => {
    set({ user: null });
    localStorage.removeItem("user"); // Remove user from localStorage
  },
}));
