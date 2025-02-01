// import { useState, useEffect } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import { toast } from "react-toastify";
// import AdminLayout from "../../../layouts/admin/AdminLayout";
// import { apiUrl, token, fileUrl } from "../http";

// const Show = () => {
//   const [services, setServices] = useState([]);
//   const [filteredServices, setFilteredServices] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");
//   const [perPage, setPerPage] = useState(5);
//   const [sortedBy, setSortedBy] = useState("id");
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [currentPage, setCurrentPage] = useState(1);

//   const imgUrl = fileUrl + "uploads/services/small";

//   // Fetch services from the API
//   const fetchServices = async () => {
//     setLoading(true);
//     const res = await fetch(apiUrl + "services", {
//       method: "GET",
//       headers: {
//         "Content-type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${token()}`,
//       },
//     });

//     const result = await res.json();
//     setServices(result.data || result);
//     setFilteredServices(result.data || result); // Initialize filteredServices
//     setLoading(false);
//   };

//   // Delete service
//   const deleteService = async (id) => {
//     if (confirm("Are you sure you want to delete this service?")) {
//       const res = await fetch(apiUrl + "services/delete/" + id, {
//         method: "DELETE",
//         headers: {
//           "Content-type": "application/json",
//           Accept: "application/json",
//           Authorization: `Bearer ${token()}`,
//         },
//       });

//       const result = await res.json();

//       if (result.status === true) {
//         const newServices = services.filter((service) => service.id !== id);
//         setServices(newServices);
//         setFilteredServices(newServices); // Update filteredServices
//         toast.success(result.message);
//       } else {
//         toast.error(result.message);
//       }
//     }
//   };

//   // Handle search input
//   const handleSearch = (e) => {
//     setSearch(e.target.value);
//     filterData(e.target.value);
//   };

//   // Filter data based on search query
//   const filterData = (query) => {
//     const filtered = services.filter(
//       (service) =>
//         service.title.toLowerCase().includes(query.toLowerCase()) ||
//         service.slug.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredServices(filtered);
//     setCurrentPage(1); // Reset to first page
//   };

//   // Sort services
//   const sortServices = (data) => {
//     return data.sort((a, b) => {
//       if (sortOrder === "asc") {
//         return a[sortedBy] > b[sortedBy] ? 1 : -1;
//       } else {
//         return a[sortedBy] < b[sortedBy] ? 1 : -1;
//       }
//     });
//   };

//   // Handle per page change
//   const handlePerPageChange = (e) => {
//     const value = e.target.value === "all" ? "all" : parseInt(e.target.value, 10);
//     setPerPage(value);
//     setCurrentPage(1); // Reset to first page
//   };

//   // Handle page change
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   // Paginate data
//   const paginatedServices =
//     perPage === "all"
//       ? filteredServices
//       : filteredServices.slice(
//           (currentPage - 1) * perPage,
//           currentPage * perPage
//         );

//   // Fetch services on component mount
//   useEffect(() => {
//     fetchServices();
//   }, []);

//   // Apply sorting to filtered services
//   const sortedServices = sortServices(filteredServices);

//   return (
//     <>
//       {loading ? (
//         <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-300 via-purple-400 to-pink-300">
//           <div className="flex flex-row items-center space-x-6">
//             <span className="loading loading-infinity loading-lg text-yellow-200 scale-150"></span>
//             <span className="loading loading-infinity loading-lg text-teal-200 scale-150"></span>
//             <span className="loading loading-infinity loading-lg text-pink-200 scale-150"></span>
//             <span className="loading loading-infinity loading-lg text-indigo-200 scale-150"></span>
//           </div>
//         </div>
//       ) : (
//         <AdminLayout>
//           <div className="p-4 bg-blue-50 dark:bg-gray-900">
//             <h2 className="text-2xl font-bold mb-4 text-center">Service Table</h2>
//             {/* Search and Sorting Controls */}
//             <div className="mb-4 flex justify-between items-center">
//               <div className="flex space-x-4">
//                 <button className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
//                   <NavLink to="/service/add">Add Service</NavLink>
//                 </button>
//                 <input
//                   type="text"
//                   className="px-4 py-2 border w-[400px] dark:bg-black border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
//                   placeholder="Search by Title or Slug"
//                   value={search}
//                   onChange={handleSearch}
//                 />
//                 <button
//                   onClick={() => {
//                     setSearch("");
//                     filterData(""); // Clear the filter
//                     setCurrentPage(1); // Reset to page 1
//                   }}
//                   className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
//                 >
//                   Reset
//                 </button>
//               </div>
//               <div className="flex space-x-4">
//                 <select
//                   onChange={handlePerPageChange}
//                   className="text-black bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-lg px-2 py-2 text-center me-2 mb-2"
//                 >
//                   <option value="5">5 per page</option>
//                   <option value="10">10 per page</option>
//                   <option value="25">25 per page</option>
//                   <option value="50">50 per page</option>
//                   <option value="100">100 per page</option>
//                   <option value="all">All</option>
//                 </select>
//                 <div className="flex space-x-2">
//                   <div>
//                     <span>Sort By: </span>
//                     <select
//                       value={sortedBy}
//                       onChange={(e) => setSortedBy(e.target.value)}
//                       className="text-black bg-gradient-to-r from-pink-300 via-pink-400 to-pink-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2"
//                     >
//                       <option value="id">ID</option>
//                       <option value="title">Title</option>
//                       <option value="slug">Slug</option>
//                     </select>
//                     <select
//                       value={sortOrder}
//                       onChange={(e) => setSortOrder(e.target.value)}
//                       className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2"
//                     >
//                       <option value="asc">ASC</option>
//                       <option value="desc">DESC</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Table */}
//             {filteredServices.length === 0 ? (
//               <div className="text-center text-xl pt-[250px] text-red-500 h-[480px] bg-blue-50">
//                 No matched data found
//               </div>
//             ) : (
//               <table className="min-w-full dark:bg-gray-400 border border-blue-300">
//                 <thead>
//                   <tr className="bg-blue-100 dark:bg-black text-center">
//                     <th className="py-2 px-4 border-b">ID</th>
//                     <th className="py-2 px-4 border-b">Title</th>
//                     <th className="py-2 px-4 border-b">Image</th>
//                     <th className="py-2 px-4 border-b">Description</th>
//                     <th className="py-2 px-4 border-b">Content</th>
//                     <th className="py-2 px-4 border-b">Slug</th>
//                     <th className="py-2 px-4 border-b">Status</th>
//                     <th className="py-2 px-4 border-b">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {paginatedServices.map((service) => (
//                     <tr key={service.id} className="bg-blue-5 dark:bg-black text-left">
//                       <td className="py-2 px-4 border-b border-white">{service.id}</td>
//                       <td className="py-2 px-4 border-b border-white">{service.title}</td>
//                       <td className="py-2 px-4 border-b border-white">
//                         {service.image ? (
//                           <img
//                             src={`${imgUrl}/${service.image}`}
//                             alt={service.title}
//                             className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-md"
//                           />
//                         ) : (
//                           <span className="text-gray-400">No Image</span>
//                         )}
//                       </td>
//                       <td className="py-2 px-4 border-b border-white">{service.short_desc}</td>
//                       <td className="py-2 px-4 border-b border-white">{service.content}</td>
//                       <td className="py-2 px-4 border-b border-white">{service.slug}</td>
//                       <td className="py-2 px-4 border-b border-white">
//                         <span
//                           className={`px-2 py-1 rounded-full text-white ${
//                             service.status === 1 ? "bg-blue-500" : "bg-red-400"
//                           }`}
//                         >
//                           {service.status === 1 ? "Active" : "Inactive"}
//                         </span>
//                       </td>
//                       <td className="py-2 px-4 border-b border-white">
//                         <div className="flex space-x-2">
//                           <Link
//                             to={`/admin/services/edit/${service.id}`}
//                             className="text-blue-500 hover:text-blue-700"
//                           >
//                             <FaEdit />
//                           </Link>
//                           <button
//                             onClick={() => deleteService(service.id)}
//                             className="text-red-500 hover:text-red-700"
//                           >
//                             <FaTrash />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}

//             {/* Pagination Controls */}
//             <div className="flex justify-center items-center space-x-2 mt-4 p-4 rounded-lg">
//               <button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className={`px-4 py-2 rounded-md transition ${
//                   currentPage === 1
//                     ? "bg-gray-700 text-gray-400 cursor-not-allowed"
//                     : "bg-gray-800 text-white hover:bg-gray-700"
//                 }`}
//               >
//                 Previous
//               </button>

//               {Array.from({ length: Math.ceil(filteredServices.length / perPage) }, (_, index) => (
//                 <button
//                   key={index + 1}
//                   onClick={() => handlePageChange(index + 1)}
//                   className={`px-4 py-2 rounded-md transition ${
//                     currentPage === index + 1
//                       ? "bg-blue-600 text-white"
//                       : "bg-gray-800 text-gray-300 hover:bg-gray-700"
//                   }`}
//                 >
//                   {index + 1}
//                 </button>
//               ))}

//               <button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === Math.ceil(filteredServices.length / perPage)}
//                 className={`px-4 py-2 rounded-md transition ${
//                   currentPage === Math.ceil(filteredServices.length / perPage)
//                     ? "bg-gray-700 text-gray-400 cursor-not-allowed"
//                     : "bg-gray-800 text-white hover:bg-gray-700"
//                 }`}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </AdminLayout>
//       )}
//     </>
//   );
// };

// export default Show;

import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaEdit, FaTrash, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { toast } from "react-toastify";
import AdminLayout from "../../../layouts/admin/AdminLayout";
import { apiUrl, token, fileUrl } from "../http";
import { utils, writeFile } from "xlsx"; // For Excel export
import { jsPDF } from "jspdf"; // For PDF export
import "jspdf-autotable"; // For PDF table formatting

const Show = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const imgUrl = fileUrl + "uploads/services/small";

  // Fetch services from the API
  const fetchServices = async () => {
    setLoading(true);
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
    setFilteredServices(result.data || result); // Initialize filteredServices
    setLoading(false);
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
        setFilteredServices(newServices); // Update filteredServices
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
  };

  // Handle search input
  const handleSearch = (e) => {
    setSearch(e.target.value);
    filterData(e.target.value);
  };

  // Filter data based on search query
  const filterData = (query) => {
    const filtered = services.filter(
      (service) =>
        service.title.toLowerCase().includes(query.toLowerCase()) ||
        service.slug.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredServices(filtered);
    setCurrentPage(1); // Reset to first page
  };

  // Handle sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...filteredServices].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredServices(sorted);
  };

  // Handle per page change
  const handlePerPageChange = (e) => {
    const value = e.target.value === "all" ? "all" : parseInt(e.target.value, 10);
    setPerPage(value);
    setCurrentPage(1); // Reset to first page
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Paginate data
  const paginatedServices =
    perPage === "all"
      ? filteredServices
      : filteredServices.slice(
          (currentPage - 1) * perPage,
          currentPage * perPage
        );

  // Fetch services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  // Render sorting icon
  const renderSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  // Export data to CSV
  const exportToCSV = () => {
    const headers = [
      { label: "ID", key: "id" },
      { label: "Title", key: "title" },
      { label: "Description", key: "short_desc" },
      { label: "Content", key: "content" },
      { label: "Slug", key: "slug" },
      { label: "Status", key: "status" },
    ];

    const data = filteredServices.map((service) => ({
      id: service.id,
      title: service.title,
      short_desc: service.short_desc,
      content: service.content,
      slug: service.slug,
      status: service.status === 1 ? "Active" : "Inactive",
    }));

    const csvHeaders = headers.map((header) => header.label).join(",");
    const csvData = data.map((row) =>
      headers.map((header) => row[header.key]).join(",")
    );
    const csvContent = [csvHeaders, ...csvData].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "services.csv";
    link.click();
  };

  // Export data to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    const headers = [
      "ID",
      "Title",
      "Description",
      "Content",
      "Slug",
      "Status",
    ];
    const data = filteredServices.map((service) => [
      service.id,
      service.title,
      service.short_desc,
      service.content,
      service.slug,
      service.status === 1 ? "Active" : "Inactive",
    ]);

    doc.autoTable({
      head: [headers],
      body: data,
    });

    doc.save("services.pdf");
  };

  // Export data to Excel
  const exportToExcel = () => {
    const headers = [
      { label: "ID", key: "id" },
      { label: "Title", key: "title" },
      { label: "Description", key: "short_desc" },
      { label: "Content", key: "content" },
      { label: "Slug", key: "slug" },
      { label: "Status", key: "status" },
    ];

    const data = filteredServices.map((service) => ({
      id: service.id,
      title: service.title,
      short_desc: service.short_desc,
      content: service.content,
      slug: service.slug,
      status: service.status === 1 ? "Active" : "Inactive",
    }));

    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Services");
    writeFile(workbook, "services.xlsx");
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-300 via-purple-400 to-pink-300">
          <div className="flex flex-row items-center space-x-6">
            <span className="loading loading-infinity loading-lg text-yellow-200 scale-150"></span>
            <span className="loading loading-infinity loading-lg text-teal-200 scale-150"></span>
            <span className="loading loading-infinity loading-lg text-pink-200 scale-150"></span>
            <span className="loading loading-infinity loading-lg text-indigo-200 scale-150"></span>
          </div>
        </div>
      ) : (
        <AdminLayout>
          <div className="p-4 bg-blue-50 dark:bg-gray-900">
            <h2 className="text-2xl font-bold mb-4 text-center">Service Table</h2>
            {/* Search and Sorting Controls */}
            <div className="mb-4 flex justify-between items-center">
              <div className="flex space-x-4">
                <button className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                  <NavLink to="/service/add">Add Service</NavLink>
                </button>
                <input
                  type="text"
                  className="px-4 py-2 border w-[400px] dark:bg-black border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
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
                  className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                >
                  Reset
                </button>
              </div>
              <div className="flex space-x-4">
                <select
                  onChange={handlePerPageChange}
                  className="text-black bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-lg px-2 py-2 text-center me-2 mb-2"
                >
                  <option value="5">5 per page</option>
                  <option value="10">10 per page</option>
                  <option value="25">25 per page</option>
                  <option value="50">50 per page</option>
                  <option value="100">100 per page</option>
                  <option value="all">All</option>
                </select>
                <button
                  onClick={exportToCSV}
                  className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center"
                >
                  Export CSV
                </button>
                <button
                  onClick={exportToPDF}
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center"
                >
                  Export PDF
                </button>
                <button
                  onClick={exportToExcel}
                  className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center"
                >
                  Export Excel
                </button>
              </div>
            </div>

            {/* Table */}
            {filteredServices.length === 0 ? (
              <div className="text-center text-xl pt-[250px] text-red-500 h-[480px] bg-blue-50">
                No matched data found
              </div>
            ) : (
              <table className="min-w-full dark:bg-gray-400 border border-blue-300">
                <thead>
                  <tr className="bg-blue-100 dark:bg-black text-center">
                    <th
                      className="py-2 px-4 border-b cursor-pointer"
                      onClick={() => handleSort("id")}
                    >
                      <div className="flex items-center gap-1">
                        ID {renderSortIcon("id")}
                      </div>
                    </th>
                    <th
                      className="py-2 px-4 border-b cursor-pointer"
                      onClick={() => handleSort("title")}
                    >
                      <div className="flex items-center gap-1">
                        Title {renderSortIcon("title")}
                      </div>
                    </th>
                    <th className="py-2 px-4 border-b">Image</th>
                    <th
                      className="py-2 px-4 border-b cursor-pointer"
                      onClick={() => handleSort("short_desc")}
                    >
                      <div className="flex items-center gap-1">
                        Description {renderSortIcon("short_desc")}
                      </div>
                    </th>
                    <th
                      className="py-2 px-4 border-b cursor-pointer"
                      onClick={() => handleSort("content")}
                    >
                      <div className="flex items-center gap-1">
                        Content {renderSortIcon("content")}
                      </div>
                    </th>
                    <th
                      className="py-2 px-4 border-b cursor-pointer"
                      onClick={() => handleSort("slug")}
                    >
                      <div className="flex items-center gap-1">
                        Slug {renderSortIcon("slug")}
                      </div>
                    </th>
                    <th
                      className="py-2 px-4 border-b cursor-pointer"
                      onClick={() => handleSort("status")}
                    >
                      <div className="flex items-center gap-1">
                        Status {renderSortIcon("status")}
                      </div>
                    </th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedServices.map((service) => (
                    <tr key={service.id} className="bg-blue-5 dark:bg-black text-left">
                      <td className="py-2 px-4 border-b border-white">{service.id}</td>
                      <td className="py-2 px-4 border-b border-white">{service.title}</td>
                      <td className="py-2 px-4 border-b border-white">
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
                      <td className="py-2 px-4 border-b border-white">{service.short_desc}</td>
                      <td className="py-2 px-4 border-b border-white">{service.content}</td>
                      <td className="py-2 px-4 border-b border-white">{service.slug}</td>
                      <td className="py-2 px-4 border-b border-white">
                        <span
                          className={`px-2 py-1 rounded-full text-white ${
                            service.status === 1 ? "bg-blue-500" : "bg-red-400"
                          }`}
                        >
                          {service.status === 1 ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-2 px-4 border-b border-white">
                        <div className="flex space-x-2">
                          <Link
                            to={`/admin/services/edit/${service.id}`}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => deleteService(service.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-center items-center space-x-2 mt-4 p-4 rounded-lg">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md transition ${
                  currentPage === 1
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
              >
                Previous
              </button>

              {Array.from({ length: Math.ceil(filteredServices.length / perPage) }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded-md transition ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === Math.ceil(filteredServices.length / perPage)}
                className={`px-4 py-2 rounded-md transition ${
                  currentPage === Math.ceil(filteredServices.length / perPage)
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </AdminLayout>
      )}
    </>
  );
};

export default Show;