import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Index = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost/api/construction-projects")
      .then((response) => {
        setProjects(response.data.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Construction Projects</h1>
        <Link
          to="/add"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Project
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">#</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Client</th>
              <th className="border p-2">Sector</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={project.id}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{project.name}</td>
                <td className="border p-2">{project.location}</td>
                <td className="border p-2">{project.client}</td>
                <td className="border p-2">{project.sector}</td>
                <td className="border p-2">{project.status_label}</td>
                <td className="border p-2">
                  <Link
                    to={`/edit/${project.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Index;
