import { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

// Custom hook for authentication
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Function to sign in with Google
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User signed in with Google:", user);
      setUser(user);
      navigate("/list");
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  // Function to sign out
  const signOutUser = async () => {
    try {
      await auth.signOut();
      setUser(null);
      console.log("User signed out");
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  return { user, loading, signInWithGoogle, signOutUser };
};
