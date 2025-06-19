import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand */}
          <Link to="/" className="text-xl font-bold text-blue-600">
            BulkDataUploader
          </Link>

          {/* Nav Links */}
          <div className="flex space-x-4 items-center">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Home
            </Link>
            <Link
              to="/upload"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Upload
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-2">
            <Link
              to="/login"
              className="px-4 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;