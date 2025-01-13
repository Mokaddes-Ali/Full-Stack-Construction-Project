import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import AdminLayout from "../../../layouts/admin/AdminLayout";
import { apiUrl, token, fileUrl } from "../http";

const Show = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [sortedBy, setSortedBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const imgUrl = fileUrl + "uploads/services/small";

  // Fetch services from the API
  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiUrl + "services", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });

      const result = await res.json();
      setServices(result.data || result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching services:", error);
      setLoading(false);
    }
  };

  // Delete service
  const deleteService = async (id) => {
    if (confirm("Are you sure you want to delete this service?")) {
      const res = await fetch(apiUrl + "services/delete/" + id, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });

      const result = await res.json();

      if (result.status === true) {
        const newServices = services.filter((service) => service.id !== id);
        setServices(newServices);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    filterData(e.target.value);
  };

  const filterData = (query) => {
    const filtered = services.filter(
      (service) =>
        service.title.toLowerCase().includes(query.toLowerCase()) ||
        service.slug.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredServices(filtered);
    setCurrentPage(1);
  };

  const sortServices = (data) => {
    return data.sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortedBy] > b[sortedBy] ? 1 : -1;
      } else {
        return a[sortedBy] < b[sortedBy] ? 1 : -1;
      }
    });
  };

  const handlePerPageChange = (e) => {
    setPerPage(e.target.value);
  };

  const paginatedServices =
    perPage === "all"
      ? filteredServices
      : filteredServices.slice(
          (currentPage - 1) * perPage,
          currentPage * perPage
        );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    filterData(search);
  }, [services]);

  const sortedServices = sortServices(filteredServices);

  return (
    <AdminLayout>
      <div className="p-4 bg-gray-50">
        <h2 className="text-xl font-bold mb-4">Service Table</h2>
        {/* Search and Sorting Controls */}
        <div className="mb-4 flex justify-between items-center">
          <div className="flex space-x-4">
            <input
              type="text"
              className="px-4 py-2 border border-gray-300 rounded"
              placeholder="Search by Title or Slug"
              value={search}
              onChange={handleSearch}
            />
            <button
              onClick={() => {
                setSearch("");
                filterData(""); // Clear the filter
                setCurrentPage(1); // Reset to page 1
              }}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Reset
            </button>
          </div>
          <div className="flex space-x-4">
            <select
              onChange={handlePerPageChange}
              className="px-4 py-2 border rounded"
            >
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="25">25 per page</option>
              <option value="50">50 per page</option>
              <option value="100">100 per page</option>
              <option value="all">All</option>
            </select>
            <div className="flex space-x-2">
              <div>
                <span>Sort By: </span>
                <select
                  value={sortedBy}
                  onChange={(e) => setSortedBy(e.target.value)}
                  className="border p-2"
                >
                  <option value="id">ID</option>
                  <option value="title">Title</option>
                  <option value="slug">Slug</option>
                </select>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="border p-2 ml-2"
                >
                  <option value="asc">ASC</option>
                  <option value="desc">DESC</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : filteredServices.length === 0 ? (
          <div className="text-center text-xl pt-[250px] text-red-500 h-[480px] bg-gray-50">
            No matched data found
          </div>
        ) : (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-center">
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Content</th>
                <th className="py-2 px-4 border-b">Slug</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedServices.map((service) => (
                <tr key={service.id} className="bg-gray-100 text-left">
                  <td className="py-2 px-4 border-b">{service.id}</td>
                  <td className="py-2 px-4 border-b">{service.title}</td>
                  <td className="py-2 px-4 border-b">
                    {service.image ? (
                      <img
                        src={`${imgUrl}/${service.image}`}
                        alt={service.title}
                        className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-md"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">{service.short_desc}</td>
                  <td className="py-2 px-4 border-b">{service.content}</td>
                  <td className="py-2 px-4 border-b">{service.slug}</td>
                  <td className="py-2 px-4 border-b">
                    <span
                      className={`px-2 py-1 rounded-full text-white ${
                        service.status === 1 ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {service.status === 1 ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex">
                      <div className="">
                    <Link
                      to={`/admin/services/edit/${service.id}`}
                      className="bg-blue-600 text-white hover:bg-orange-500 text-center py-2 px-4 pl-4 rounded-lg inline-flex items-center"
                    >
                      <FaEdit className="inline mr-2" />
                    </Link>
                    </div>
                    <div>
                    <button
                      onClick={() => deleteService(service.id)}
                      className="bg-red-600 text-white hover:bg-black text-center py-2 px-4 pl-4 rounded-lg inline-flex items-center ml-2"
                    >
                      <FaTrash className="inline mr-2" />
                    </button>
                    </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        {perPage !== "all" && (
          <div className="mt-4 flex justify-center">
            {/* Pagination Controls */}
            {[...Array(Math.ceil(filteredServices.length / perPage))].map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 mx-1 ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Show;
