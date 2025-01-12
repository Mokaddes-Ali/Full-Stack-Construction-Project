import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AdminLayout from "../../../layouts/admin/AdminLayout";
import { apiUrl, token } from "../http";
import { motion } from "framer-motion";

const ArticleIndex = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOptions, setSortOptions] = useState({
    id: "asc",
    title: "asc",
    author: "asc",
  });
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const imgUrl = "http://localhost:8000/uploads/Article/small/";

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Simulate loading time of 500 milliseconds
        setTimeout(async () => {
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
        }, 500); // Adjust this value for faster or slower loading
      } catch (error) {
        toast.error("Failed to fetch articles.");
      } finally {
        setLoading(false);
      }
    };
    

    fetchArticles();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredArticles(filtered);
    }
  }, [searchQuery, articles]);

  const handleSort = (key) => {
    const newSortOrder = sortOptions[key] === "asc" ? "desc" : "asc";
    setSortOptions({ ...sortOptions, [key]: newSortOrder });

    const sorted = [...filteredArticles].sort((a, b) => {
      if (newSortOrder === "asc") {
        return a[key] > b[key] ? 1 : -1;
      } else {
        return a[key] < b[key] ? 1 : -1;
      }
    });
    setFilteredArticles(sorted);
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  const handleResetSearch = () => {
    setSearchQuery("");
    setFilteredArticles(articles);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArticles = itemsPerPage === "All" 
    ? filteredArticles 
    : filteredArticles.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
       {/* Loading Spinner */}
       {loading ? (
        <div
        className="flex justify-center items-center w-full h-screen bg-gray-100"
      >
       <div className="flex justify-center gap-4 mt-10">
         {["bg-red-500", "bg-green-500", "bg-blue-500", "bg-yellow-500", "bg-purple-500"].map((color, index) => (
           <motion.div
             key={index}
             className={`w-6 h-6 rounded-full ${color}`}
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             transition={{
               type: "spring",
               stiffness: 200,
               damping: 20,
               delay: index * 0.2,
             }}
           />
         ))}
         </div>
       </div>
     ) : (
    <AdminLayout>
      <div className="w-full max-w-6xl p-3 rounded-lg bg-blue-gray-100">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-4">
          Articles List
        </h2>
                  {/* Search and Sorting Controls */}
        <div className="mb-4 flex justify-between gap-4 items-center">
          {/* Search Input and Reset Button */}
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or author..."
              className="px-4 py-2 border rounded-md"
            />
            <button
              onClick={handleResetSearch}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Reset
            </button>
          </div>

          {/* Sorting and Items Per Page Controls */}
          <div className="flex gap-4 items-center">
            {/* Sort by Title */}
            <div className="inline-block">
              <label htmlFor="sortTitle" className="mr-2">Sort by Title:</label>
              <select
                id="sortTitle"
                onChange={() => handleSort("title")}
                value={sortOptions.title}
                className="px-2 py-1 rounded-md"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            {/* Sort by Author */}
            <div className="inline-block">
              <label htmlFor="sortAuthor" className="mr-2">Sort by Author:</label>
              <select
                id="sortAuthor"
                onChange={() => handleSort("author")}
                value={sortOptions.author}
                className="px-2 py-1 rounded-md"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            {/* Sort by ID */}
            <div className="inline-block">
              <label htmlFor="sortId" className="mr-2">Sort by ID:</label>
              <select
                id="sortId"
                onChange={() => handleSort("id")}
                value={sortOptions.id}
                className="px-2 py-1 rounded-md"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            {/* Items Per Page */}
            <div className="inline-block">
              <label htmlFor="itemsPerPage" className="mr-2">Items per page:</label>
              <select
                id="itemsPerPage"
                onChange={(e) => setItemsPerPage(e.target.value)}
                value={itemsPerPage}
                className="px-2 py-1 rounded-md"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={30}>30</option>
                <option value="All">All</option>
              </select>
            </div>
          </div>
        </div>
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 rounded-lg shadow-md">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="p-3 text-left">ID</th>
                    <th className="p-3 text-left">Image</th>
                    <th className="p-3 text-left">Title</th>
                    <th className="p-3 text-left">Author</th>
                    <th className="p-3 text-left">Content</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Published</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedArticles.map((article, index) => (
                    <motion.tr
                      key={article.id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                      initial={{ opacity: 0, scale: 1.2 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 25,
                        delay: index * 0.1,
                      }}
                    >
                      <td className="p-3">{article.id}</td>
                      <td className="p-3">
                        {article.image ? (
                          <img
                            src={`${imgUrl}/${article.image}`}
                            alt={article.title}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                        ) : (
                          <span className="text-gray-400">No Image</span>
                        )}
                      </td>
                      <td className="p-3">{article.title}</td>
                      <td className="p-3">{article.author}</td>
                      <td className="p-3">
                        {article.content.length > 50
                          ? article.content.slice(0, 50) + "..."
                          : article.content}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-white text-sm ${
                            article.status === 1 ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {article.status === 1 ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="p-3">
                        {new Date(article.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-3 flex gap-2">
                        <Link
                          to={`/admin/articles/${article.id}`}
                          className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-500 text-sm"
                        >
                          View
                        </Link>
                        <Link
                          to={`/admin/articles/edit/${article.id}`}
                          className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-400 text-sm"
                        >
                          Edit
                        </Link>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {itemsPerPage !== "All" && (
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
                        : "bg-gray-300"
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


