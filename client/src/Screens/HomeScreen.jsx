/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
        Welcome to the Mockup Task Portal
      </h1>

      {/* Paragraph */}
      <p className="text-lg text-center text-gray-600 mb-8">
        This portal allows you to manage your tasks efficiently. Use the buttons
        below to navigate to the CRUD operations or view your posts.
      </p>

      {/* Buttons */}
      <div className="flex space-x-4">
        <Link to="/crud">
          <button className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-600 transition duration-200">
            CRUD
          </button>
        </Link>
        <Link to="/posts">
          <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200">
            Posts
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomeScreen;
