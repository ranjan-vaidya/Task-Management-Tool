import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const SignUpPage: React.FC = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, loading, signInWithGoogle, signOutUser } = useAuth();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update the user's profile with the display name
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName });
      }

      console.log("User signed up successfully with name:", displayName);

      // Navigate to another route (e.g., "/list")
      navigate("/list");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-3xl font-bold text-purple-600">
              TaskBuddy
            </span>
          </div>
          <p className="mt-3 text-gray-600">
            Create your account to get started with our powerful task management
            app.
          </p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          <button
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
            onClick={() => signInWithGoogle()}
          >
            <img src="./img/google.png" alt="" style={{ width: "40px" }} />
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-purple-600 hover:text-purple-500"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
