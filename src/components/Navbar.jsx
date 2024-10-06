import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Home, Briefcase, Users, MapPin, LogOut } from "lucide-react";

function Navbar() {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Services
        </Link>
        {currentUser && (
          <div className="flex space-x-4">
            <Link to="/dashboard" className="flex items-center">
              <Home className="mr-1" size={18} /> Dashboard
            </Link>
            <Link to="/bids" className="flex items-center">
              <Briefcase className="mr-1" size={18} /> Bids
            </Link>
            <Link to="/customers" className="flex items-center">
              <Users className="mr-1" size={18} /> Customers
            </Link>
            <Link to="/map" className="flex items-center">
              <MapPin className="mr-1" size={18} /> Map
            </Link>
            <button onClick={logout} className="flex items-center">
              <LogOut className="mr-1" size={18} /> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
