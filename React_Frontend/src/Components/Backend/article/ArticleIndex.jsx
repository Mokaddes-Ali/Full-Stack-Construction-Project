import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { motion } from "framer-motion";
import AdminLayout from "../../../layouts/admin/AdminLayout";
import { apiUrl, token } from "../http";
import { exportToCSV, exportToPDF, exportToExcel } from "../utils/exportUtils"; // Utility functions for export

const ArticleIndex = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const imgUrl = "http://localhost:8000/uploads/Article/small/";

  // Fetch articles
  const fetchArticles = async () => {
    try {
      const res = await fetch(apiUrl + "articles", {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      });

      const result = await res.json();

      if (result.status) {
        setArticles(result.data);
        setFilteredArticles(result.data);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to fetch articles.");
    } finally {
      setLoading(false);
    }
  };

  // Delete article
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) {
      return;
    }
    const res = await fetch(apiUrl + "articles/delete/" + id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
    });

    const result = await res.json();

    if (result.status === true) {
      const newArticles = articles.filter((article) => article.id !== id);
      setArticles(newArticles);
      setFilteredArticles(newArticles);
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query)
    );
    setFilteredArticles(filtered);
    setCurrentPage(1); // Reset to first page
  };

  // Handle sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...filteredArticles].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredArticles(sorted);
  };

  // Handle pagination
  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  // Handle reset search
  const handleResetSearch = () => {
    setSearchQuery("");
    setFilteredArticles(articles);
    setCurrentPage(1);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    const value = e.target.value === "all" ? "all" : parseInt(e.target.value, 10);
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to first page
  };

  // Calculate paginated articles
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArticles =
    itemsPerPage === "all"
      ? filteredArticles
      : filteredArticles.slice(startIndex, startIndex + itemsPerPage);

  // Fetch articles when component mounts
  useEffect(() => {
    fetchArticles();
  }, []);

  // Export data
  const handleExport = (type) => {
    const headers = [
      { label: "ID", key: "id" },
      { label: "Title", key: "title" },
      { label: "Author", key: "author" },
      { label: "Content", key: "content" },
      { label: "Status", key: "status" },
      { label: "Published", key: "created_at" },
    ];

    const data = filteredArticles.map((article) => ({
      id: article.id,
      title: article.title,
      author: article.author,
      content:
        article.content && typeof article.content === "string" && article.content.length > 50
          ? article.content.slice(0, 50) + "..."
          : article.content,
      status: article.status === 1 ? "Active" : "Inactive",
      created_at: new Date(article.created_at).toLocaleDateString(),
    }));

    switch (type) {
      case "csv":
        exportToCSV(data, headers, "articles");
        break;
      case "pdf":
        exportToPDF(data, headers, "articles");
        break;
      case "excel":
        exportToExcel(data, headers, "articles");
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
      {loading ? (
        <div className="flex justify-center items-center w-full h-screen bg-gray-100">
          <motion.div className="w-10 h-10 rounded-full bg-blue-500 animate-ping" />
        </div>
      ) : (
        <AdminLayout>
          <div className="w-full max-w-6xl p-3 rounded-lg bg-blue-50 dark:bg-gray-900">
            <h2 className="text-3xl font-bold text-center text-indigo-700 dark:text-indigo-300 mb-4">
              Articles List
            </h2>
            {/* Search and Controls */}
            <div className="mb-4 flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search by title or author..."
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
                  to="/admin/articles/add"
                  className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Add Article
                </Link>
              </div>
            </div>
            {/* Table */}
            <div className="overflow-x-auto">
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
                    <th className="py-3 px-4 border-b">Image</th>
                    <th
                      className="py-3 px-4 border-b cursor-pointer"
                      onClick={() => handleSort("title")}
                    >
                      <div className="flex items-center gap-1">
                        Title {renderSortIcon("title")}
                      </div>
                    </th>
                    <th
                      className="py-3 px-4 border-b cursor-pointer"
                      onClick={() => handleSort("author")}
                    >
                      <div className="flex items-center gap-1">
                        Author {renderSortIcon("author")}
                      </div>
                    </th>
                    <th className="py-3 px-4 border-b hidden md:table-cell">
                      Content
                    </th>
                    <th className="py-3 px-4 border-b">Status</th>
                    <th className="py-3 px-4 border-b hidden sm:table-cell">
                      Published
                    </th>
                    <th className="py-3 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedArticles.map((article, index) => (
                    <motion.tr
                      key={article.id}
                      className="border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm md:text-base"
                      initial={{ opacity: 0, scale: 1.2 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 25,
                        delay: index * 0.1,
                      }}
                    >
                      <td className="py-3 px-4 border-b dark:text-white">{article.id}</td>
                      <td className="py-3 px-4 border-b">
                        {article.image ? (
                          <img
                            src={`${imgUrl}/${article.image}`}
                            alt={article.title}
                            className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-md"
                          />
                        ) : (
                          <span className="text-gray-400">No Image</span>
                        )}
                      </td>
                      <td className="py-3 px-4 border-b dark:text-white">{article.title}</td>
                      <td className="py-3 px-4 border-b dark:text-white">{article.author}</td>
                      <td className="py-3 px-4 border-b hidden md:table-cell dark:text-white">
                        {article.content &&
                        typeof article.content === "string" &&
                        article.content.length > 50
                          ? article.content.slice(0, 50) + "..."
                          : article.content}
                      </td>
                      <td className="py-3 px-4 border-b">
                        <span
                          className={`px-2 py-1 rounded-full text-white text-xs md:text-sm ${
                            article.status === 1 ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {article.status === 1 ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-b hidden sm:table-cell dark:text-white">
                        {new Date(article.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 border-b">
                        <div className="flex gap-2">
                          <Link
                            to={`/admin/articles/edit/${article.id}`}
                            className="text-white bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 shadow-lg shadow-yellow-500/50 dark:shadow-lg dark:shadow-yellow-800/80 font-medium rounded-lg text-sm px-3 py-1 text-center"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(article.id)}
                            className="text-white bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-3 py-1 text-center"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination Controls */}
            {itemsPerPage !== "all" && (
              <div className="flex justify-center mt-4 gap-2">
                {Array.from({
                  length: Math.ceil(filteredArticles.length / itemsPerPage),
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
      )}
    </>
  );
};

export default ArticleIndex;