import React from 'react';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { UserIcon, LogOut } from 'lucide-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current path

  const handleLogout = async () => {
    try{
        const responce = await axios.post("http://localhost:3002/api/auth/logout",{},{withCredentials: true});
        if (responce.data.success){
            toast.success("loged out successfully, redirecting..")
            setTimeout(() => {
                window.location.href = "/login"; // Redirect after logout
              }, 2000);

        }
        if (!responce.data.success){
            toast.error("could not log out")

        }
        
    } catch (err){
        toast.info("error logging out: " + err.message);
    }

  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
        <ToastContainer/>
      <div className="container mx-auto flex justify-between items-center">
        {/* Left side - Brand/Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold">
            YourApp
          </Link>

          {/* Main navigation links */}
          <div className="hidden md:flex ml-10 space-x-6">
            <Link to="/" className={`hover:text-gray-300 ${location.pathname === '/' ? 'text-blue-400' : ''}`}>
              Home
            </Link>
            <Link to="/notes" className={`hover:text-gray-300 ${location.pathname === '/notes' ? 'text-blue-400' : ''}`}>
              My Tasks
            </Link>
           
          </div>
        </div>

        {/* Right side - User controls */}
        <div className="flex items-center space-x-4">
          <Link to="/profile" className="hover:text-gray-300 flex items-center">
            <UserIcon size={20} className="mr-1" />
            <span className="hidden sm:inline">Profile</span>

             
          </Link>
          <button 
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded flex items-center"
          >
            <LogOut size={18} className="mr-1" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
