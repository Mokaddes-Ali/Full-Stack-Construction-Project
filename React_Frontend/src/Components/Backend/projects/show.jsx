import { useState, useEffect } from "react";
import { apiUrl, token } from "../http";
import { Link } from "react-router-dom";
import AdminLayout from "../../../layouts/admin/AdminLayout";
import { toast } from "react-toastify";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { exportToCSV, exportToPDF, exportToExcel } from "../utils/exportUtils";

const Show = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const res = await fetch(apiUrl + "projects", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });

      const result = await res.json();
      setProjects(result.data || result);
      setFilteredProjects(result.data || result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setLoading(false);
    }
  };

  // Delete project
  const deleteProject = async (id) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const res = await fetch(apiUrl + "projects/delete/" + id, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });

      const result = await res.json();

      if (result.status === true) {
        const newProjects = projects.filter((project) => project.id !== id);
        setProjects(newProjects);
        setFilteredProjects(newProjects);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
  };

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.sector.toLowerCase().includes(query) ||
        project.location.toLowerCase().includes(query)
    );
    setFilteredProjects(filtered);
    setCurrentPage(1); // Reset to first page
  };

  // Handle sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...filteredProjects].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredProjects(sorted);
  };

  // Handle pagination
  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  // Handle reset search
  const handleResetSearch = () => {
    setSearchQuery("");
    setFilteredProjects(projects);
    setCurrentPage(1);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    const value = e.target.value === "all" ? "all" : parseInt(e.target.value, 10);
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to first page
  };

  // Calculate paginated projects
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProjects =
    itemsPerPage === "all"
      ? filteredProjects
      : filteredProjects.slice(startIndex, startIndex + itemsPerPage);

  // Fetch projects when component mounts
  useEffect(() => {
    fetchProjects();
  }, []);

  // Export data
  const handleExport = (type) => {
    const headers = [
      { label: "ID", key: "id" },
      { label: "Title", key: "title" },
      { label: "Description", key: "short_desc" },
      { label: "Sector", key: "sector" },
      { label: "Location", key: "location" },
      { label: "Status", key: "status" },
    ];

    const data = filteredProjects.map((project) => ({
      id: project.id,
      title: project.title,
      short_desc: project.short_desc,
      sector: project.sector,
      location: project.location,
      status: project.status === "active" ? "Active" : "Inactive",
    }));

    switch (type) {
      case "csv":
        exportToCSV(data, headers, "projects");
        break;
      case "pdf":
        exportToPDF(data, headers, "projects");
        break;
      case "excel":
        exportToExcel(data, headers, "projects");
        break;
      default:
        break;
    }
  };

  // Render sorting icon
  const renderSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  return (
    <>
      <AdminLayout>
        <div className="p-4 bg-blue-50 dark:bg-gray-900">
          <h2 className="text-2xl font-bold mb-4 text-center text-indigo-700 dark:text-indigo-300">
            Projects Table
          </h2>
          {/* Search and Controls */}
          <div className="mb-4 flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search by title, sector, or location..."
                className="px-4 py-2 border border-blue-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-800 dark:text-white"
              />
              <button
                onClick={handleResetSearch}
                className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center"
              >
                Reset
              </button>
            </div>
            <div className="flex gap-4 items-center">
              <select
                onChange={handleItemsPerPageChange}
                className="text-black bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-3 py-2 text-center"
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={25}>25 per page</option>
                <option value={50}>50 per page</option>
                <option value="all">All</option>
              </select>
              <button
                onClick={() => handleExport("csv")}
                className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center"
              >
                Export CSV
              </button>
              <button
                onClick={() => handleExport("pdf")}
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center"
              >
                Export PDF
              </button>
              <button
                onClick={() => handleExport("excel")}
                className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center"
              >
                Export Excel
              </button>
              <Link
                to="/admin/projects/add"
                className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Add Project
              </Link>
            </div>
          </div>
          {/* Table */}
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
              <tr className="text-left">
                <th
                  className="py-3 px-4 border-b cursor-pointer"
                  onClick={() => handleSort("id")}
                >
                  <div className="flex items-center gap-1">
                    ID {renderSortIcon("id")}
                  </div>
                </th>
                <th
                  className="py-3 px-4 border-b cursor-pointer"
                  onClick={() => handleSort("title")}
                >
                  <div className="flex items-center gap-1">
                    Name {renderSortIcon("title")}
                  </div>
                </th>
                <th className="py-3 px-4 border-b">Description</th>
                <th
                  className="py-3 px-4 border-b cursor-pointer"
                  onClick={() => handleSort("sector")}
                >
                  <div className="flex items-center gap-1">
                    Sector {renderSortIcon("sector")}
                  </div>
                </th>
                <th
                  className="py-3 px-4 border-b cursor-pointer"
                  onClick={() => handleSort("location")}
                >
                  <div className="flex items-center gap-1">
                    Location {renderSortIcon("location")}
                  </div>
                </th>
                <th className="py-3 px-4 border-b">Status</th>
                <th className="py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProjects.map((project) => (
                <tr
                  key={project.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <td className="py-3 px-4 border-b dark:text-white">
                    {project.id}
                  </td>
                  <td className="py-3 px-4 border-b dark:text-white">
                    {project.title}
                  </td>
                  <td className="py-3 px-4 border-b dark:text-white">
                    {project.short_desc}
                  </td>
                  <td className="py-3 px-4 border-b dark:text-white">
                    {project.sector}
                  </td>
                  <td className="py-3 px-4 border-b dark:text-white">
                    {project.location}
                  </td>
                  <td className="py-3 px-4 border-b">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs md:text-sm ${
                        project.status === "active"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {project.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b">
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/projects/edit/${project.id}`}
                        className="text-white bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 shadow-lg shadow-yellow-500/50 dark:shadow-lg dark:shadow-yellow-800/80 font-medium rounded-lg text-sm px-3 py-1 text-center"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="text-white bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-3 py-1 text-center"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination Controls */}
          {itemsPerPage !== "all" && (
            <div className="flex justify-center mt-4 gap-2">
              {Array.from({
                length: Math.ceil(filteredProjects.length / itemsPerPage),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePagination(index + 1)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === index + 1
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-300 dark:bg-gray-700"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </AdminLayout>
    </>
  );
};

export default Show;