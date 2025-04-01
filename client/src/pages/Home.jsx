import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
     

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex flex-col items-center justify-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Notes App</h1>
              <p className="text-gray-600 text-lg max-w-lg text-center mb-8">
                Your simple and powerful solution for organizing tasks, ideas, and important information in one place.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Notes App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;