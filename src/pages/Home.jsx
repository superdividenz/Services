import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Home() {
  const { currentUser } = useAuth();

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">ServiceApp</h1>
      {currentUser ? (
        <Link
          to="/dashboard"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go to Dashboard
        </Link>
      ) : (
        <Link
          to="/login"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Login
        </Link>
      )}
    </div>
  );
}

export default Home;
