
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import TaskModal from './TaskModal';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();


    const { user, loading, signInWithGoogle, signOutUser } = useAuth();
    const [reload, setReload] = useState<Boolean>(true);
    const storedUserString = localStorage.getItem("user");
    if (storedUserString) {
        var storedUser = JSON.parse(storedUserString);
        console.log("Stored User:", storedUser);
    } else {
        console.log("No user found in localStorage");
    }


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expandedSections, setExpandedSections] = useState({
        "TO-DO": true,
        "IN-PROGRESS": true,
        COMPLETED: true,
    });





    return (
        <>
            <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="col-span-2">
                    <h1 className="text-xl font-bold">TaskBuddy</h1>
                </div>
                <div className="col-span-2 col-start-5 flex justify-end items-center">
                    <div className="flex items-center">
                        <img
                            src={user?.photoURL || "../../public/img/user-image.webp"}
                            alt="user"
                            className="h-8 w-8 rounded-full"
                        />
                        <div className="ms-3">{user?.displayName}</div>
                    </div>
                    <button
                        onClick={() => signOutUser()}
                        className="px-3 py-1 text-sm text-black-900 hover:text-gray-900 hover:bg-gray-100 rounded-md flex items-center gap-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4"
                        >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Logout
                    </button>
                </div>
            </div>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <div className="flex space-x-2">
                        <button
                            onClick={() => navigate("/list")}
                            className={`px-3 py-1 rounded-md ${location.pathname === "/list"
                                ? "bg-purple-600 text-white"
                                : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            List
                        </button>
                        <button
                            onClick={() => navigate("/board")}
                            className={`px-3 py-1 rounded-md ${location.pathname === "/board"
                                ? "bg-purple-600 text-white"
                                : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            Board
                        </button>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="relative hidden lg:block">
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
            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                setReload={setReload}
            />
        </>

    )
}

export default Header