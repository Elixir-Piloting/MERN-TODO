import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md mx-auto">
        {/* 404 Text */}
        <h1 className="text-9xl font-extrabold text-blue-500 tracking-widest">404</h1>
        
        {/* Divider Line */}
        <div className="bg-blue-400 h-1 w-24 mx-auto my-4 rounded-full"></div>
        
        {/* Message */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        
        {/* Back to Home Button */}
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white font-medium rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Home
        </Link>
      </div>
      
      {/* Optional illustration - you can replace this with any other SVG or remove */}
      <div className="mt-8">
        <svg
          className="w-64 h-64 text-blue-100"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="currentColor"
        >
          <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208-93.3 208-208 208zm0-160c-13.25 0-24 10.75-24 24s10.75 24 24 24 24-10.75 24-24-10.7-24-24-24zm0-256c-39.8 0-72 32.2-72 72 0 8.8 7.2 16 16 16s16-7.2 16-16c0-22.1 17.9-40 40-40s40 17.9 40 40c0 22.1-17.9 40-40 40-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16s16-7.2 16-16v-33.8c34.2-8.6 60-39.4 60-76.2 0-39.8-32.2-72-72-72z" />
        </svg>
      </div>
    </div>
  );
};

export default NotFound;