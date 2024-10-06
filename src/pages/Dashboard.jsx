import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Users, MapPin, Calendar } from 'lucide-react';

function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/bids" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <Briefcase className="mb-2" size={32} />
          <h2 className="text-xl font-semibold">Bids</h2>
          <p>Manage your bids</p>
        </Link>
        <Link to="/customers" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <Users className="mb-2" size={32} />
          <h2 className="text-xl font-semibold">Customers</h2>
          <p>Manage your customers</p>
        </Link>
        <Link to="/jobs" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <Calendar className="mb-2" size={32} />
          <h2 className="text-xl font-semibold">Jobs</h2>
          <p>View and manage jobs</p>
        </Link>
        <Link to="/map" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <MapPin className="mb-2" size={32} />
          <h2 className="text-xl font-semibold">Map</h2>
          <p>View job locations</p>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;