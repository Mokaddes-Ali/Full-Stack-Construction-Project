
import { useState } from "react";

const UserDashboard = () => {
  // Mock data
  const projects = [
    { id: 1, name: "Building A", status: "In Progress", progress: "70%" },
    { id: 2, name: "Office Complex", status: "Completed", progress: "100%" },
    { id: 3, name: "Mall Renovation", status: "In Progress", progress: "40%" },
  ];

  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
  };

  const handleLogout = () => {
    // Add logout functionality
    alert("Logged out successfully!");
  };

  return (
    <div className="min-h-screen w-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white p-4">
        <h2 className="text-2xl font-bold">User Dashboard</h2>
        <nav className="mt-6 space-y-2">
          <button className="block w-full py-2 px-4 rounded bg-deep-orange-100 hover:bg-green-400">
            Overview
          </button>
          <button className="block w-full py-2 px-4 rounded bg-deep-orange-100 hover:bg-green-400">
            Profile
          </button>
          <button onClick={handleLogout} className="block w-full bg-deep-orange-100 py-2 px-4 rounded hover:bg-green-400">
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Overview Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Projects Overview</h2>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div key={project.id} className="p-4 bg-white rounded shadow">
                <h3 className="text-lg font-bold">{project.name}</h3>
                <p>Status: {project.status}</p>
                <p>Progress: {project.progress}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Profile Section */}
        <section className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
          <div className="p-4 bg-white rounded shadow">
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
              Edit Profile
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};



export default UserDashboard